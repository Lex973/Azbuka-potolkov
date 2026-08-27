import { ButtonLink } from '@/components/ui/Button/Button'
import { Container } from '@/components/ui/Container/Container'
import { siteConfig } from '@/config/site'

import styles from './ContactSection.module.css'

export function ContactSection() {
  return (
    <section className={styles.section} id="contact-form" aria-labelledby="contact-form-title">
      <Container>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Бесплатно для дизайнеров и архитекторов</p>
          <h2 id="contact-form-title">
            Пришлите текущий проект —<br />
            за 48 часов вернём узлы
            <br />с комментариями
          </h2>
          <p className={styles.description}>
            Ни к чему не обязывает. Даже если работать будете не с нами —
            <br className={styles.desktopBreak} /> это пригодится вам на монтаже.
          </p>
          <div className={styles.actions}>
            <ButtonLink
              href={siteConfig.telegramUrl}
              target="_blank"
              rel="noreferrer"
              size="medium"
              variant="secondary"
              tone="inverse"
            >
              Отправить в Telegram
            </ButtonLink>
            <ButtonLink
              href={siteConfig.maxUrl}
              target="_blank"
              rel="noreferrer"
              size="medium"
              variant="secondary"
              tone="inverse"
            >
              Отправить в MAX
            </ButtonLink>
          </div>
          <p className={styles.note}>Ответим в течение часа в рабочее время</p>
        </div>
      </Container>
    </section>
  )
}
