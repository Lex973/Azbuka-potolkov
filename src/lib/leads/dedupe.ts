import 'server-only'

type DeduperOptions = {
  /** Сколько помнить успешно выполненный ключ. */
  ttlMs: number
  maxKeys?: number
  now?: () => number
}

type Entry<T> =
  { status: 'pending'; promise: Promise<T> } | { status: 'done'; result: T; expiresAt: number }

/**
 * Защита от повторной доставки одной и той же заявки: повтор после потерянного
 * ответа и параллельный двойной запрос не отправляются второй раз.
 * Неудачная попытка не запоминается — её можно повторить.
 */
export function createDeduper<T extends { ok: boolean }>({
  ttlMs,
  maxKeys = 10_000,
  now = Date.now,
}: DeduperOptions) {
  const entries = new Map<string, Entry<T>>()

  function sweep(time: number) {
    for (const [key, entry] of entries) {
      if (entry.status === 'done' && entry.expiresAt <= time) entries.delete(key)
    }
  }

  function trim() {
    while (entries.size > maxKeys) {
      const oldest = entries.keys().next().value
      if (oldest === undefined) break
      entries.delete(oldest)
    }
  }

  return {
    async run(key: string, task: () => Promise<T>): Promise<T & { duplicate: boolean }> {
      sweep(now())

      const existing = entries.get(key)

      if (existing?.status === 'done') return { ...existing.result, duplicate: true }
      if (existing?.status === 'pending') return { ...(await existing.promise), duplicate: true }

      const promise = task()
      entries.set(key, { status: 'pending', promise })
      trim()

      try {
        const result = await promise

        if (result.ok) entries.set(key, { status: 'done', result, expiresAt: now() + ttlMs })
        else entries.delete(key)

        return { ...result, duplicate: false }
      } catch (error) {
        entries.delete(key)
        throw error
      }
    },
    size: () => entries.size,
  }
}
