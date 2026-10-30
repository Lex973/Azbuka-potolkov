import 'server-only'

import { createHash } from 'node:crypto'

import { createDeduper } from './dedupe'
import { parseLead, type Lead, type LeadErrors } from './lead'
import { clientKey, createRateLimiter, isPrivateKey } from './rate-limit'
import {
  formatLeadMessage,
  shortLeadId,
  type DeliveryResult,
  type TelegramConfig,
} from './telegram'

export type LeadHandlerDeps = {
  siteUrl: string
  /** Дополнительные Origin, с которых разрешена отправка (кроме siteUrl). */
  allowedOrigins: string[]
  /** Разрешить http://localhost и http://127.0.0.1 — только для разработки. */
  allowLocalhost: boolean
  readConfig: () => TelegramConfig | null
  send: (text: string, config: TelegramConfig) => Promise<DeliveryResult>
  log: (entry: Record<string, unknown>) => void
  now?: () => number
}

type ResponseStatus =
  | 'ok'
  | 'invalid'
  | 'forbidden'
  | 'too_large'
  | 'unsupported'
  | 'rate_limited'
  | 'delivery_failed'
  | 'unavailable'

const maxBodyBytes = 16 * 1024
const honeypotField = 'leadTrap'

function respond(
  status: number,
  body: { status: ResponseStatus; errors?: LeadErrors },
  headers: Record<string, string> = {},
) {
  return Response.json(body, { status, headers: { 'cache-control': 'no-store', ...headers } })
}

/** Читает тело потоком и обрывает его на лимите: Content-Length может отсутствовать. */
async function readLimitedBody(request: Request) {
  if (!request.body) return new Uint8Array()

  const reader = request.body.getReader()
  const chunks: Uint8Array[] = []
  let size = 0

  for (;;) {
    const { done, value } = await reader.read()
    if (done) break

    size += value.byteLength
    if (size > maxBodyBytes) {
      await reader.cancel()
      return null
    }
    chunks.push(value)
  }

  const body = new Uint8Array(size)
  let offset = 0
  for (const chunk of chunks) {
    body.set(chunk, offset)
    offset += chunk.byteLength
  }
  return body
}

function isLocalOrigin(origin: URL) {
  return origin.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(origin.hostname)
}

/**
 * Ключ дедупликации: тот же requestId с теми же данными — повтор.
 * Если пользователь исправил поле после ошибки, заявка уйдёт ещё раз.
 */
function dedupeKey(lead: Lead) {
  return createHash('sha256').update(JSON.stringify(lead)).digest('hex')
}

export function createLeadHandler({
  siteUrl,
  allowedOrigins,
  allowLocalhost,
  readConfig,
  send,
  log,
  now = Date.now,
}: LeadHandlerDeps) {
  const origins = new Set(
    [siteUrl, ...allowedOrigins]
      .filter((url) => URL.canParse(url))
      .map((url) => new URL(url).origin),
  )
  const perClient = createRateLimiter({ limit: 10, windowMs: 10 * 60_000, now })
  // Лимит Telegram для группы — 20 сообщений в минуту.
  const deliveries = createRateLimiter({ limit: 20, windowMs: 60_000, now })
  const deduper = createDeduper<
    DeliveryResult | { ok: false; reason: 'global_limit'; retryAfterSeconds: number }
  >({ ttlMs: 15 * 60_000, now })
  let privateKeyWarned = false

  function isAllowedOrigin(value: string | null) {
    if (!value || !URL.canParse(value)) return false
    const origin = new URL(value)
    return origins.has(origin.origin) || (allowLocalhost && isLocalOrigin(origin))
  }

  return async function handleLeadRequest(request: Request) {
    if (!isAllowedOrigin(request.headers.get('origin'))) {
      return respond(403, { status: 'forbidden' })
    }

    const contentType = request.headers.get('content-type') ?? ''
    if (!contentType.toLowerCase().startsWith('multipart/form-data')) {
      return respond(415, { status: 'unsupported' })
    }

    const key = clientKey(request.headers)
    if (isPrivateKey(key) && !privateKeyWarned) {
      privateKeyWarned = true
      log({ event: 'lead_client_ip_private', note: 'прокси не передаёт IP клиента' })
    }

    const limit = perClient.hit(key)
    if (!limit.allowed) {
      log({ event: 'lead', result: 'rate_limited', scope: 'client' })
      return respond(
        429,
        { status: 'rate_limited' },
        { 'retry-after': String(limit.retryAfterSeconds) },
      )
    }

    if (Number(request.headers.get('content-length') ?? 0) > maxBodyBytes) {
      return respond(413, { status: 'too_large' })
    }

    const body = await readLimitedBody(request)
    if (!body) return respond(413, { status: 'too_large' })

    let data: FormData
    try {
      data = await new Response(body, { headers: { 'content-type': contentType } }).formData()
    } catch {
      return respond(400, {
        status: 'invalid',
        errors: { form: 'Не удалось обработать форму. Обновите страницу и попробуйте ещё раз.' },
      })
    }

    // Поле-ловушка скрыто от людей: заполнить его может только бот.
    // Отвечаем успехом, чтобы бот не подстраивался.
    const trap = data.get(honeypotField)
    if (trap !== null && trap !== '') {
      log({ event: 'lead', result: 'honeypot' })
      return respond(200, { status: 'ok' })
    }

    const parsed = parseLead(data)
    if (!parsed.ok) return respond(400, { status: 'invalid', errors: parsed.errors })

    const { lead } = parsed
    const id = shortLeadId(lead)

    const config = readConfig()
    if (!config) {
      log({ event: 'lead', id, kind: lead.kind, result: 'not_configured' })
      return respond(503, { status: 'unavailable' })
    }

    const result = await deduper.run(dedupeKey(lead), async () => {
      const delivery = deliveries.hit('all')
      if (!delivery.allowed) {
        return {
          ok: false,
          reason: 'global_limit',
          retryAfterSeconds: delivery.retryAfterSeconds,
        } as const
      }
      return send(formatLeadMessage(lead, siteUrl), config)
    })

    if (result.ok) {
      log({
        event: 'lead',
        id,
        kind: lead.kind,
        result: result.duplicate ? 'duplicate' : 'delivered',
      })
      return respond(200, { status: 'ok' })
    }

    // Причина и коды Telegram — без персональных данных заявки.
    log({ ...result, event: 'lead', id, kind: lead.kind, result: 'failed' })

    if (result.reason === 'global_limit') {
      return respond(
        429,
        { status: 'rate_limited' },
        { 'retry-after': String(result.retryAfterSeconds) },
      )
    }

    return respond(502, { status: 'delivery_failed' })
  }
}
