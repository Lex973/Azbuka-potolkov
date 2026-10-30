import { describe, expect, it, vi } from 'vitest'

import type { Lead } from './lead'
import {
  formatLeadMessage,
  readTelegramConfig,
  sendTelegramMessage,
  type TelegramConfig,
} from './telegram'

const config: TelegramConfig = {
  mode: 'direct',
  token: '123:SECRET',
  chatId: '-100500',
  apiBaseUrl: 'https://tg.test',
}
const relayConfig: TelegramConfig = {
  mode: 'relay',
  relayUrl: 'https://relay.test/',
  relaySecret: 'RELAY_SECRET',
}

function telegramResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

function connectionError(code: string) {
  return new TypeError('fetch failed', { cause: Object.assign(new Error(code), { code }) })
}

/** fetch, который не отвечает, пока запрос не отменят по таймауту. */
function hangingFetch() {
  return vi.fn(
    (_url: string | URL | Request, init?: RequestInit) =>
      new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => reject(init.signal?.reason))
      }),
  )
}

describe('readTelegramConfig', () => {
  it('читает обязательные переменные и адрес API по умолчанию', () => {
    expect(
      readTelegramConfig({ TELEGRAM_BOT_TOKEN: ' 123:abc ', TELEGRAM_CHAT_ID: ' -100500 ' }),
    ).toEqual({
      mode: 'direct',
      token: '123:abc',
      chatId: '-100500',
      apiBaseUrl: 'https://api.telegram.org',
    })
  })

  it('берёт свой адрес API без завершающего слеша', () => {
    expect(
      readTelegramConfig({
        TELEGRAM_BOT_TOKEN: '123:abc',
        TELEGRAM_CHAT_ID: '-100500',
        TELEGRAM_API_BASE_URL: 'http://127.0.0.1:4010/',
      }),
    ).toMatchObject({ apiBaseUrl: 'http://127.0.0.1:4010' })
  })

  it.each([
    [{}],
    [{ TELEGRAM_BOT_TOKEN: '123:abc' }],
    [{ TELEGRAM_CHAT_ID: '-100500' }],
    [{ TELEGRAM_BOT_TOKEN: ' ', TELEGRAM_CHAT_ID: '-100500' }],
    [{ TELEGRAM_BOT_TOKEN: '123:abc', TELEGRAM_CHAT_ID: '-1', TELEGRAM_API_BASE_URL: 'ftp://x' }],
    [{ TELEGRAM_BOT_TOKEN: '123:abc', TELEGRAM_CHAT_ID: '-1', TELEGRAM_API_BASE_URL: 'не адрес' }],
  ])('возвращает null при неполной конфигурации %#', (env) => {
    expect(readTelegramConfig(env)).toBeNull()
  })

  it('выбирает ретранслятор, если задан его адрес, даже при заданном токене', () => {
    expect(
      readTelegramConfig({
        TELEGRAM_RELAY_URL: ' https://azbuka.example.workers.dev ',
        TELEGRAM_RELAY_SECRET: ' secret ',
        TELEGRAM_BOT_TOKEN: '123:abc',
        TELEGRAM_CHAT_ID: '-100500',
      }),
    ).toEqual({
      mode: 'relay',
      relayUrl: 'https://azbuka.example.workers.dev',
      relaySecret: 'secret',
    })
  })

  it.each(['http://localhost:8787', 'http://127.0.0.1:8787/'])(
    'разрешает http-ретранслятор только на локальной машине: %s',
    (url) => {
      expect(
        readTelegramConfig({ TELEGRAM_RELAY_URL: url, TELEGRAM_RELAY_SECRET: 's' }),
      ).toMatchObject({ mode: 'relay' })
    },
  )

  it.each([
    [{ TELEGRAM_RELAY_URL: 'https://relay.test' }],
    [{ TELEGRAM_RELAY_URL: 'https://relay.test', TELEGRAM_RELAY_SECRET: ' ' }],
    [{ TELEGRAM_RELAY_URL: 'http://relay.test', TELEGRAM_RELAY_SECRET: 's' }],
    [{ TELEGRAM_RELAY_URL: 'не адрес', TELEGRAM_RELAY_SECRET: 's' }],
    [{ TELEGRAM_RELAY_URL: 'https://user:pass@relay.test', TELEGRAM_RELAY_SECRET: 's' }],
  ])('возвращает null при неверной настройке ретранслятора %#', (env) => {
    expect(
      readTelegramConfig({ ...env, TELEGRAM_BOT_TOKEN: '123:abc', TELEGRAM_CHAT_ID: '-1' }),
    ).toBeNull()
  })
})

