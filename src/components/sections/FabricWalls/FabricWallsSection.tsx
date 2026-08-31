import Image from 'next/image'

import { Reveal } from '@/components/motion/Reveal/Reveal'
import { Container } from '@/components/ui/Container/Container'

import styles from './FabricWallsSection.module.css'

export function FabricWallsSection() {
  return (
    <section className={styles.section} id="fabric-walls" aria-labelledby="fabric-walls-title">
      <Container>
        <div className={styles.layout}>
          <Reveal className={styles.copy}>
            <p className={styles.eyebrow}>Отделка</p>
            <h2 id="fabric-walls-title">Тканевые стены</h2>
            <div className={styles.text}>
              <p>
                Это бесшовная отделка стен тканью, натянутой на аккуратный профиль. Поверхность
                получается мягкой на вид, тёплой на ощупь и заметно улучшает акустику комнаты.
              </p>
              <p>
                Тканевые стены помогают собрать интерьер в единое целое: скрывают неровности,
                добавляют глубину цвету и делают пространство тише и уютнее.
              </p>
            </div>
          </Reveal>

          <Reveal className={styles.media} delay={0.12}>
            <figure className={styles.detailImage}>
              <Image
                src="/images/fabric-walls.png"
                alt="Тканевая обшивка стены с декоративными профилями"
                fill
                sizes="(max-width: 64rem) 50vw, 14vw"
              />
            </figure>
            <figure className={styles.mainImage}>
              <Image
                src="/images/fabric-walls-main.jpg"
                alt="Тканевая стена с декоративными вставками в интерьере спальни"
                fill
                sizes="(max-width: 64rem) 100vw, 50vw"
              />
              <figcaption>Тканевая стена · фактура и профиль</figcaption>
            </figure>
            <figure className={styles.projectImage}>
              <Image
                src="/images/fabric-walls-project.jpg"
                alt="Тканевая отделка стены в реализованном интерьере"
                fill
                sizes="(max-width: 64rem) 50vw, 25vw"
              />
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
