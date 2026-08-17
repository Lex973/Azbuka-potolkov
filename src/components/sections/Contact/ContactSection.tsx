import { ContactForm } from '@/components/forms/ContactForm/ContactForm'
import { Container } from '@/components/ui/Container/Container'

import styles from './ContactSection.module.css'

export function ContactSection() {
  return (
    <section className={styles.section} id="contact-form" aria-labelledby="contact-form-title">
      <Container>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>
              <span>10</span> / Обсудить проект
            </p>
            <h2 id="contact-form-title">Начнём с вашего проекта</h2>
            <p>Оставьте контакты — зададим пару вопросов и договоримся о следующем шаге.</p>
          </div>
          <div className={styles.formWrap}>
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  )
}