describe('formatLeadMessage', () => {
  const base: Lead = {
    kind: 'project',
    requestId: '3f9a1c2b-0d4e-4f5a-9b6c-7d8e9f0a1b2c',
    name: 'Анна',
    phone: '+79990000000',
  }

  it('собирает заявку на проект', () => {
    expect(
      formatLeadMessage(
        { ...base, message: 'Квартира 120 м²\nчерновая отделка', page: '/projects/skyline' },
        'https://azbukapotolkov.ru',
      ),
    ).toBe(
      [
        'Заявка: обсудить проект · #3F9A1C',
        'Имя: Анна',
        'Телефон: +7 999 000-00-00',
        'О проекте: Квартира 120 м²\nчерновая отделка',
        'Страница: https://azbukapotolkov.ru/projects/skyline',
      ].join('\n'),
    )
  })

  it('собирает запись в студию без необязательных полей', () => {
    expect(
      formatLeadMessage(
        { ...base, kind: 'studio', preferredTime: 'четверг после 15:00' },
        'https://azbukapotolkov.ru',
      ),
    ).toBe(
      [
        'Заявка: запись в студию · #3F9A1C',
        'Имя: Анна',
        'Телефон: +7 999 000-00-00',
        'Когда удобно: четверг после 15:00',
      ].join('\n'),
    )
  })

  it('оставляет иностранный номер как есть', () => {
    expect(formatLeadMessage({ ...base, phone: '+442079460958' }, 'https://a.ru')).toContain(
      'Телефон: +442079460958',
    )
  })
})

