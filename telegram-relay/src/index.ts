/**
 * Ретранслятор заявок сайта в Telegram (Cloudflare Worker).
 *
 * С сервера сайта api.telegram.org недоступен, Cloudflare доступен. Worker хранит
 * токен бота и ID чата и умеет только одно: отправить текст в этот чат.
 * Ответ Bot API возвращается сайту как есть. Развёртывание — LEAD_FORMS.md, раздел 6.
 */

export type Env = {
  TELEGRAM_BOT_TOKEN?: string
  TELEGRAM_CHAT_ID?: string
  /** Общий секрет с сайтом (TELEGRAM_RELAY_SECRET), не короче 32 символов. */
  RELAY_SECRET?: string
}

const telegramApiUrl = 'https://api.telegram.org'
const maxBodyBytes = 16 * 1024
// Лимит sendMessage в Telegram.
const maxTextLength = 4096
const minSecretLength = 32
// Меньше дедлайна сайта (12 с): сайт должен получить ответ, а не оборвать запрос сам.
const telegramTimeoutMs = 10_000

/** Ошибки в форме ответа Bot API: сайт разбирает их тем же кодом. */
function fail(status: number, description: string, headers: Record<string, string> = {}) {
  console.log(JSON.stringify({ event: 'relay', result: 'refused', status }))
  return Response.json(
    { ok: false, error_code: status, description: `relay: ${description}` },
    { status, headers: { 'cache-control': 'no-store', ...headers } },
  )
}

async function sha256(value: string) {
  return new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)))
}

/** Сравнение без утечки по времени: хеши одной длины, цикл без раннего выхода. */
async function secretMatches(received: string, expected: string) {
  const [a, b] = await Promise.all([sha256(received), sha256(expected)])
  let difference = 0
  for (let index = 0; index < a.length; index += 1) difference |= a[index] ^ b[index]
  return difference === 0
}

function isTimeout(error: unknown) {
  return error instanceof DOMException && error.name === 'TimeoutError'
}

function readText(body: unknown) {
  if (typeof body !== 'object' || body === null || !('text' in body)) return null
  const { text } = body
  if (typeof text !== 'string' || !text.trim() || text.length > maxTextLength) return null
  return text
}

export async function handleRelayRequest(
  request: Request,
  env: Env,
  fetchTelegram: typeof fetch = fetch,
): Promise<Response> {
  if (new URL(request.url).pathname !== '/') return fail(404, 'not found')
  if (request.method !== 'POST') return fail(405, 'method not allowed', { allow: 'POST' })

  const token = env.TELEGRAM_BOT_TOKEN?.trim()
  const chatId = env.TELEGRAM_CHAT_ID?.trim()
  const secret = env.RELAY_SECRET?.trim()
  if (!token || !chatId || !secret || secret.length < minSecretLength) {
    return fail(500, 'not configured')
  }

  const authorization = request.headers.get('authorization') ?? ''
  if (!(await secretMatches(authorization, `Bearer ${secret}`))) {
    return fail(401, 'unauthorized')
  }

  // Тело читается только после проверки секрета.
  const raw = await request.text()
  if (new TextEncoder().encode(raw).byteLength > maxBodyBytes) {
    return fail(413, 'payload too large')
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return fail(400, 'invalid json')
  }

  const text = readText(parsed)
  if (text === null) return fail(400, 'invalid text')

  let telegram: Response
  try {
    telegram = await fetchTelegram(`${telegramApiUrl}/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, link_preview_options: { is_disabled: true } }),
      signal: AbortSignal.timeout(telegramTimeoutMs),
    })
  } catch (error) {
    // Без объекта ошибки: в нём может быть URL с токеном.
    if (isTimeout(error)) return fail(504, 'telegram timeout')
    return fail(502, 'telegram unreachable')
  }

  // Текст заявки и тело ответа не логируются: в них персональные данные.
  console.log(JSON.stringify({ event: 'relay', result: 'forwarded', status: telegram.status }))

  return new Response(telegram.body, {
    status: telegram.status,
    headers: {
      'content-type': telegram.headers.get('content-type') ?? 'application/json',
      'cache-control': 'no-store',
    },
  })
}

const worker = {
  fetch: (request: Request, env: Env) => handleRelayRequest(request, env),
}

export default worker
