import { beforeEach, describe, expect, it, vi } from 'vitest'

import { createLeadHandler, type LeadHandlerDeps } from './handle-lead-request'
import type { DeliveryResult, TelegramConfig } from './telegram'

const siteUrl = 'https://azbukapotolkov.ru'
const config: TelegramConfig = {
  mode: 'direct',
  token: '123:SECRET',
  chatId: '-100500',
  apiBaseUrl: 'https://tg.test',
}

let requestCounter = 0

function uuid() {
  requestCounter += 1
  return `00000000-0000-4000-8000-${String(requestCounter).padStart(12, '0')}`
}

function leadForm(overrides: Record<string, string> = {}) {
  const data = new FormData()
  const fields = {
    kind: 'project',
    requestId: uuid(),
    name: 'Анна',
    phone: '+7 999 000-00-00',
    page: '/',
    ...overrides,
  }
  for (const [key, value] of Object.entries(fields)) data.append(key, value)
  return data
}

function post(
  body: BodyInit | null,
  {
    origin = siteUrl,
    ip = '203.0.113.7',
    headers = {},
  }: {
    origin?: string | null
    ip?: string
    headers?: Record<string, string>
  } = {},
) {
  const allHeaders = new Headers(headers)
  if (origin !== null) allHeaders.set('origin', origin)
  allHeaders.set('x-forwarded-for', ip)
  return new Request(`${siteUrl}/api/leads`, { method: 'POST', headers: allHeaders, body })
}

function setup(overrides: Partial<LeadHandlerDeps> = {}) {
  const send = vi.fn<(text: string) => Promise<DeliveryResult>>(async () => ({ ok: true }))
  const log = vi.fn()
  const deps: LeadHandlerDeps = {
    siteUrl,
    allowedOrigins: [],
    allowLocalhost: false,
    readConfig: () => config,
    send: (text) => send(text),
    log,
    ...overrides,
  }
  return { handler: createLeadHandler(deps), send, log }
}

async function json(response: Response) {
  return (await response.json()) as Record<string, unknown>
}

beforeEach(() => {
  requestCounter = 0
})

