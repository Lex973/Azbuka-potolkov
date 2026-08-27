import { ContactDialogButton } from '@/components/forms/ContactDialog/ContactDialogButton'
import { Container } from '@/components/ui/Container/Container'

import styles from './FinalCtaSection.module.css'

export function FinalCtaSection() {
  return (
    <section className={styles.section} aria-labelledby="final-cta-title">
      <Container>
        <div className={styles.content}>
          <h2 id="final-cta-title">
            <span>Мы не устанавливаем потолки.</span>
            <strong>Мы сдаём их без замечаний.</strong>
          </h2>
          <p className={styles.description}>
            Приезжайте в студию на Кирова, 27 — покажем узлы вживую и примерим свет под ваш проект.
          </p>
          <div className={styles.actions}>
            <ContactDialogButton className={styles.primaryAction} showArrow={false}>
              Записаться в студию
            </ContactDialogButton>
            <ContactDialogButton variant="secondary" tone="inverse" showArrow={false}>
              Прислать проект
            </ContactDialogButton>
          </div>
        </div>
      </Container>
    </section>
  )
}
