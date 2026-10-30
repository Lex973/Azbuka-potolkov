/**
 * Заявка с сайта: правила полей и проверка.
 * Один и тот же код работает в браузере (подсказки до отправки)
 * и на сервере (граница доверия), поэтому здесь нет зависимостей от среды.
 */

export const leadKinds = ['project', 'studio'] as const

export type LeadKind = (typeof leadKinds)[number]

export const leadLimits = {
  nameMin: 2,
  nameMax: 80,
  phoneMax: 20,
  message: 1000,
  preferredTime: 120,
  page: 200,
} as const

export type Lead = {
  kind: LeadKind
  requestId: string
  name: string
  phone: string
  message?: string
  preferredTime?: string
  page?: string
}

export type LeadErrorField = 'form' | 'name' | 'phone' | 'message' | 'preferredTime'
export type LeadErrors = Partial<Record<LeadErrorField, string>>

export type ParseLeadResult = { ok: true; lead: Lead } | { ok: false; errors: LeadErrors }

const formError = 'Не удалось обработать форму. Обновите страницу и попробуйте ещё раз.'

const requestIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const pagePattern = /^\/(?!\/)[a-z0-9/-]*$/
const phoneCharsPattern = /^\+?[\d\s()-]+$/
// Управляющие и невидимые символы форматирования: RTL-override, zero-width и т. п.
const invisiblePattern = /[\p{Cc}\p{Cf}]/gu
const invisibleExceptNewlinePattern = /(?!\n)[\p{Cc}\p{Cf}]/gu

/** Приводит телефон к виду +XXXXXXXXXXX или возвращает null. */
export function normalizePhone(raw: string): string | null {
  const value = raw.trim()

  if (value.length > leadLimits.phoneMax || !phoneCharsPattern.test(value)) return null

  const digits = value.replace(/\D/g, '')

  if (digits.length === 11 && (digits[0] === '8' || digits[0] === '7'))
    return `+7${digits.slice(1)}`
  if (digits.length === 10 && digits[0] === '9') return `+7${digits}`
  if (value.startsWith('+') && digits.length >= 10 && digits.length <= 15) return `+${digits}`

  return null
}

/** Строка из FormData; файлы и отсутствующие значения считаются пустыми. */
function readField(data: FormData, name: string) {
  const value = data.get(name)
  return typeof value === 'string' ? value : ''
}

function cleanLine(value: string) {
  return value
    .normalize('NFC')
    .replace(/\s/g, ' ')
    .replace(invisiblePattern, '')
    .replace(/ {2,}/g, ' ')
    .trim()
}

function cleanText(value: string) {
  return value
    .normalize('NFC')
    .replace(/\r\n?/g, '\n')
    .replace(/[^\S\n]/g, ' ')
    .replace(invisibleExceptNewlinePattern, '')
    .replace(/ {2,}/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function isLeadKind(value: string): value is LeadKind {
  return (leadKinds as readonly string[]).includes(value)
}

export function parseLead(data: FormData): ParseLeadResult {
  const kind = readField(data, 'kind')
  const requestId = readField(data, 'requestId')

  if (!isLeadKind(kind) || !requestIdPattern.test(requestId)) {
    return { ok: false, errors: { form: formError } }
  }

  const errors: LeadErrors = {}

  const name = cleanLine(readField(data, 'name'))
  if (!name) errors.name = 'Укажите, как к вам обращаться'
  else if (name.length < leadLimits.nameMin)
    errors.name = `Имя должно быть не короче ${leadLimits.nameMin} символов`
  else if (name.length > leadLimits.nameMax)
    errors.name = `Имя должно быть не длиннее ${leadLimits.nameMax} символов`

  const rawPhone = readField(data, 'phone').trim()
  const phone = rawPhone ? normalizePhone(rawPhone) : null
  if (!rawPhone) errors.phone = 'Укажите телефон для связи'
  else if (!phone) errors.phone = 'Проверьте номер, например +7 999 000-00-00'

  const lead: Lead = { kind, requestId, name, phone: phone ?? '' }

  if (kind === 'project') {
    const message = cleanText(readField(data, 'message'))
    if (message.length > leadLimits.message)
      errors.message = `Не больше ${leadLimits.message} символов`
    else if (message) lead.message = message
  } else {
    const preferredTime = cleanLine(readField(data, 'preferredTime'))
    if (preferredTime.length > leadLimits.preferredTime)
      errors.preferredTime = `Не больше ${leadLimits.preferredTime} символов`
    else if (preferredTime) lead.preferredTime = preferredTime
  }

  const page = readField(data, 'page')
  if (page.length <= leadLimits.page && pagePattern.test(page)) lead.page = page

  if (Object.keys(errors).length > 0) return { ok: false, errors }

  return { ok: true, lead }
}
