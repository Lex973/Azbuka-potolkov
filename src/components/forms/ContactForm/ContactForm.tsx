'use client'

import { useId, useState, type FormEvent } from 'react'

import { Button } from '@/components/ui/Button/Button'
import { TextField } from '@/components/ui/FormField/FormField'

import styles from './ContactForm.module.css'

export function ContactForm() {
  const fieldId = useId()
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget

    if (!form.reportValidity()) return

    new FormData(form)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={styles.success} role="status">
        <p>Форма готова к подключению.</p>
        <span>Канал отправки добавим после согласования почты, Telegram или CRM.</span>
        <Button variant="secondary" size="small" onClick={() => setSubmitted(false)}>
          Заполнить ещё раз
        </Button>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField
        id={`${fieldId}-name`}
        name="name"
        label="Имя"
        placeholder="Как к вам обращаться"
        autoComplete="name"
        minLength={2}
        required
      />
      <TextField
        id={`${fieldId}-phone`}
        name="phone"
        label="Телефон"
        placeholder="+7 999 000-00-00"
        type="tel"
        autoComplete="tel"
        required
      />
      <Button className={styles.submit} type="submit" size="medium" showArrow>
        Перезвоните мне
      </Button>
      <p className={styles.note}>Нажимая кнопку, вы соглашаетесь на обработку указанных данных.</p>
    </form>
  )
}