describe('sendTelegramMessage', () => {
  it('отправляет простой текст без parse_mode и с отключённым превью', async () => {
    const fetch = vi.fn(async () => telegramResponse({ ok: true, result: {} }))

    await expect(sendTelegramMessage('Текст <b>', config, { fetch })).resolves.toEqual({ ok: true })

    expect(fetch).toHaveBeenCalledOnce()
    const [url, init] = fetch.mock.calls[0] as unknown as [string, RequestInit]
    expect(url).toBe('https://tg.test/bot123:SECRET/sendMessage')
    expect(init.method).toBe('POST')
    expect(new Headers(init.headers).get('content-type')).toBe('application/json')
    expect(JSON.parse(String(init.body))).toEqual({
      chat_id: '-100500',
      text: 'Текст <b>',
      link_preview_options: { is_disabled: true },
    })
  })

  it.each([
    [401, { ok: false, error_code: 401, description: 'Unauthorized' }],
    [403, { ok: false, error_code: 403, description: 'Forbidden: bot was kicked' }],
    [400, { ok: false, error_code: 400, description: 'Bad Request: chat not found' }],
    [500, { ok: false, error_code: 500, description: 'Internal Server Error' }],
    [200, { ok: false, error_code: 400, description: 'странный ответ' }],
  ])('считает ответ %i отказом без повтора', async (status, body) => {
    const fetch = vi.fn(async () => telegramResponse(body, status))

    await expect(sendTelegramMessage('т', config, { fetch })).resolves.toEqual({
      ok: false,
      reason: 'rejected',
      telegramCode: body.error_code,
    })
    expect(fetch).toHaveBeenCalledOnce()
  })

  it('передаёт migrate_to_chat_id, если группа стала супергруппой', async () => {
    const fetch = vi.fn(async () =>
      telegramResponse(
        { ok: false, error_code: 400, parameters: { migrate_to_chat_id: -1009876 } },
        400,
      ),
    )

    await expect(sendTelegramMessage('т', config, { fetch })).resolves.toEqual({
      ok: false,
      reason: 'rejected',
      telegramCode: 400,
      migrateToChatId: -1009876,
    })
  })

  it('считает не-JSON ответ (HTML от прокси) плохим ответом', async () => {
    const fetch = vi.fn(async () => new Response('<html>502</html>', { status: 502 }))

    await expect(sendTelegramMessage('т', config, { fetch })).resolves.toEqual({
      ok: false,
      reason: 'bad_response',
      httpStatus: 502,
    })
  })

  it('повторяет один раз после 429 с коротким retry_after', async () => {
    const sleep = vi.fn(async () => {})
    const fetch = vi
      .fn()
      .mockResolvedValueOnce(
        telegramResponse({ ok: false, error_code: 429, parameters: { retry_after: 2 } }, 429),
      )
      .mockResolvedValueOnce(telegramResponse({ ok: true, result: {} }))

    await expect(sendTelegramMessage('т', config, { fetch, sleep })).resolves.toEqual({ ok: true })
    expect(sleep).toHaveBeenCalledWith(2000)
    expect(fetch).toHaveBeenCalledTimes(2)
  })

  it('не повторяет 429 с длинным retry_after', async () => {
    const sleep = vi.fn(async () => {})
    const fetch = vi.fn(async () =>
      telegramResponse({ ok: false, error_code: 429, parameters: { retry_after: 30 } }, 429),
    )

    await expect(sendTelegramMessage('т', config, { fetch, sleep })).resolves.toEqual({
      ok: false,
      reason: 'rate_limited',
      telegramCode: 429,
    })
    expect(fetch).toHaveBeenCalledOnce()
    expect(sleep).not.toHaveBeenCalled()
  })

  it('не повторяет 429, если повтор не помещается в дедлайн', async () => {
    const sleep = vi.fn(async () => {})
    const fetch = vi.fn(async () =>
      telegramResponse({ ok: false, error_code: 429, parameters: { retry_after: 5 } }, 429),
    )

    const result = await sendTelegramMessage('т', config, { fetch, sleep, deadlineMs: 4000 })

    expect(result).toEqual({ ok: false, reason: 'rate_limited', telegramCode: 429 })
    expect(fetch).toHaveBeenCalledOnce()
  })

  it('повторяет только один раз даже при повторном 429', async () => {
    const sleep = vi.fn(async () => {})
    const fetch = vi.fn(async () =>
      telegramResponse({ ok: false, error_code: 429, parameters: { retry_after: 1 } }, 429),
    )

    await expect(sendTelegramMessage('т', config, { fetch, sleep })).resolves.toMatchObject({
      ok: false,
      reason: 'rate_limited',
    })
    expect(fetch).toHaveBeenCalledTimes(2)
  })

  it.each(['ECONNREFUSED', 'ENOTFOUND', 'EAI_AGAIN', 'UND_ERR_CONNECT_TIMEOUT'])(
    'повторяет один раз после ошибки соединения %s',
    async (code) => {
      const fetch = vi
        .fn()
        .mockRejectedValueOnce(connectionError(code))
        .mockResolvedValueOnce(telegramResponse({ ok: true, result: {} }))

      await expect(sendTelegramMessage('т', config, { fetch })).resolves.toEqual({ ok: true })
      expect(fetch).toHaveBeenCalledTimes(2)
    },
  )

  it('не повторяет ошибку после установки соединения', async () => {
    const fetch = vi.fn().mockRejectedValue(connectionError('ECONNRESET'))

    await expect(sendTelegramMessage('т', config, { fetch })).resolves.toEqual({
      ok: false,
      reason: 'network',
      errorCode: 'ECONNRESET',
    })
    expect(fetch).toHaveBeenCalledOnce()
  })

  it('не повторяет дважды подряд ошибку соединения', async () => {
    const fetch = vi.fn().mockRejectedValue(connectionError('ECONNREFUSED'))

    await expect(sendTelegramMessage('т', config, { fetch })).resolves.toEqual({
      ok: false,
      reason: 'network',
      errorCode: 'ECONNREFUSED',
    })
    expect(fetch).toHaveBeenCalledTimes(2)
  })

  it('прерывает запрос по дедлайну и не повторяет его', async () => {
    const fetch = hangingFetch()

    await expect(sendTelegramMessage('т', config, { fetch, deadlineMs: 30 })).resolves.toEqual({
      ok: false,
      reason: 'timeout',
    })
    expect(fetch).toHaveBeenCalledOnce()
  })

  it('считает таймаутом обрыв по дедлайну во время чтения ответа', async () => {
    const fetch = vi.fn(
      async (_url: string | URL | Request, init?: RequestInit) =>
        new Response(
          new ReadableStream({
            start(controller) {
              init?.signal?.addEventListener('abort', () => controller.error(init.signal?.reason))
            },
          }),
        ),
    )

    await expect(sendTelegramMessage('т', config, { fetch, deadlineMs: 30 })).resolves.toEqual({
      ok: false,
      reason: 'timeout',
    })
  })

  it('через ретранслятор отправляет только текст и секрет в заголовке', async () => {
    const fetch = vi.fn(async () => telegramResponse({ ok: true, result: {} }))

    await expect(sendTelegramMessage('Текст', relayConfig, { fetch })).resolves.toEqual({
      ok: true,
    })

    expect(fetch).toHaveBeenCalledOnce()
    const [url, init] = fetch.mock.calls[0] as unknown as [string, RequestInit]
    expect(url).toBe('https://relay.test/')
    expect(init.method).toBe('POST')
    const headers = new Headers(init.headers)
    expect(headers.get('authorization')).toBe('Bearer RELAY_SECRET')
    expect(headers.get('content-type')).toBe('application/json')
    expect(JSON.parse(String(init.body))).toEqual({ text: 'Текст' })
  })

  it('через ретранслятор возвращает 429 без автоматического повтора', async () => {
    const sleep = vi.fn(async () => {})
    const fetch = vi
      .fn()
      .mockResolvedValueOnce(
        telegramResponse({ ok: false, error_code: 429, parameters: { retry_after: 1 } }, 429),
      )
      .mockResolvedValueOnce(
        telegramResponse({ ok: false, error_code: 403, description: 'Forbidden' }, 403),
      )

    await expect(sendTelegramMessage('т', relayConfig, { fetch, sleep })).resolves.toEqual({
      ok: false,
      reason: 'rate_limited',
      telegramCode: 429,
    })
    expect(fetch).toHaveBeenCalledOnce()
    expect(sleep).not.toHaveBeenCalled()
  })

  it.each(['ECONNREFUSED', 'ENOTFOUND', 'EAI_AGAIN', 'UND_ERR_CONNECT_TIMEOUT'])(
    'не запускает повторную доставку через ретранслятор после %s',
    async (code) => {
      const fetch = vi
        .fn()
        .mockRejectedValueOnce(connectionError(code))
        .mockResolvedValueOnce(telegramResponse({ ok: true }))

      await expect(sendTelegramMessage('т', relayConfig, { fetch })).resolves.toEqual({
        ok: false,
        reason: 'network',
        errorCode: code,
      })
      expect(fetch).toHaveBeenCalledOnce()
    },
  )

  it('через ретранслятор распознаёт отказ Telegram без повтора', async () => {
    const fetch = vi.fn(async () =>
      telegramResponse({ ok: false, error_code: 403, description: 'Forbidden' }, 403),
    )

    await expect(sendTelegramMessage('т', relayConfig, { fetch })).resolves.toEqual({
      ok: false,
      reason: 'rejected',
      telegramCode: 403,
    })
    expect(fetch).toHaveBeenCalledOnce()
  })

  it('считает HTML-страницу Cloudflare плохим ответом', async () => {
    const fetch = vi.fn(async () => new Response('<html>Error 1101</html>', { status: 500 }))

    await expect(sendTelegramMessage('т', relayConfig, { fetch })).resolves.toEqual({
      ok: false,
      reason: 'bad_response',
      httpStatus: 500,
    })
  })

  it('не раскрывает секрет ретранслятора в результате', async () => {
    const fetch = vi.fn().mockRejectedValue(new Error('fail RELAY_SECRET'))

    const result = await sendTelegramMessage('т', relayConfig, { fetch })

    expect(JSON.stringify(result)).not.toContain('RELAY_SECRET')
  })

  it('не раскрывает токен в результате', async () => {
    const fetch = vi.fn().mockRejectedValue(new Error(`fail https://tg.test/bot${config.token}/x`))

    const result = await sendTelegramMessage('т', config, { fetch })

    expect(JSON.stringify(result)).not.toContain('SECRET')
  })
})
