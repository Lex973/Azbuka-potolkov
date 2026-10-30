'use client'

import { useId, useState, type ReactNode } from 'react'

import { LeadFormAlert, LeadHoneypot } from '@/components/forms/LeadForm/LeadFormParts'
import { useLeadForm } from '@/components/forms/LeadForm/useLeadForm'
import { Button } from '@/components/ui/Button/Button'
import { TextAreaField, TextField } from '@/components/ui/FormField/FormField'
import { Modal } from '@/components/ui/Modal/Modal'
import { siteConfig } from '@/config/site'
import { leadLimits } from '@/lib/leads/lead'

import styles from './ContactDialogButton.module.css'

type ContactDialogButtonProps = {
  children?: ReactNode
  size?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'secondary'
  tone?: 'default' | 'inverse'
  showArrow?: boolean
  className?: string
  onOpen?: () => void
}

export function ContactDialogButton({
  children = 'Обсудить проект',
  size = 'medium',
  variant = 'primary',
  tone = 'default',
  showArrow = true,
  className,
  onOpen,
}: ContactDialogButtonProps) {
  const [open, setOpen] = useState(false)
  const fieldId = useId()
  const { status, errors, successRef, handleSubmit, handleInput, reset } = useLeadForm(
    'project',
    open,
  )
  const submitting = status === 'submitting'

  return (
    <>
      <Button
        className={className}
        size={size}
        variant={variant}
        tone={tone}
        showArrow={showArrow}
        onClick={() => {
          onOpen?.()
          reset()
          setOpen(true)
        }}
      >
        {children}
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        eyebrow="Начнём с проекта"
        title="Расскажите о задаче"
      >
        {status === 'success' ? (
          <div className={styles.success}>
            <p className={styles.successTitle} ref={successRef} tabIndex={-1}>
              Заявка отправлена
            </p>
            <p>Свяжемся с вами в рабочее время: {siteConfig.hours}.</p>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Закрыть
            </Button>
          </div>
        ) : (
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            onInput={handleInput}
            noValidate
            aria-busy={submitting}
          >
            <TextField
              id={`${fieldId}-name`}
              name="name"
              label="Имя"
              placeholder="Как к вам обращаться"
              autoComplete="name"
              minLength={leadLimits.nameMin}
              maxLength={leadLimits.nameMax}
              required
              error={errors.name}
            />
            <TextField
              id={`${fieldId}-phone`}
              name="phone"
              label="Телефон"
              placeholder="+7 999 000-00-00"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={leadLimits.phoneMax}
              required
              error={errors.phone}
            />
            <TextAreaField
              id={`${fieldId}-message`}
              name="message"
              label="О проекте"
              placeholder="Тип объекта, этап ремонта и что уже есть в проекте"
              rows={4}
              maxLength={leadLimits.message}
              error={errors.message}
            />
            <LeadHoneypot />
            <p className={styles.note}>
              Нажимая кнопку, вы соглашаетесь на обработку указанных данных.
            </p>
            <LeadFormAlert status={status} formError={errors.form} />
            <Button
              className={styles.submit}
              type="submit"
              size="large"
              showArrow={!submitting}
              aria-disabled={submitting}
            >
              {submitting ? 'Отправляем…' : 'Отправить заявку'}
            </Button>
          </form>
        )}
      </Modal>
    </>
  )
}
