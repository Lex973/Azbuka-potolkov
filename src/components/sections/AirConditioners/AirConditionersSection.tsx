import Image from 'next/image'

import { Reveal } from '@/components/motion/Reveal/Reveal'
import { Container } from '@/components/ui/Container/Container'

import styles from './AirConditionersSection.module.css'

const coordinationPoints = [
  'шторные ниши',
  'парящие подсветки',
  'световые линии и точки',
  'трековое освещение',
  'вентиляция и вытяжка',
  'другие закладные',
]

export function AirConditionersSection() {
  return (
    <section
      className={styles.section}
      id="air-conditioners"
      aria-labelledby="air-conditioners-title"
    >
      <Image
        className={styles.backgroundImage}
        src="/images/air-conditioners-bg-v6.png"
        alt=""
        fill
        quality={95}
        sizes="(max-width: 40rem) 200vw, 100vw"
      />
      <Container className={styles.container}>
        <div className={styles.layout}>
          <Reveal className={styles.intro}>
            <p className={styles.eyebrow}>Климат</p>
            <h2 id="air-conditioners-title">Делаем кондиционеры правильно!</h2>
            <span className={styles.rule} aria-hidden="true" />
            <p className={styles.lead}>Главное — не блок, а трасса.</p>
          </Reveal>

          <Reveal className={styles.content} delay={0.1}>
            <p>
              До монтажа потолка прокладываем фреоновую магистраль и дренаж по технической карте.
              Так сохраняем высоту, чистые линии и замысел интерьера.
            </p>

            <div className={styles.points}>
              <p className={styles.pointsTitle}>Какие узлы учитываем в маршруте</p>
              <ul>
                {coordinationPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
