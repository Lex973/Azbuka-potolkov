'use client'

import { useId, useState, type FormEvent } from 'react'

import { Button, ButtonLink } from '@/components/ui/Button/Button'
import { TextField } from '@/components/ui/FormField/FormField'
import { Modal } from '@/components/ui/Modal/Modal'
import { siteConfig } from '@/config/site'

import styles from './StudioVisitDialogButton.module.css'

type StudioVisitDialogButtonProps = {
  className?: string
}

export function StudioVisitDialogButton({ className }: StudioVisitDialogButtonProps) {
  const [open, setOpen] = useState(false)
  const [submittedName, setSubmittedName] = useState<string | null>(null)
  const fieldId = useId()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget

    if (!form.reportValidity()) return

    const formData = new FormData(form)
    setSubmittedName(String(formData.get('name') ?? '').trim())
  }

  return (
    <>
      <Button
        className={className}
        size="large"
        tone="inverse"
        showArrow
        onClick={() => {
          setSubmittedName(null)
          setOpen(true)
        }}
      >
        Записаться в студию
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        eyebrow="Кирова, 27 · Новосибирск"
        title="Записаться в студию"
      >
        <div className={styles.content}>
          <p className={styles.intro}>
            Покажем потолочные узлы вживую и подберём решения под ваш проект. Встречу согласуем
            заранее, чтобы уделить вам время.
          </p>
          <div className={styles.visitDetails}>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Студия</span>
              <span className={styles.detailValue}>ул. Кирова, 27</span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Время работы</span>
              <span className={styles.detailValue}>{siteConfig.hours}</span>
            </div>
          </div>
          {submittedName === null ? (
            <form className={styles.form} onSubmit={handleSubmit}>
              <TextField
                id={`${fieldId}-name`}
                name="name"
                label="Ваше имя"
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
                minLength={10}
                required
              />
              <TextField
                id={`${fieldId}-time`}
                name="preferredTime"
                label="Когда вам удобно"
                placeholder="Например, в четверг после 15:00"
              />
              <Button className={styles.submit} type="submit" size="large" showArrow>
                Оставить заявку
              </Button>
              <p className={styles.note}>
                Запись через сайт пока не подключена. Сейчас можно договориться по телефону или в
                Telegram.
              </p>
            </form>
          ) : (
            <div className={styles.result} role="status">
              <p className={styles.resultTitle}>{submittedName}, форма заполнена.</p>
              <p>Чтобы записаться на встречу сейчас, свяжитесь с нами удобным способом:</p>
            </div>
          )}
          <div className={styles.actions}>
            <ButtonLink
              className={styles.action}
              href={siteConfig.phone.href}
              size="medium"
              variant="secondary"
              showArrow
            >
              Позвонить
            </ButtonLink>
            <ButtonLink
              className={styles.action}
              href={siteConfig.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="medium"
              variant="secondary"
              showArrow
            >
              Telegram
            </ButtonLink>
          </div>
        </div>
      </Modal>
    </>
  )
}
