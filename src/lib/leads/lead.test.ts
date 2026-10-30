import { describe, expect, it } from 'vitest'

import { normalizePhone, parseLead } from './lead'

const requestId = '3f9a1c2b-0d4e-4f5a-9b6c-7d8e9f0a1b2c'

function form(fields: Record<string, string | Blob>) {
  const data = new FormData()
  for (const [key, value] of Object.entries(fields)) data.append(key, value)
  return data
}

function projectForm(overrides: Record<string, string | Blob> = {}) {
  return form({
    kind: 'project',
    requestId,
    name: 'Анна',
    phone: '+7 999 000-00-00',
    ...overrides,
  })
}

describe('normalizePhone', () => {
  it.each([
    ['+7 999 000-00-00', '+79990000000'],
    ['8 (999) 000-00-00', '+79990000000'],
    ['79990000000', '+79990000000'],
    ['9990000000', '+79990000000'],
    ['+44 20 7946 0958', '+442079460958'],
  ])('%s → %s', (raw, expected) => {
    expect(normalizePhone(raw)).toBe(expected)
  })

  it.each([
    'abc',
    '',
    '12345',
    '+7 999 000-00-0a',
    '7+9990000000',
    '1234567890',
    '+1234567890123456',
    '+7 (999) 000-00-00 доб. 1',
    '+7 999 000 00 00 00 00 00 0',
  ])('отклоняет %j', (raw) => {
    expect(normalizePhone(raw)).toBeNull()
  })
})

describe('parseLead', () => {
  it('принимает корректную заявку на проект', () => {
    const result = parseLead(
      projectForm({ message: 'Квартира 120 м²', page: '/projects/skyline-apartment' }),
    )

    expect(result).toEqual({
      ok: true,
      lead: {
        kind: 'project',
        requestId,
        name: 'Анна',
        phone: '+79990000000',
        message: 'Квартира 120 м²',
        page: '/projects/skyline-apartment',
      },
    })
  })

  it('принимает заявку в студию и берёт только её поля', () => {
    const result = parseLead(
      form({
        kind: 'studio',
        requestId,
        name: 'Анна',
        phone: '89990000000',
        preferredTime: 'в четверг после 15:00',
        message: 'не относится к студии',
      }),
    )

    expect(result).toEqual({
      ok: true,
      lead: {
        kind: 'studio',
        requestId,
        name: 'Анна',
        phone: '+79990000000',
        preferredTime: 'в четверг после 15:00',
      },
    })
  })

  it('не добавляет пустые необязательные поля', () => {
    const result = parseLead(projectForm({ message: '   ', page: '' }))

    expect(result.ok && result.lead).toEqual({
      kind: 'project',
      requestId,
      name: 'Анна',
      phone: '+79990000000',
    })
  })

  it('сообщает об отсутствующих обязательных полях', () => {
    const result = parseLead(projectForm({ name: ' ', phone: '' }))

    expect(result).toEqual({
      ok: false,
      errors: {
        name: 'Укажите, как к вам обращаться',
        phone: 'Укажите телефон для связи',
      },
    })
  })

  it('сообщает о коротком имени и неверном телефоне', () => {
    const result = parseLead(projectForm({ name: 'А', phone: 'abc' }))

    expect(result).toEqual({
      ok: false,
      errors: {
        name: 'Имя должно быть не короче 2 символов',
        phone: 'Проверьте номер, например +7 999 000-00-00',
      },
    })
  })

  it('проверяет максимальную длину полей', () => {
    const tooLong = parseLead(projectForm({ name: 'А'.repeat(81), message: 'а'.repeat(1001) }))
    const studio = parseLead(
      form({
        kind: 'studio',
        requestId,
        name: 'Анна',
        phone: '9990000000',
        preferredTime: 'а'.repeat(121),
      }),
    )

    expect(tooLong).toEqual({
      ok: false,
      errors: {
        name: 'Имя должно быть не длиннее 80 символов',
        message: 'Не больше 1000 символов',
      },
    })
    expect(studio).toEqual({ ok: false, errors: { preferredTime: 'Не больше 120 символов' } })
  })

  it('принимает поля ровно на границе длины', () => {
    const result = parseLead(projectForm({ name: 'А'.repeat(80), message: 'а'.repeat(1000) }))

    expect(result.ok).toBe(true)
  })

  it('отклоняет неизвестный вид заявки и отсутствующий requestId', () => {
    const formError = 'Не удалось обработать форму. Обновите страницу и попробуйте ещё раз.'

    expect(parseLead(projectForm({ kind: 'admin' }))).toEqual({
      ok: false,
      errors: { form: formError },
    })
    expect(parseLead(projectForm({ requestId: 'not-a-uuid' }))).toEqual({
      ok: false,
      errors: { form: formError },
    })
  })

  it('удаляет управляющие и невидимые символы и схлопывает пробелы в строках', () => {
    const result = parseLead(
      projectForm({
        name: '  Ан\u0000на‮ ​  Ивановна\t ',
        message: 'Первая\u0007 строка\r\n\r\n\r\n\r\nВторая⁦ строка',
      }),
    )

    expect(result.ok && result.lead.name).toBe('Анна Ивановна')
    expect(result.ok && result.lead.message).toBe('Первая строка\n\nВторая строка')
  })

  it('приводит текст к NFC', () => {
    const decomposed = 'Алёна'.normalize('NFD')
    const result = parseLead(projectForm({ name: decomposed }))

    expect(result.ok && result.lead.name).toBe('Алёна'.normalize('NFC'))
  })

  it('оставляет разметку как есть — экранирование не нужно, текст уходит без parse_mode', () => {
    const result = parseLead(
      projectForm({ message: '<b>жирный</b> *звёзды* [ссылка](https://evil.example)' }),
    )

    expect(result.ok && result.lead.message).toBe(
      '<b>жирный</b> *звёзды* [ссылка](https://evil.example)',
    )
  })

  it('считает файл вместо строки пустым значением', () => {
    const result = parseLead(projectForm({ name: new Blob(['Анна']) }))

    expect(result).toEqual({ ok: false, errors: { name: 'Укажите, как к вам обращаться' } })
  })

  it('берёт первое значение повторяющегося поля', () => {
    const data = projectForm()
    data.append('name', 'Второе имя')

    const result = parseLead(data)

    expect(result.ok && result.lead.name).toBe('Анна')
  })

  it.each(['//evil.example', 'https://evil.example', '/Projects', '/a b', '/' + 'a'.repeat(200)])(
    'отбрасывает подозрительную страницу %j без ошибки',
    (page) => {
      const result = parseLead(projectForm({ page }))

      expect(result.ok).toBe(true)
      expect(result.ok && 'page' in result.lead).toBe(false)
    },
  )

  it('принимает корневую страницу', () => {
    const result = parseLead(projectForm({ page: '/' }))

    expect(result.ok && result.lead.page).toBe('/')
  })
})