describe('createLeadHandler', () => {
  it('доставляет корректную заявку', async () => {
    const { handler, send, log } = setup()
    const form = leadForm({ requestId: '3f9a1c2b-0d4e-4f5a-9b6c-7d8e9f0a1b2c' })

    const response = await handler(post(form))

    expect(response.status).toBe(200)
    expect(response.headers.get('cache-control')).toBe('no-store')
    expect(await json(response)).toEqual({ status: 'ok' })
    expect(send).toHaveBeenCalledOnce()
    expect(send.mock.calls[0][0]).toContain('#3F9A1C')
    expect(send.mock.calls[0][0]).toContain('Страница: https://azbukapotolkov.ru/')
    expect(log).toHaveBeenCalledWith(
      expect.objectContaining({
        event: 'lead',
        id: '3F9A1C',
        kind: 'project',
        result: 'delivered',
      }),
    )
  })

  it('не пишет персональные данные и токен в лог', async () => {
    const { handler, log } = setup({ send: async () => ({ ok: false, reason: 'timeout' }) })

    await handler(post(leadForm({ name: 'Секретное Имя', message: 'тайна' })))

    const logged = JSON.stringify(log.mock.calls)
    expect(logged).not.toContain('Секретное')
    expect(logged).not.toContain('9990000000')
    expect(logged).not.toContain('тайна')
    expect(logged).not.toContain('SECRET')
  })

  describe('Origin', () => {
    it.each([null, 'https://evil.example', 'https://azbukapotolkov.ru.evil.example', 'null'])(
      'отклоняет %j',
      async (origin) => {
        const { handler, send } = setup()

        const response = await handler(post(leadForm(), { origin }))

        expect(response.status).toBe(403)
        expect(await json(response)).toEqual({ status: 'forbidden' })
        expect(send).not.toHaveBeenCalled()
      },
    )

    it('пропускает дополнительный разрешённый Origin', async () => {
      const { handler } = setup({ allowedOrigins: ['https://www.azbukapotolkov.ru'] })

      const response = await handler(post(leadForm(), { origin: 'https://www.azbukapotolkov.ru' }))

      expect(response.status).toBe(200)
    })

    it('пропускает localhost только в режиме разработки', async () => {
      const dev = setup({ allowLocalhost: true })
      const prod = setup()

      expect(
        (await dev.handler(post(leadForm(), { origin: 'http://localhost:3005' }))).status,
      ).toBe(200)
      expect(
        (await dev.handler(post(leadForm(), { origin: 'http://127.0.0.1:3000' }))).status,
      ).toBe(200)
      expect(
        (await prod.handler(post(leadForm(), { origin: 'http://localhost:3005' }))).status,
      ).toBe(403)
    })
  })

  it.each([
    ['application/json', JSON.stringify({ name: 'Анна' })],
    ['text/plain', 'name=Анна'],
    ['application/x-www-form-urlencoded', 'name=Анна'],
  ])('отклоняет %s', async (contentType, body) => {
    const { handler } = setup()

    const response = await handler(post(body, { headers: { 'content-type': contentType } }))

    expect(response.status).toBe(415)
    expect(await json(response)).toEqual({ status: 'unsupported' })
  })

  it('отклоняет заявленный размер больше 16 КБ, не читая тело', async () => {
    const { handler } = setup()
    const request = post(leadForm())
    request.headers.set('content-length', String(16 * 1024 + 1))

    const response = await handler(request)

    expect(response.status).toBe(413)
    expect(await json(response)).toEqual({ status: 'too_large' })
    expect(request.bodyUsed).toBe(false)
  })

  it('отклоняет фактическое тело больше 16 КБ без Content-Length', async () => {
    const { handler, send } = setup()
    // Тело — обычный поток кусками, как от Node в проде (chunked, без длины).
    const multipart = new Response(leadForm({ message: 'а'.repeat(9000) }))
    const bytes = new Uint8Array(await multipart.arrayBuffer())
    let offset = 0
    const stream = new ReadableStream<Uint8Array>({
      pull(controller) {
        if (offset >= bytes.length) return controller.close()
        controller.enqueue(bytes.slice(offset, (offset += 4096)))
      },
    })
    const request = new Request(`${siteUrl}/api/leads`, {
      method: 'POST',
      headers: {
        origin: siteUrl,
        'x-forwarded-for': '203.0.113.7',
        'content-type': multipart.headers.get('content-type') ?? '',
      },
      body: stream,
      duplex: 'half',
    } as RequestInit)

    const response = await handler(request)

    expect(response.status).toBe(413)
    expect(send).not.toHaveBeenCalled()
  })

  it('отвечает 400 на неразбираемое тело', async () => {
    const { handler } = setup()

    const response = await handler(
      post('мусор', { headers: { 'content-type': 'multipart/form-data; boundary=xyz' } }),
    )

    expect(response.status).toBe(400)
    expect(await json(response)).toMatchObject({ status: 'invalid' })
  })

  it('отвечает 400 с ошибками полей', async () => {
    const { handler, send } = setup()

    const response = await handler(post(leadForm({ name: 'А', phone: 'abc' })))

    expect(response.status).toBe(400)
    expect(await json(response)).toEqual({
      status: 'invalid',
      errors: {
        name: 'Имя должно быть не короче 2 символов',
        phone: 'Проверьте номер, например +7 999 000-00-00',
      },
    })
    expect(send).not.toHaveBeenCalled()
  })

  it('тихо принимает заявку с заполненным honeypot и пишет это в лог', async () => {
    const { handler, send, log } = setup()

    const response = await handler(post(leadForm({ leadTrap: 'http://spam.example' })))

    expect(response.status).toBe(200)
    expect(await json(response)).toEqual({ status: 'ok' })
    expect(send).not.toHaveBeenCalled()
    expect(log).toHaveBeenCalledWith(expect.objectContaining({ event: 'lead', result: 'honeypot' }))
  })

  it('отвечает 503, если отправка не настроена', async () => {
    const { handler, send, log } = setup({ readConfig: () => null })

    const response = await handler(post(leadForm()))

    expect(response.status).toBe(503)
    expect(await json(response)).toEqual({ status: 'unavailable' })
    expect(send).not.toHaveBeenCalled()
    expect(log).toHaveBeenCalledWith(expect.objectContaining({ result: 'not_configured' }))
  })

  it('отвечает 502 и пишет причину, если Telegram не принял сообщение', async () => {
    const { handler, log } = setup({
      send: async () => ({
        ok: false,
        reason: 'rejected',
        telegramCode: 400,
        migrateToChatId: -100777,
      }),
    })

    const response = await handler(post(leadForm()))

    expect(response.status).toBe(502)
    expect(await json(response)).toEqual({ status: 'delivery_failed' })
    expect(log).toHaveBeenCalledWith(
      expect.objectContaining({
        result: 'failed',
        reason: 'rejected',
        telegramCode: 400,
        migrateToChatId: -100777,
      }),
    )
  })

  describe('дедупликация', () => {
    it('не отправляет повторно ту же заявку', async () => {
      const { handler, send } = setup()
      const requestId = uuid()

      const first = await handler(post(leadForm({ requestId })))
      const second = await handler(post(leadForm({ requestId })))

      expect(first.status).toBe(200)
      expect(second.status).toBe(200)
      expect(send).toHaveBeenCalledOnce()
    })

    it('отправляет исправленную заявку с тем же requestId', async () => {
      const { handler, send } = setup()
      const requestId = uuid()

      await handler(post(leadForm({ requestId, phone: '+7 999 000-00-01' })))
      await handler(post(leadForm({ requestId, phone: '+7 999 000-00-02' })))

      expect(send).toHaveBeenCalledTimes(2)
    })

    it('отправляет повтор после неудачи', async () => {
      const send = vi
        .fn<() => Promise<DeliveryResult>>()
        .mockResolvedValueOnce({ ok: false, reason: 'timeout' })
        .mockResolvedValueOnce({ ok: true })
      const { handler } = setup({ send })
      const requestId = uuid()

      expect((await handler(post(leadForm({ requestId })))).status).toBe(502)
      expect((await handler(post(leadForm({ requestId })))).status).toBe(200)
      expect(send).toHaveBeenCalledTimes(2)
    })

    it('отправляет параллельные одинаковые запросы один раз', async () => {
      const { handler, send } = setup()
      const requestId = uuid()

      const responses = await Promise.all([
        handler(post(leadForm({ requestId }))),
        handler(post(leadForm({ requestId }))),
      ])

      expect(responses.map((response) => response.status)).toEqual([200, 200])
      expect(send).toHaveBeenCalledOnce()
    })
  })

  describe('лимиты', () => {
    it('ограничивает попытки с одного IP: 10 за 10 минут', async () => {
      const { handler } = setup()

      for (let index = 0; index < 10; index += 1) {
        expect((await handler(post(leadForm({ name: 'А' })))).status).toBe(400)
      }
      const blocked = await handler(post(leadForm()))

      expect(blocked.status).toBe(429)
      expect(blocked.headers.get('retry-after')).toBe('600')
      expect(await json(blocked)).toEqual({ status: 'rate_limited' })
      expect((await handler(post(leadForm(), { ip: '198.51.100.1' }))).status).toBe(200)
    })

    it('считает адреса одной IPv6 /64 одним клиентом', async () => {
      const { handler } = setup()

      for (let index = 0; index < 10; index += 1) {
        await handler(post(leadForm(), { ip: `2001:db8:1:2::${index + 1}` }))
      }

      expect((await handler(post(leadForm(), { ip: '2001:db8:1:2::ff' }))).status).toBe(429)
    })

    it('общий лимит считает только реальные отправки: 20 в минуту', async () => {
      const { handler, send } = setup()
      let ip = 0
      const nextIp = () => `198.51.100.${(ip += 1)}`

      await handler(post(leadForm({ leadTrap: 'x' }), { ip: nextIp() }))
      await handler(post(leadForm({ phone: 'abc' }), { ip: nextIp() }))
      for (let index = 0; index < 20; index += 1) {
        expect((await handler(post(leadForm(), { ip: nextIp() }))).status).toBe(200)
      }
      const blocked = await handler(post(leadForm(), { ip: nextIp() }))

      expect(blocked.status).toBe(429)
      expect(send).toHaveBeenCalledTimes(20)
    })

    it('предупреждает в логе, если ключ лимита — частный адрес', async () => {
      const { handler, log } = setup()

      await handler(post(leadForm(), { ip: '10.0.2.2' }))

      expect(log).toHaveBeenCalledWith(expect.objectContaining({ event: 'lead_client_ip_private' }))
    })
  })
})
