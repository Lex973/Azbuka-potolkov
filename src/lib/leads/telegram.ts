import 'server-only'

import type { Lead, LeadKind } from './lead'

/**
 * direct — напрямую в Bot API.
 * relay — через свой ретранслятор (`telegram-relay/`): токен и чат хранятся у него,
 * сайт передаёт только текст и общий секрет.
 */
export type TelegramConfig =
  | { mode: 'direct'; token: string; chatId: string; apiBaseUrl: string }
  | { mode: 'relay'; relayUrl: string; relaySecret: string }

export type DeliveryResult =
  | { ok: true }
  | {
      ok: false
      reason: 'rejected' | 'rate_limited'
      telegramCode: number
      migrateToChatId?: number
    }
  | { ok: false; reason: 'bad_response'; httpStatus: number }
  | { ok: false; reason: 'timeout' }
  | { ok: false; reason: 'network'; errorCode?: string }

type SendOptions = {
  fetch?: typeof globalThis.fetch
  /** Общий срок на доставку вместе с повтором. Меньше клиентского таймаута (20 с). */
  deadlineMs?: number
  sleep?: (ms: number) => Promise<void>
}

const defaultApiBaseUrl = 'https://api.telegram.org'
const maxRetryAfterSeconds = 5
// Ошибки до установки соединения: сообщение точно не ушло, повтор не даст дубля.
const retriableConnectionCodes = new Set([
  'ECONNREFUSED',
  'ENOTFOUND',
  'EAI_AGAIN',
  'UND_ERR_CONNECT_TIMEOUT',
])

const kindTitles: Record<LeadKind, string> = {
  project: 'обсудить проект',
  studio: 'запись в студию',
}

function isLocalHttp(url: URL) {
  return url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname)
}

export function readTelegramConfig(env: Record<string, string | undefined>): TelegramConfig | null {
  const relayUrl = env.TELEGRAM_RELAY_URL?.trim()
  if (relayUrl) {
    const relaySecret = env.TELEGRAM_RELAY_SECRET?.trim()
    if (!relaySecret || !URL.canParse(relayUrl)) return null

    const url = new URL(relayUrl)
    // Секрет идёт в заголовке: по сети только https, http — для локальной заглушки.
    if (url.protocol !== 'https:' && !isLocalHttp(url)) return null
    if (url.username || url.password) return null

    return { mode: 'relay', relayUrl, relaySecret }
  }

  const token = env.TELEGRAM_BOT_TOKEN?.trim()
  const chatId = env.TELEGRAM_CHAT_ID?.trim()
  const apiBaseUrl = (env.TELEGRAM_API_BASE_URL?.trim() || defaultApiBaseUrl).replace(/\/+$/, '')

  if (!token || !chatId || !URL.canParse(apiBaseUrl)) return null
  if (!['http:', 'https:'].includes(new URL(apiBaseUrl).protocol)) return null

  return { mode: 'direct', token, chatId, apiBaseUrl }
}

function formatPhone(phone: string) {
  const russian = /^\+7(\d{3})(\d{3})(\d{2})(\d{2})$/.exec(phone)
  return russian ? `+7 ${russian[1]} ${russian[2]}-${russian[3]}-${russian[4]}` : phone
}

/** Короткий ID заявки: виден в чате и в логах, по нему находятся дубли. */
export function shortLeadId(lead: Pick<Lead, 'requestId'>) {
  return lead.requestId.slice(0, 6).toUpperCase()
}

