import 'server-only'

type RateLimiterOptions = {
  limit: number
  windowMs: number
  /** Потолок числа ключей: защищает память при запросах с множества адресов. */
  maxKeys?: number
  now?: () => number
}

export type RateLimitResult = { allowed: true } | { allowed: false; retryAfterSeconds: number }

/**
 * Скользящее окно в памяти процесса. Сайт работает одним контейнером,
 * поэтому общее хранилище не нужно; после рестарта счётчики обнуляются.
 */
export function createRateLimiter({
  limit,
  windowMs,
  maxKeys = 10_000,
  now = Date.now,
}: RateLimiterOptions) {
  const hits = new Map<string, number[]>()

  function sweep(time: number) {
    for (const [key, times] of hits) {
      if (times[times.length - 1] <= time - windowMs) hits.delete(key)
    }
  }

  return {
    hit(key: string): RateLimitResult {
      const time = now()
      sweep(time)

      const recent = (hits.get(key) ?? []).filter((at) => at > time - windowMs)

      if (recent.length >= limit) {
        hits.set(key, recent)
        return {
          allowed: false,
          retryAfterSeconds: Math.ceil((recent[0] + windowMs - time) / 1000),
        }
      }

      // Ключ переставляется в конец Map: при вытеснении уходят самые давние.
      hits.delete(key)
      hits.set(key, [...recent, time])

      while (hits.size > maxKeys) {
        const oldest = hits.keys().next().value
        if (oldest === undefined) break
        hits.delete(oldest)
      }

      return { allowed: true }
    },
    size: () => hits.size,
  }
}

/** Разворачивает сокращённую запись IPv6 до восьми групп. */
function expandIPv6(address: string) {
  const [head, tail] = address.split('::')
  const headGroups = head ? head.split(':') : []
  const tailGroups = tail ? tail.split(':') : []
  const missing = address.includes('::') ? 8 - headGroups.length - tailGroups.length : 0

  return [...headGroups, ...Array<string>(missing).fill('0'), ...tailGroups]
}

/**
 * Ключ клиента для лимита. Берётся последний адрес X-Forwarded-For:
 * его добавил ближайший прокси (Caddy), клиент подделать его не может.
 * IPv6 группируется по /64 — иначе лимит обходится сменой адреса в подсети.
 */
export function clientKey(headers: Headers) {
  const address = headers.get('x-forwarded-for')?.split(',').pop()?.trim()

  if (!address) return 'unknown'

  const mapped = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/i.exec(address)
  if (mapped) return mapped[1]

  if (!address.includes(':')) return address

  return `${expandIPv6(address.toLowerCase()).slice(0, 4).join(':')}::/64`
}

/** Адрес из частной сети или loopback: признак того, что прокси не передал IP клиента. */
export function isPrivateKey(key: string) {
  return (
    key === 'unknown' ||
    /^(10\.|127\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(key) ||
    key === '::1' ||
    /^(fc|fd|fe80)/.test(key)
  )
}
