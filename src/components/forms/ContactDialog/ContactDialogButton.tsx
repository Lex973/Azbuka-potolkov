'use client'

import { useId, useState, type FormEvent, type ReactNode } from 'react'

import { Button } from '@/components/ui/Button/Button'
import { TextAreaField, TextField } from '@/components/ui/FormField/FormField'
import { Modal } from '@/components/ui/Modal/Modal'

import styles from './ContactDialogButton.module.css'

type ContactDialogButtonProps = {
  children?: ReactNode
  size?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'secondary'
  tone?: 'default' | 'inverse'
  className?: string
  onOpen?: () => void
}

export function ContactDialogButton({
  children = 'Обсудить задачу',
  size = 'medium',
  variant = 'primary',
  tone = 'default',
  className,
  onOpen,
}: ContactDialogButtonProps) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const fieldId = useId()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget

    if (!form.reportValidity()) return

    new FormData(form)
    setSubmitted(true)
  }

  return (
    <>
      <Button
        className={className}
        size={size}
        variant={variant}
        tone={tone}
        showArrow
        onClick={() => {
          onOpen?.()
          setSubmitted(false)
          setOpen(true)
        }}
      >
        {children}
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        eyebrow="Начнём с проекта"
        title="Расскажите о задаче"
      >
        {submitted ? (
          <div className={styles.success} role="status">
            <p className={styles.successTitle}>Форма готова к подключению.</p>
            <p>Канал отправки будет добавлен после согласования почты, Telegram или CRM.</p>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Закрыть
            </Button>
          </div>
        ) : (
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
            <TextAreaField
              id={`${fieldId}-message`}
              name="message"
              label="О проекте"
              placeholder="Тип объекта, этап ремонта и что уже есть в проекте"
              rows={4}
            />
            <p className={styles.note}>
              Нажимая кнопку, вы соглашаетесь на обработку указанных данных.
            </p>
            <Button className={styles.submit} type="submit" size="large" showArrow>
              Отправить заявку
            </Button>
          </form>
        )}
      </Modal>
    </>
  )
}