/** Простой текст: сообщение уходит без parse_mode, экранирование не нужно. */
export function formatLeadMessage(lead: Lead, siteUrl: string) {
  const lines = [
    `Заявка: ${kindTitles[lead.kind]} · #${shortLeadId(lead)}`,
    `Имя: ${lead.name}`,
    `Телефон: ${formatPhone(lead.phone)}`,
  ]

  if (lead.message) lines.push(`О проекте: ${lead.message}`)
  if (lead.preferredTime) lines.push(`Когда удобно: ${lead.preferredTime}`)
  if (lead.page) lines.push(`Страница: ${siteUrl}${lead.page}`)

  return lines.join('\n')
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function connectionErrorCode(error: unknown) {
  const cause = isRecord(error) ? error.cause : undefined
  return isRecord(cause) && typeof cause.code === 'string' ? cause.code : undefined
}

function isTimeout(error: unknown) {
  return error instanceof DOMException && error.name === 'TimeoutError'
}

type Attempt = { result: DeliveryResult; retryAfter?: number }

async function readResponse(response: Response): Promise<Attempt> {
  let body: unknown

  try {
    body = await response.json()
  } catch (error) {
    // Дедлайн мог истечь, пока читалось тело ответа.
    if (isTimeout(error)) return { result: { ok: false, reason: 'timeout' } }
    return { result: { ok: false, reason: 'bad_response', httpStatus: response.status } }
  }

  if (!isRecord(body)) {
    return { result: { ok: false, reason: 'bad_response', httpStatus: response.status } }
  }
  if (body.ok === true) return { result: { ok: true } }

  const telegramCode = typeof body.error_code === 'number' ? body.error_code : response.status
  const parameters = isRecord(body.parameters) ? body.parameters : {}

  if (telegramCode === 429) {
    return {
      result: { ok: false, reason: 'rate_limited', telegramCode },
      retryAfter: typeof parameters.retry_after === 'number' ? parameters.retry_after : undefined,
    }
  }

  return {
    result: {
      ok: false,
      reason: 'rejected',
      telegramCode,
      ...(typeof parameters.migrate_to_chat_id === 'number'
        ? { migrateToChatId: parameters.migrate_to_chat_id }
        : {}),
    },
  }
}

export async function sendTelegramMessage(
  text: string,
  config: TelegramConfig,
  {
    fetch = globalThis.fetch,
    deadlineMs = 12_000,
    sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  }: SendOptions = {},
): Promise<DeliveryResult> {
  const deadline = Date.now() + deadlineMs
  // Ретранслятор отвечает телом Bot API, поэтому ответ разбирается одинаково.
  const { url, headers, body } =
    config.mode === 'relay'
      ? {
          url: config.relayUrl,
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${config.relaySecret}`,
          },
          body: JSON.stringify({ text }),
        }
      : {
          url: `${config.apiBaseUrl}/bot${config.token}/sendMessage`,
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            chat_id: config.chatId,
            text,
            link_preview_options: { is_disabled: true },
          }),
        }

  async function attempt(): Promise<Attempt> {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body,
        signal: AbortSignal.timeout(Math.max(deadline - Date.now(), 0)),
      })
      return await readResponse(response)
    } catch (error) {
      if (isTimeout(error)) return { result: { ok: false, reason: 'timeout' } }
      // Только код ошибки: сообщение и объект могут содержать URL с токеном.
      const errorCode = connectionErrorCode(error)
      return { result: { ok: false, reason: 'network', ...(errorCode ? { errorCode } : {}) } }
    }
  }

  const first = await attempt()
  const { result } = first

  // Worker имеет свой срок доставки и может продолжить работу после отмены fetch сайта.
  // Новый автоматический запрос с остатком общего дедлайна создавал риск двух доставок
  // при последующем ручном повторе. Для relay — ровно одна попытка на запрос формы.
  if (result.ok || config.mode === 'relay') return result

  if (result.reason === 'rate_limited' && first.retryAfter !== undefined) {
    const waitMs = first.retryAfter * 1000
    // Запас на повторный запрос к Bot API (только direct).
    if (first.retryAfter <= maxRetryAfterSeconds && Date.now() + waitMs + 3000 < deadline) {
      await sleep(waitMs)
      return (await attempt()).result
    }
  }

  if (result.reason === 'network' && retriableConnectionCodes.has(result.errorCode ?? '')) {
    return (await attempt()).result
  }

  return result
}
