import { describe, expect, it } from 'vitest'

import { clientKey, createRateLimiter } from './rate-limit'

function clock(start = 0) {
  let time = start
  return {
    now: () => time,
    advance: (ms: number) => {
      time += ms
    },
  }
}

describe('createRateLimiter', () => {
  it('пропускает запросы в пределах лимита и блокирует следующий', () => {
    const time = clock()
    const limiter = createRateLimiter({ limit: 3, windowMs: 60_000, now: time.now })

    expect(limiter.hit('a')).toEqual({ allowed: true })
    expect(limiter.hit('a')).toEqual({ allowed: true })
    expect(limiter.hit('a')).toEqual({ allowed: true })
    expect(limiter.hit('a')).toEqual({ allowed: false, retryAfterSeconds: 60 })
  })

  it('считает ключи независимо', () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 60_000, now: clock().now })

    expect(limiter.hit('a').allowed).toBe(true)
    expect(limiter.hit('b').allowed).toBe(true)
    expect(limiter.hit('a').allowed).toBe(false)
  })

  it('освобождает место, когда старые запросы выходят из окна', () => {
    const time = clock()
    const limiter = createRateLimiter({ limit: 2, windowMs: 60_000, now: time.now })

    limiter.hit('a')
    time.advance(20_000)
    limiter.hit('a')

    expect(limiter.hit('a')).toEqual({ allowed: false, retryAfterSeconds: 40 })

    time.advance(40_000)
    expect(limiter.hit('a').allowed).toBe(true)
  })

  it('не засчитывает отклонённые попытки', () => {
    const time = clock()
    const limiter = createRateLimiter({ limit: 1, windowMs: 60_000, now: time.now })

    limiter.hit('a')
    time.advance(30_000)
    limiter.hit('a')
    time.advance(30_000)

    expect(limiter.hit('a').allowed).toBe(true)
  })

  it('удаляет устаревшие ключи и не превышает потолок ключей', () => {
    const time = clock()
    const limiter = createRateLimiter({ limit: 1, windowMs: 1_000, maxKeys: 3, now: time.now })

    limiter.hit('a')
    limiter.hit('b')
    limiter.hit('c')
    limiter.hit('d')

    expect(limiter.size()).toBe(3)
    // Вытеснен самый старый ключ — для него снова есть место.
    expect(limiter.hit('a').allowed).toBe(true)

    time.advance(1_001)
    limiter.hit('e')
    expect(limiter.size()).toBe(1)
  })
})

function headers(xff?: string) {
  return new Headers(xff === undefined ? {} : { 'x-forwarded-for': xff })
}

describe('clientKey', () => {
  it('берёт последний адрес X-Forwarded-For — его добавил ближайший прокси', () => {
    expect(clientKey(headers('6.6.6.6, 203.0.113.7'))).toBe('203.0.113.7')
    expect(clientKey(headers(' 203.0.113.7 '))).toBe('203.0.113.7')
  })

  it('группирует IPv6 по /64', () => {
    expect(clientKey(headers('2001:db8:1:2:aaaa::1'))).toBe('2001:db8:1:2::/64')
    expect(clientKey(headers('2001:db8:1:2:bbbb:cccc:dddd:eeee'))).toBe('2001:db8:1:2::/64')
    expect(clientKey(headers('2001:db8::1'))).toBe('2001:db8:0:0::/64')
  })

  it('приводит IPv4-mapped IPv6 к IPv4', () => {
    expect(clientKey(headers('::ffff:203.0.113.7'))).toBe('203.0.113.7')
  })

  it('возвращает unknown без заголовка', () => {
    expect(clientKey(headers())).toBe('unknown')
    expect(clientKey(headers(''))).toBe('unknown')
  })
})
