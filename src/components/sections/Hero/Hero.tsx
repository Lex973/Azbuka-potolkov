import Image from 'next/image'

import { ContactDialogButton } from '@/components/forms/ContactDialog/ContactDialogButton'

import styles from './Hero.module.css'

const heroFacts = [
  { value: '100+', label: 'проектов\nв год' },
  { value: '12', label: 'лет\nработы' },
]

export function Hero() {
  return (
    <section className={styles.hero} id="home" aria-labelledby="hero-title">
      <div className={styles.imageFrame}>
        <Image
          className={styles.image}
          src="/images/hero/interior-main-enhanced-v4.png"
          alt="Современная гостиная с потолочными световыми линиями"
          fill
          priority
          sizes="(max-width: 40rem) 300vw, (max-width: 64rem) 200vw, 100vw"
          quality={95}
        />
      </div>

      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className={styles.headline}>
          <h1 className={styles.title} id="hero-title">
            Потолки и свет в интерьерах
          </h1>
          <p className={styles.subtitle}>От чертежей до реализации без ошибок</p>
        </div>

        <div className={styles.bottom}>
          <div className={styles.actionArea}>
            <p>
              <span>Включаемся на этапе чертежей и ведём проект до сдачи.</span>
              <span>Без переделок, без переплат и в точные сроки.</span>
            </p>
            <ContactDialogButton className={styles.cta} size="small" tone="inverse">
              Обсудить проект
            </ContactDialogButton>
          </div>

          <dl className={styles.facts}>
            {heroFacts.map((fact) => (
              <div key={fact.value}>
                <dt>{fact.value}</dt>
                <dd>{fact.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
