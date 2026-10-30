import { describe, expect, it, vi } from 'vitest'

import { createDeduper } from './dedupe'

type Result = { ok: boolean }

function clock() {
  let time = 0
  return {
    now: () => time,
    advance: (ms: number) => {
      time += ms
    },
  }
}

function deferred<T>() {
  let resolve!: (value: T) => void
  const promise = new Promise<T>((done) => {
    resolve = done
  })
  return { promise, resolve }
}

describe('createDeduper', () => {
  it('выполняет задачу для нового ключа', async () => {
    const dedupe = createDeduper<Result>({ ttlMs: 60_000, now: clock().now })
    const task = vi.fn(async () => ({ ok: true }))

    await expect(dedupe.run('k', task)).resolves.toEqual({ ok: true, duplicate: false })
    expect(task).toHaveBeenCalledOnce()
  })

  it('не выполняет задачу повторно после успеха', async () => {
    const dedupe = createDeduper<Result>({ ttlMs: 60_000, now: clock().now })
    const task = vi.fn(async () => ({ ok: true }))

    await dedupe.run('k', task)
    await expect(dedupe.run('k', task)).resolves.toEqual({ ok: true, duplicate: true })
    expect(task).toHaveBeenCalledOnce()
  })

  it('выполняет задачу снова после неудачи', async () => {
    const dedupe = createDeduper<Result>({ ttlMs: 60_000, now: clock().now })
    const task = vi.fn().mockResolvedValueOnce({ ok: false }).mockResolvedValueOnce({ ok: true })

    await expect(dedupe.run('k', task)).resolves.toEqual({ ok: false, duplicate: false })
    await expect(dedupe.run('k', task)).resolves.toEqual({ ok: true, duplicate: false })
    expect(task).toHaveBeenCalledTimes(2)
  })

  it('выполняет задачу снова, если она бросила исключение', async () => {
    const dedupe = createDeduper<Result>({ ttlMs: 60_000, now: clock().now })
    const task = vi
      .fn<() => Promise<Result>>()
      .mockRejectedValueOnce(new Error('boom'))
      .mockResolvedValueOnce({ ok: true })

    await expect(dedupe.run('k', task)).rejects.toThrow('boom')
    await expect(dedupe.run('k', task)).resolves.toEqual({ ok: true, duplicate: false })
  })

  it('параллельный запрос с тем же ключом ждёт первый и не запускает задачу', async () => {
    const dedupe = createDeduper<Result>({ ttlMs: 60_000, now: clock().now })
    const gate = deferred<Result>()
    const task = vi.fn(() => gate.promise)

    const first = dedupe.run('k', task)
    const second = dedupe.run('k', task)
    gate.resolve({ ok: true })

    await expect(first).resolves.toEqual({ ok: true, duplicate: false })
    await expect(second).resolves.toEqual({ ok: true, duplicate: true })
    expect(task).toHaveBeenCalledOnce()
  })

  it('забывает успешный ключ после TTL', async () => {
    const time = clock()
    const dedupe = createDeduper<Result>({ ttlMs: 60_000, now: time.now })
    const task = vi.fn(async () => ({ ok: true }))

    await dedupe.run('k', task)
    time.advance(60_001)
    await dedupe.run('k', task)

    expect(task).toHaveBeenCalledTimes(2)
  })

  it('не превышает потолок ключей', async () => {
    const dedupe = createDeduper<Result>({ ttlMs: 60_000, maxKeys: 2, now: clock().now })
    const task = vi.fn(async () => ({ ok: true }))

    await dedupe.run('a', task)
    await dedupe.run('b', task)
    await dedupe.run('c', task)

    expect(dedupe.size()).toBe(2)
  })
})
