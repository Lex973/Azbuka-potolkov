import Image from 'next/image'

import { Container } from '@/components/ui/Container/Container'

import styles from './FounderSection.module.css'

export function FounderSection() {
  return (
    <section className={styles.section} id="founder" aria-labelledby="founder-title">
      <Container>
        <div className={styles.layout}>
          <figure className={styles.photo}>
            <Image
              src="/images/roman.png"
              alt="Роман Аникин на объекте с проектом потолка"
              fill
              sizes="(max-width: 64rem) 100vw, 50vw"
            />
          </figure>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Основатель</p>
            <h2 id="founder-title">Роман Аникин</h2>
            <div className={styles.text}>
              <p>
                В 2014 я установил первый потолок и думал, что моя работа — натягивать полотна
                ровно. Один объект всё изменил: дорогой ремонт, красивый проект — и испорченный
                результат при идеально натянутом полотне.
              </p>
              <p>
                Я понял: рынок продаёт метры, а отвечать надо за системную работу с подрядчиками,
                верно спроектированные узлы и профили, порядок на объекте и чистоту монтажа с
                ювелирной обработкой всех соединений, углов и деталей встроенных в потолок!
              </p>
            </div>
            <span className={styles.rule} aria-hidden="true" />
          </div>
        </div>
      </Container>
    </section>
  )
}
