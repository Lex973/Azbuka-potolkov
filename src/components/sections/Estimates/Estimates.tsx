import Image from 'next/image'

import { Reveal } from '@/components/motion/Reveal/Reveal'
import { Container } from '@/components/ui/Container/Container'
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading'

import styles from './Estimates.module.css'

const estimates = [
  {
    title: 'По блокам, с изображениями',
    description:
      'Полотна, свет, карнизы и монтаж собраны в отдельные понятные блоки. Сразу видно, за что отвечает каждая часть бюджета.',
    image: '/images/estimates/visual-estimate.png',
    imageAlt: 'Пример визуальной сметы по блокам с изображениями и стоимостью',
  },
  {
    title: 'Подробная смета',
    description:
      'Каждая позиция раскрыта отдельно: наименование, объём, единица измерения, цена и итоговая сумма.',
    image: '/images/estimates/detailed-estimate.png',
    imageAlt: 'Пример подробной сметы с перечнем материалов и работ',
  },
] as const

export function Estimates() {
  return (
    <section className={styles.section} id="estimates" aria-labelledby="estimates-title">
      <Container>
        <div className={styles.intro}>
          <Reveal>
            <SectionHeading
              number="09"
              eyebrow="Сметы"
              title="Подробный расчёт сметы"
              description="Готовим смету в двух форматах: наглядную по основным блокам с изображениями и подробную по каждой позиции. Согласованную стоимость фиксируем при заключении договора."
              tone="inverse"
              className={styles.heading}
              id="estimates-title"
            />
          </Reveal>
        </div>

        <div className={styles.grid}>
          {estimates.map((estimate, index) => (
            <Reveal key={estimate.title} className={styles.reveal} delay={index * 0.12}>
              <article className={styles.card}>
                <div className={styles.imageFrame}>
                  <Image
                    src={estimate.image}
                    alt={estimate.imageAlt}
                    width={1024}
                    height={1536}
                    sizes="(max-width: 48rem) 92vw, 46vw"
                  />
                </div>
                <div className={styles.cardContent}>
                  <h3>{estimate.title}</h3>
                  <p>{estimate.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
