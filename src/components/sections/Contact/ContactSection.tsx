import Image from 'next/image'

import { ButtonLink } from '@/components/ui/Button/Button'
import { Container } from '@/components/ui/Container/Container'
import { siteConfig } from '@/config/site'
import { blurProps } from '@/lib/image-placeholder'

import styles from './ContactSection.module.css'
import { StudioVisitDialogButton } from './StudioVisitDialogButton'

const backgroundImage = '/images/final-cta-studio.png'

export async function ContactSection() {
  return (
    <section className={styles.section} id="contact-form" aria-labelledby="contact-form-title">
      <Image
        className={styles.backgroundImage}
        src={backgroundImage}
        {...await blurProps(backgroundImage)}
        alt=""
        fill
        sizes="100vw"
        quality={95}
      />
      <Container className={styles.foreground}>
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
          <p className={styles.studioInvitation}>
            Приезжайте в студию на Кирова, 27 — покажем узлы вживую и подберем решения под ваш
            проект.
          </p>
          <StudioVisitDialogButton className={styles.studioButton} />
        </div>
      </Container>
    </section>
  )
}
