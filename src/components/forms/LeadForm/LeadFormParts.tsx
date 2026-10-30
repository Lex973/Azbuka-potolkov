import { ButtonLink } from '@/components/ui/Button/Button'
import { siteConfig } from '@/config/site'

import styles from './LeadFormParts.module.css'
import type { LeadFormStatus } from './useLeadForm'

/**
 * Поле-ловушка для ботов. Скрыто от людей и скринридеров, исключено из обхода
 * с клавиатуры; имя не похоже на стандартные поля, чтобы браузер его не автозаполнял.
 */
export function LeadHoneypot() {
  return (
    <div className={styles.honeypot} aria-hidden="true">
      <label>
        Оставьте поле пустым
        <input name="leadTrap" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  )
}

const alertMessages = {
  error: 'Не получилось отправить заявку. Попробуйте ещё раз или свяжитесь с нами напрямую.',
  rate_limited: 'Слишком много заявок подряд. Попробуйте позже или свяжитесь с нами напрямую.',
} as const

type LeadFormAlertProps = {
  status: LeadFormStatus
  /** Ошибка формы целиком (а не отдельного поля) от проверки. */
  formError?: string
  /** Кнопки «Позвонить» и «Telegram» — если их нет рядом с формой. */
  showContacts?: boolean
}

export function LeadFormAlert({ status, formError, showContacts = true }: LeadFormAlertProps) {
  const message =
    status === 'error' || status === 'rate_limited' ? alertMessages[status] : formError

  return (
    <div className={styles.alert} role="alert">
      {message ? (
        <>
          <p className={styles.alertText}>{message}</p>
          {showContacts ? (
            <div className={styles.contacts}>
              <ButtonLink href={siteConfig.phone.href} size="small" variant="secondary">
                Позвонить
              </ButtonLink>
              <ButtonLink
                href={siteConfig.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                variant="secondary"
              >
                Telegram
              </ButtonLink>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  )
}
