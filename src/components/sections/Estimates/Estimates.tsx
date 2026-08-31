import { Reveal } from '@/components/motion/Reveal/Reveal'
import { Container } from '@/components/ui/Container/Container'
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading'

import { EstimateImage } from './EstimateImage'
import styles from './Estimates.module.css'

const estimates = [
  {
    title: 'По блокам, с изображениями',
    description:
      'В смете по разделам видны виды полотен, профильные системы, системы для штор и интеграция света — с изображениями и итогами по каждому блоку.',
    image: '/images/estimates/real-estimate-visual.png',
    imageAlt: 'Реальная наглядная смета по блокам с изображениями и стоимостью',
    width: 1366,
    height: 1634,
  },
  {
    title: 'Подробная смета',
    description:
      'Каждая позиция раскрыта отдельно: наименование, объём, единица измерения, цена и итоговая сумма.',
    image: '/images/estimates/real-estimate-detailed.png',
    imageAlt: 'Реальная подробная смета с перечнем материалов и работ',
    width: 2088,
    height: 1718,
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
            showEyebrow
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
                  <EstimateImage
                    src={estimate.image}
                    alt={estimate.imageAlt}
                    title={estimate.title}
                    width={estimate.width}
                    height={estimate.height}
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
