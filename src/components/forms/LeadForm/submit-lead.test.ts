import { describe, expect, it, vi } from 'vitest'

import { submitLead } from './submit-lead'

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

describe('submitLead', () => {
  it('отправляет FormData методом POST на /api/leads', async () => {
    const fetch = vi.fn(async () => jsonResponse({ status: 'ok' }))
    const data = new FormData()

    await expect(submitLead(data, { fetch })).resolves.toEqual({ status: 'ok' })

    const [url, init] = fetch.mock.calls[0] as unknown as [string, RequestInit]
    expect(url).toBe('/api/leads')
    expect(init.method).toBe('POST')
    expect(init.body).toBe(data)
  })

  it('возвращает ошибки полей, отбрасывая неизвестные и нестроковые', async () => {
    const fetch = vi.fn(async () =>
      jsonResponse(
        { status: 'invalid', errors: { name: 'Короткое имя', evil: 'x', phone: 42 } },
        400,
      ),
    )

    await expect(submitLead(new FormData(), { fetch })).resolves.toEqual({
      status: 'invalid',
      errors: { name: 'Короткое имя' },
    })
  })

  it('без ошибок полей считает invalid общей ошибкой формы', async () => {
    const fetch = vi.fn(async () => jsonResponse({ status: 'invalid' }, 400))

    await expect(submitLead(new FormData(), { fetch })).resolves.toEqual({ status: 'error' })
  })

  it('распознаёт лимит', async () => {
    const fetch = vi.fn(async () => jsonResponse({ status: 'rate_limited' }, 429))

    await expect(submitLead(new FormData(), { fetch })).resolves.toEqual({ status: 'rate_limited' })
  })

  it.each([
    ['delivery_failed', jsonResponse({ status: 'delivery_failed' }, 502)],
    ['unavailable', jsonResponse({ status: 'unavailable' }, 503)],
    ['HTML от Caddy при деплое', new Response('<html>502 Bad Gateway</html>', { status: 502 })],
    ['пустой ответ', new Response(null, { status: 504 })],
    ['неизвестный статус', jsonResponse({ status: 'что-то' })],
    ['не объект', jsonResponse(['ok'])],
  ])('считает ошибкой: %s', async (_name, response) => {
    const fetch = vi.fn(async () => response)

    await expect(submitLead(new FormData(), { fetch })).resolves.toEqual({ status: 'error' })
  })

  it('считает ошибкой сбой сети', async () => {
    const fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))

    await expect(submitLead(new FormData(), { fetch })).resolves.toEqual({ status: 'error' })
  })

  it('прерывает запрос по таймауту', async () => {
    const fetch = vi.fn(
      (_url: string | URL | Request, init?: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () => reject(init.signal?.reason))
        }),
    )

    await expect(submitLead(new FormData(), { fetch, timeoutMs: 20 })).resolves.toEqual({
      status: 'error',
    })
  })
})
