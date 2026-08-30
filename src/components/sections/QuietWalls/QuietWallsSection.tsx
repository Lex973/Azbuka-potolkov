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
            <p className={styles.eyebrow}>Новое направление</p>
            <h2 id="quiet-walls-title">Тихие стены</h2>
            <span className={styles.rule} aria-hidden="true" />
            <div className={styles.text}>
              <p>
                Мы также занимаемся тихими стенами — новой системой отделки, которая помогает
                сделать ремонт быстрее и сразу создать комфортную акустику в помещении.
              </p>
              <p>
                Благодаря готовой технологии целую квартиру можно привести к финишу примерно за
                месяц. Поверхности выглядят аккуратно, их можно мыть и протирать, а в комнате
                становится заметно спокойнее и комфортнее.
              </p>
            </div>
            <a
              className={styles.download}
              href="/files/%D0%A2%D0%B8%D1%85%D0%B8%D0%B5%20%D1%81%D1%82%D0%B5%D0%BD%D1%8B%20%D0%90%D0%B7%D0%B1%D1%83%D0%BA%D0%B0%20%D0%9F%D0%BE%D1%82%D0%BE%D0%BB%D0%BA%D0%BE%D0%B2%20(2).pdf"
              download
            >
              Скачать презентацию о тихих стенах <span aria-hidden="true">↗</span>
            </a>
          </Reveal>

          <Reveal className={styles.media} delay={0.12}>
            <Image
              src="/images/tihie-steni-enhanced.png"
              alt="Зона отдыха с акустическими панелями и мягкими вертикальными линиями света"
              fill
              sizes="(max-width: 64rem) 100vw, 50vw"
            />
            <span className={styles.caption}>Акустическая отделка · тихие стены</span>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
