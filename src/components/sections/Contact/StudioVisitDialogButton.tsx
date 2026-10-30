'use client'

import { useId, useState } from 'react'

import { LeadFormAlert, LeadHoneypot } from '@/components/forms/LeadForm/LeadFormParts'
import { useLeadForm } from '@/components/forms/LeadForm/useLeadForm'
import { Button, ButtonLink } from '@/components/ui/Button/Button'
import { TextField } from '@/components/ui/FormField/FormField'
import { Modal } from '@/components/ui/Modal/Modal'
import { siteConfig } from '@/config/site'
import { leadLimits } from '@/lib/leads/lead'

import styles from './StudioVisitDialogButton.module.css'

type StudioVisitDialogButtonProps = {
  className?: string
}

export function StudioVisitDialogButton({ className }: StudioVisitDialogButtonProps) {
  const [open, setOpen] = useState(false)
  const fieldId = useId()
  const { status, errors, submittedName, successRef, handleSubmit, handleInput, reset } =
    useLeadForm('studio', open)
  const submitting = status === 'submitting'

  return (
    <>
      <Button
        className={className}
        size="large"
        tone="inverse"
        showArrow
        onClick={() => {
          reset()
          setOpen(true)
        }}
      >
        Записаться в студию
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        eyebrow="Кирова, 27 · Новосибирск"
        title="Записаться в студию"
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
          {status === 'success' ? (
            <div className={styles.result}>
              <p className={styles.resultTitle} ref={successRef} tabIndex={-1}>
                {submittedName}, заявка отправлена
              </p>
              <p>
                Перезвоним, чтобы согласовать время встречи. Если удобнее, свяжитесь с нами сами:
              </p>
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
                label="Ваше имя"
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
              <TextField
                id={`${fieldId}-time`}
                name="preferredTime"
                label="Когда вам удобно"
                placeholder="Например, в четверг после 15:00"
                maxLength={leadLimits.preferredTime}
                error={errors.preferredTime}
              />
              <LeadHoneypot />
              <LeadFormAlert status={status} formError={errors.form} showContacts={false} />
              <Button
                className={styles.submit}
                type="submit"
                size="large"
                showArrow={!submitting}
                aria-disabled={submitting}
              >
                {submitting ? 'Отправляем…' : 'Оставить заявку'}
              </Button>
              <p className={styles.note}>
                Нажимая кнопку, вы соглашаетесь на обработку указанных данных.
              </p>
            </form>
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
