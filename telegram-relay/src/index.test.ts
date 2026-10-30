import { afterEach, describe, expect, it, vi } from 'vitest'

import { handleRelayRequest, type Env } from './index'

const secret = 's'.repeat(40)
const env: Env = {
  TELEGRAM_BOT_TOKEN: '123:SECRET',
  TELEGRAM_CHAT_ID: '987654',
  RELAY_SECRET: secret,
}

function relayRequest(
  body: BodyInit | null = JSON.stringify({ text: 'Заявка' }),
  {
    method = 'POST',
    path = '/',
    authorization = `Bearer ${secret}`,
  }: { method?: string; path?: string; authorization?: string | null } = {},
) {
  const headers = new Headers({ 'content-type': 'application/json' })
  if (authorization !== null) headers.set('authorization', authorization)
  return new Request(`https://relay.test${path}`, { method, headers, body })
}

function telegramResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

function okFetch() {
  return vi.fn<typeof globalThis.fetch>(async () => telegramResponse({ ok: true, result: {} }))
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('handleRelayRequest', () => {
  it('пересылает текст в рабочий чат и возвращает ответ Telegram как есть', async () => {
    const fetch = okFetch()

    const response = await handleRelayRequest(relayRequest(), env, fetch)

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ ok: true, result: {} })
    expect(fetch).toHaveBeenCalledOnce()
    const [url, init] = fetch.mock.calls[0] as [string, RequestInit]
    expect(url).toBe('https://api.telegram.org/bot123:SECRET/sendMessage')
    expect(init.method).toBe('POST')
    expect(new Headers(init.headers).get('content-type')).toBe('application/json')
    expect(JSON.parse(String(init.body))).toEqual({
      chat_id: '987654',
      text: 'Заявка',
      link_preview_options: { is_disabled: true },
    })
  })

  it('игнорирует chat_id и другие поля из запроса', async () => {
    const fetch = okFetch()

    await handleRelayRequest(
      relayRequest(JSON.stringify({ text: 'т', chat_id: '-1', parse_mode: 'HTML' })),
      env,
      fetch,
    )

    const [, init] = fetch.mock.calls[0] as [string, RequestInit]
    expect(JSON.parse(String(init.body))).toEqual({
      chat_id: '987654',
      text: 'т',
      link_preview_options: { is_disabled: true },
    })
  })

  it.each([
    [429, { ok: false, error_code: 429, parameters: { retry_after: 3 } }],
    [403, { ok: false, error_code: 403, description: 'Forbidden: bot was blocked by the user' }],
    [400, { ok: false, error_code: 400, parameters: { migrate_to_chat_id: -1009876 } }],
  ])('передаёт ошибку Telegram %i без изменений и без повтора', async (status, body) => {
    const fetch = vi.fn<typeof globalThis.fetch>(async () => telegramResponse(body, status))

    const response = await handleRelayRequest(relayRequest(), env, fetch)

    expect(response.status).toBe(status)
    expect(await response.json()).toEqual(body)
    expect(fetch).toHaveBeenCalledOnce()
  })

  it.each([
    ['без заголовка', null],
    ['с чужим секретом', `Bearer ${'x'.repeat(40)}`],
    ['с секретом другой длины', 'Bearer short'],
    ['с секретом без схемы', secret],
  ])('отклоняет запрос %s', async (_title, authorization) => {
    const fetch = okFetch()

    const response = await handleRelayRequest(
      relayRequest(undefined, { authorization }),
      env,
      fetch,
    )

    expect(response.status).toBe(401)
    expect(await response.json()).toMatchObject({ ok: false, error_code: 401 })
    expect(fetch).not.toHaveBeenCalled()
  })

  it.each([
    [{ ...env, TELEGRAM_BOT_TOKEN: undefined }],
    [{ ...env, TELEGRAM_CHAT_ID: ' ' }],
    [{ ...env, RELAY_SECRET: undefined }],
    [{ ...env, RELAY_SECRET: 'короткий' }],
  ])('отвечает 500 без обращения к Telegram при неполной настройке %#', async (badEnv) => {
    const fetch = okFetch()

    const response = await handleRelayRequest(relayRequest(), badEnv, fetch)

    expect(response.status).toBe(500)
    expect(await response.json()).toMatchObject({ ok: false, error_code: 500 })
    expect(fetch).not.toHaveBeenCalled()
  })

  it('отвечает 404 на другой путь', async () => {
    const fetch = okFetch()

    const response = await handleRelayRequest(relayRequest(undefined, { path: '/bot' }), env, fetch)

    expect(response.status).toBe(404)
    expect(fetch).not.toHaveBeenCalled()
  })

  it('отвечает 405 на GET', async () => {
    const response = await handleRelayRequest(relayRequest(null, { method: 'GET' }), env, okFetch())

    expect(response.status).toBe(405)
    expect(response.headers.get('allow')).toBe('POST')
  })

  it.each([
    ['не JSON', 'text=привет'],
    ['не объект', JSON.stringify('привет')],
    ['без текста', JSON.stringify({})],
    ['с пустым текстом', JSON.stringify({ text: '  ' })],
    ['с текстом не строкой', JSON.stringify({ text: 42 })],
    ['с текстом длиннее 4096', JSON.stringify({ text: 'а'.repeat(4097) })],
  ])('отвечает 400 на тело %s', async (_title, body) => {
    const fetch = okFetch()

    const response = await handleRelayRequest(relayRequest(body), env, fetch)

    expect(response.status).toBe(400)
    expect(await response.json()).toMatchObject({ ok: false, error_code: 400 })
    expect(fetch).not.toHaveBeenCalled()
  })

  it('отвечает 413 на тело больше 16 КБ', async () => {
    const fetch = okFetch()

    const response = await handleRelayRequest(
      relayRequest(JSON.stringify({ text: 'т', padding: 'x'.repeat(17 * 1024) })),
      env,
      fetch,
    )

    expect(response.status).toBe(413)
    expect(fetch).not.toHaveBeenCalled()
  })

  it('отвечает 502, если Telegram недоступен', async () => {
    const fetch = vi.fn<typeof globalThis.fetch>(async () => {
      throw new TypeError('fetch failed')
    })

    const response = await handleRelayRequest(relayRequest(), env, fetch)

    expect(response.status).toBe(502)
    expect(await response.json()).toMatchObject({ ok: false, error_code: 502 })
  })

  it('отвечает 504, если Telegram не ответил за отведённое время', async () => {
    const fetch = vi.fn<typeof globalThis.fetch>(async () => {
      throw new DOMException('timed out', 'TimeoutError')
    })

    const response = await handleRelayRequest(relayRequest(), env, fetch)

    expect(response.status).toBe(504)
    expect(await response.json()).toMatchObject({ ok: false, error_code: 504 })
  })

  it('ограничивает запрос к Telegram таймаутом', async () => {
    const fetch = okFetch()

    await handleRelayRequest(relayRequest(), env, fetch)

    const [, init] = fetch.mock.calls[0] as [string, RequestInit]
    expect(init.signal).toBeInstanceOf(AbortSignal)
  })

  it('не пишет в лог текст заявки и токен', async () => {
    const info = vi.spyOn(console, 'log').mockImplementation(() => {})
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    const fetch = vi
      .fn<typeof globalThis.fetch>()
      .mockResolvedValueOnce(telegramResponse({ ok: true, result: {} }))
      .mockRejectedValueOnce(new TypeError('fetch failed https://api.telegram.org/bot123:SECRET'))

    await handleRelayRequest(
      relayRequest(JSON.stringify({ text: 'Анна +79990000000' })),
      env,
      fetch,
    )
    await handleRelayRequest(
      relayRequest(JSON.stringify({ text: 'Анна +79990000000' })),
      env,
      fetch,
    )

    const logged = JSON.stringify([...info.mock.calls, ...error.mock.calls])
    expect(logged).not.toContain('Анна')
    expect(logged).not.toContain('SECRET')
    expect(info).toHaveBeenCalled()
  })
})
