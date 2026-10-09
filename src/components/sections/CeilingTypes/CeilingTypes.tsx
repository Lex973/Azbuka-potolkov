import Image from 'next/image'
import Link from 'next/link'

import { Reveal } from '@/components/motion/Reveal/Reveal'
import { Container } from '@/components/ui/Container/Container'
import { ArrowRightIcon } from '@/components/ui/Icons/Icons'
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading'
import { ceilingTypeCards } from '@/content/ceiling-types'

import styles from './CeilingTypes.module.css'

export function CeilingTypes() {
  return (
    <section className={styles.section} id="ceiling-types" aria-labelledby="ceiling-types-title">
      <Container>
        <Reveal>
          <SectionHeading
            number="08"
            showEyebrow
            eyebrow="Потолочные системы"
            title="Виды потолков"
            description="У каждой системы своя роль: подчеркнуть геометрию, растворить примыкание или превратить плоскость в мягкий свет. Подбираем решение под архитектуру."
            className={styles.heading}
            id="ceiling-types-title"
          />
        </Reveal>

        <div className={styles.grid}>
          {ceilingTypeCards.map((ceiling, index) => (
            <Reveal key={ceiling.title} className={styles.reveal} delay={index * 0.07}>
              <article className={styles.card} data-linked={Boolean(ceiling.href)}>
                {ceiling.href ? (
                  <Link
                    className={styles.cardLink}
                    href={ceiling.href}
                    aria-label={`${ceiling.title}: открыть страницу`}
                  />
                ) : null}
                <figure className={styles.imageFrame}>
                  <Image
                    src={ceiling.image}
                    alt={ceiling.imageAlt}
                    fill
                    quality={95}
                    sizes="(max-width: 40rem) 100vw, (max-width: 48rem) 50vw, (max-width: 72rem) 33vw, 24rem"
                  />
                  <span className={styles.number} aria-hidden="true">
                    {ceiling.number}
                  </span>
                </figure>

                <div className={styles.content}>
                  <h3>{ceiling.title}</h3>
                  <p>{ceiling.description}</p>
                  {ceiling.href ? (
                    <span className={styles.more} aria-hidden="true">
                      Смотреть вид <ArrowRightIcon />
                    </span>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
