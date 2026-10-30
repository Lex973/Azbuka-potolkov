import type { LeadErrorField, LeadErrors } from '@/lib/leads/lead'

export type SubmitResult =
  | { status: 'ok' }
  | { status: 'invalid'; errors: LeadErrors }
  | { status: 'rate_limited' }
  | { status: 'error' }

type SubmitOptions = {
  fetch?: typeof globalThis.fetch
  /** Больше серверного срока доставки (12 с), чтобы не сдаться раньше сервера. */
  timeoutMs?: number
}

const errorFields: readonly LeadErrorField[] = ['form', 'name', 'phone', 'message', 'preferredTime']

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readErrors(value: unknown): LeadErrors {
  if (!isRecord(value)) return {}

  const errors: LeadErrors = {}
  for (const field of errorFields) {
    const message = value[field]
    if (typeof message === 'string') errors[field] = message
  }
  return errors
}

/** Отправляет заявку на /api/leads. Любой непредвиденный ответ — ошибка, которую можно повторить. */
export async function submitLead(
  data: FormData,
  { fetch = globalThis.fetch, timeoutMs = 20_000 }: SubmitOptions = {},
): Promise<SubmitResult> {
  let body: unknown

  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      body: data,
      signal: AbortSignal.timeout(timeoutMs),
    })
    body = await response.json()
  } catch {
    // Сеть, таймаут или не-JSON (например, 502 от прокси во время деплоя).
    return { status: 'error' }
  }

  if (!isRecord(body)) return { status: 'error' }

  switch (body.status) {
    case 'ok':
      return { status: 'ok' }
    case 'rate_limited':
      return { status: 'rate_limited' }
    case 'invalid': {
      const errors = readErrors(body.errors)
      return Object.keys(errors).length > 0 ? { status: 'invalid', errors } : { status: 'error' }
    }
    default:
      return { status: 'error' }
  }
}
