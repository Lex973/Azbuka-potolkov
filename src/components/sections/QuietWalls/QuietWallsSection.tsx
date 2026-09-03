import Image from 'next/image'

import { Reveal } from '@/components/motion/Reveal/Reveal'
import { Container } from '@/components/ui/Container/Container'

import styles from './QuietWallsSection.module.css'

export function QuietWallsSection() {
  return (
    <section className={styles.section} id="quiet-walls" aria-labelledby="quiet-walls-title">
      <Container>
        <div className={styles.layout}>
          <Reveal className={styles.copy}>
            <p className={styles.eyebrow}>Архитектурный текстиль</p>
            <h2 id="quiet-walls-title">Тихие стены</h2>
            <span className={styles.rule} aria-hidden="true" />
            <div className={styles.text}>
              <p>
                Это бесшовная отделка стен тканью, натянутой на аккуратный профиль. Поверхность
                получается мягкой на вид, тёплой на ощупь и заметно улучшает акустику комнаты.
              </p>
              <p>
                Добавляет глубину цвету и делают пространство тише и уютнее. Визуально не отличается
                от декоративной штукатурки
              </p>
              <p>
                Благодаря готовой технологии целую квартиру можно привести к финишу в 5 раз быстрее.
              </p>
              <p>
                Ткань можно мыть и протирать, имеет антистатический эффект и не собирает в себя
                пыль.
              </p>
            </div>
            <a
              className={styles.download}
              href="/files/%D0%A2%D0%B8%D1%85%D0%B8%D0%B5%20%D1%81%D1%82%D0%B5%D0%BD%D1%8B%20%D0%90%D0%B7%D0%B1%D1%83%D0%BA%D0%B0%20%D0%9F%D0%BE%D1%82%D0%BE%D0%BB%D0%BA%D0%BE%D0%B2%20(2).pdf"
              download
            >
              Скачать презентацию <span aria-hidden="true">↗</span>
            </a>
          </Reveal>

          <Reveal className={styles.media} delay={0.12}>
            <Image
              src="/images/tihie-steni-enhanced.png"
              alt="Зона отдыха с акустическими панелями и мягкими вертикальными линиями света"
              fill
              sizes="(max-width: 64rem) 100vw, 50vw"
            />
            <span className={styles.caption}>
              Декоративная ткань · тихие стены · акустическая отделка
            </span>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
