import { afterEach, expect, it, vi } from 'vitest'

import { createLeadHandler } from './handle-lead-request'
import { sendTelegramMessage } from './telegram'

afterEach(() => {
  vi.restoreAllMocks()
  vi.useRealTimers()
})

it('не создаёт две доставки после медленного 429 и ручного повтора заявки', async () => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2026-10-30T00:00:00Z'))
  vi.spyOn(AbortSignal, 'timeout').mockImplementation((ms) => {
    const controller = new AbortController()
    setTimeout(() => controller.abort(new DOMException('timeout', 'TimeoutError')), ms)
    return controller.signal
  })

  let calls = 0
  const delivered: string[] = []
  const fetch = vi.fn((_url: string | URL | Request, init?: RequestInit) => {
    const attempt = ++calls
    return new Promise<Response>((resolve, reject) => {
      init?.signal?.addEventListener('abort', () => reject(init.signal?.reason), { once: true })
      if (attempt === 1) {
        setTimeout(
          () =>
            resolve(
              Response.json(
                {
                  ok: false,
                  error_code: 429,
                  parameters: { retry_after: 1 },
                },
                { status: 429 },
              ),
            ),
          6000,
        )
      } else {
        // Worker может завершить доставку, даже если сайт уже отменил свой fetch.
        setTimeout(() => {
          delivered.push(JSON.parse(String(init?.body)).text)
          resolve(Response.json({ ok: true }))
        }, 10000)
      }
    })
  })
  const config = { mode: 'relay' as const, relayUrl: 'https://relay.test/', relaySecret: 'test' }
  const handle = createLeadHandler({
    siteUrl: 'https://site.test',
    allowedOrigins: [],
    allowLocalhost: false,
    readConfig: () => config,
    send: (text, options) => sendTelegramMessage(text, options, { fetch }),
    log: () => {},
  })
  function request() {
    const data = new FormData()
    for (const [key, value] of Object.entries({
      kind: 'project',
      requestId: '11111111-1111-4111-8111-111111111111',
      name: 'Тест',
      phone: '+70000000000',
    }))
      data.set(key, value)
    return new Request('https://site.test/api/leads', {
      method: 'POST',
      headers: { origin: 'https://site.test', 'x-forwarded-for': '198.51.100.80' },
      body: data,
    })
  }

  const first = handle(request())
  await vi.advanceTimersByTimeAsync(12001)
  expect((await first).status).toBe(502)
  const manualRetry = handle(request())
  await vi.advanceTimersByTimeAsync(10001)
  expect((await manualRetry).status).toBe(200)
  expect(delivered).toHaveLength(1)
  expect(calls).toBe(2)
})
