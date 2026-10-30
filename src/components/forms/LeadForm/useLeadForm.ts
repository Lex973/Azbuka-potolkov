'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'

import { parseLead, type LeadErrorField, type LeadErrors, type LeadKind } from '@/lib/leads/lead'

import { submitLead } from './submit-lead'

export type LeadFormStatus = 'idle' | 'submitting' | 'success' | 'error' | 'rate_limited'

// Порядок полей в формах: фокус уходит на первое поле с ошибкой.
const fieldOrder: readonly LeadErrorField[] = ['name', 'phone', 'message', 'preferredTime']

/**
 * Общая логика форм заявок: проверка теми же правилами, что на сервере,
 * отправка, состояния и фокус. Разметку каждая форма держит у себя.
 */
export function useLeadForm(kind: LeadKind, open: boolean) {
  const [status, setStatus] = useState<LeadFormStatus>('idle')
  const [errors, setErrors] = useState<LeadErrors>({})
  const [submittedName, setSubmittedName] = useState('')
  // Синхронный флаг: два submit в одном тике оба увидели бы status === 'idle'.
  const busyRef = useRef(false)
  // Один ключ на заполнение: повтор после ошибки сервер распознает как ту же заявку.
  const requestIdRef = useRef<string | null>(null)
  const successRef = useRef<HTMLParagraphElement>(null)
  // Окно могли закрыть во время отправки: успех сбрасывается, только когда его увидели.
  const successSeenRef = useRef(false)

  // Кнопка отправки исчезает вместе с формой — фокус переводим на результат.
  useEffect(() => {
    if (status !== 'success' || !open) return
    successSeenRef.current = true
    successRef.current?.focus()
  }, [status, open])

  function showErrors(form: HTMLFormElement, nextErrors: LeadErrors) {
    setErrors(nextErrors)

    const firstField = fieldOrder.find((field) => nextErrors[field])
    const control = firstField ? form.elements.namedItem(firstField) : null
    if (control instanceof HTMLElement) control.focus()
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busyRef.current) return

    const form = event.currentTarget
    const data = new FormData(form)
    requestIdRef.current ??= crypto.randomUUID()
    data.set('kind', kind)
    data.set('requestId', requestIdRef.current)
    data.set('page', window.location.pathname)

    const parsed = parseLead(data)
    if (!parsed.ok) {
      showErrors(form, parsed.errors)
      return
    }

    busyRef.current = true
    setErrors({})
    setStatus('submitting')

    const result = await submitLead(data)
    busyRef.current = false

    if (result.status === 'ok') {
      requestIdRef.current = null
      setSubmittedName(parsed.lead.name)
      setStatus('success')
    } else if (result.status === 'invalid') {
      setStatus('idle')
      showErrors(form, result.errors)
    } else {
      setStatus(result.status)
    }
  }

  /** Ошибка поля исчезает, как только его начинают исправлять. */
  function handleInput(event: FormEvent<HTMLFormElement>) {
    const { name } = event.target as HTMLInputElement
    if (!(name in errors)) return

    setErrors((current) => {
      const next = { ...current }
      delete next[name as LeadErrorField]
      return next
    })
  }

  /** Новое открытие окна после увиденного успеха начинается с чистой формы. */
  function reset() {
    if (!successSeenRef.current) return
    successSeenRef.current = false
    setStatus('idle')
    setErrors({})
  }

  return { status, errors, submittedName, successRef, handleSubmit, handleInput, reset }
}
