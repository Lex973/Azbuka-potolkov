import { Container } from '@/components/ui/Container/Container'

import styles from './FounderSection.module.css'

export function FounderSection() {
  return (
    <section className={styles.section} id="founder" aria-labelledby="founder-title">
      <Container>
        <div className={styles.layout}>
          <figure className={styles.photo}>
            <figcaption>( фото Романа на объекте )</figcaption>
          </figure>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Основатель</p>
            <h2 id="founder-title">Роман Аникин</h2>
            <div className={styles.text}>
              <p>
                «В 2014 я натянул первый потолок и думал, что моя работа — натягивать ровно. Один
                объект всё изменил: дорогой ремонт, красивый проект — и испорченный результат при
                идеально натянутом полотне.
              </p>
              <p>
                Я понял: рынок продаёт метры, а отвечать надо за стыки. За то, что ничьё. Сегодня я
                лично читаю чертежи каждого проекта до выхода бригады.
              </p>
            </div>
            <span className={styles.rule} aria-hidden="true" />
            <p className={styles.signature}>Ведёт каждый проект лично · 8-905-930-30-00</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
