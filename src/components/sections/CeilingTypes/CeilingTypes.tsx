import Image from 'next/image'
import Link from 'next/link'

import { Reveal } from '@/components/motion/Reveal/Reveal'
import { Container } from '@/components/ui/Container/Container'
import { ArrowRightIcon } from '@/components/ui/Icons/Icons'
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading'

import styles from './CeilingTypes.module.css'

const ceilingTypes = [
  {
    number: '01',
    title: 'Теневой потолок',
    description:
      'Чёткий тёмный контур отделяет потолок от стен и подчёркивает геометрию помещения.',
    image: '/images/projects/private-skyline.webp',
    imageAlt: 'Светлый интерьер с теневым примыканием потолка',
    href: '/ceiling-types/shadow',
  },
  {
    number: '02',
    title: 'Бесщелевой потолок',
    description:
      'Полотно подходит к стене без декоративной вставки — линия примыкания остаётся почти незаметной.',
    image: '/images/projects/commercial-studio.webp',
    imageAlt: 'Интерьер с ровным бесщелевым примыканием потолка',
    href: null,
  },
  {
    number: '03',
    title: 'Парящий потолок',
    description:
      'Скрытая подсветка по периметру визуально отделяет плоскость и добавляет мягкий вечерний свет.',
    image: '/images/projects/commercial-restaurant.webp',
    imageAlt: 'Тёмный интерьер с парящим потолком и подсветкой по периметру',
    href: null,
  },
  {
    number: '04',
    title: 'Световой потолок',
    description:
      'Весь потолок или его часть работает как большой ровный источник света без видимых приборов.',
    image: '/images/projects/private-quiet-line.webp',
    imageAlt: 'Интерьер с мягким равномерным светом в плоскости потолка',
    href: null,
  },
  {
    number: '05',
    title: 'Стандартный потолок',
    description:
      'Аккуратное базовое решение с тонкой вставкой по периметру — практично и спокойно.',
    image: '/images/lighting-calculation/interior-lighting.png',
    imageAlt: 'Современный интерьер с ровным натяжным потолком',
    href: null,
  },
] as const

export function CeilingTypes() {
  return (
    <section className={styles.section} id="ceiling-types" aria-labelledby="ceiling-types-title">
      <Container>
        <Reveal>
          <SectionHeading
            number="07"
            eyebrow="Потолочные системы"
            title="Виды потолков"
            description="У каждой системы своя роль: подчеркнуть геометрию, растворить примыкание или превратить плоскость в мягкий свет. Подбираем решение под архитектуру."
            className={styles.heading}
            id="ceiling-types-title"
          />
        </Reveal>

        <div className={styles.grid}>
          {ceilingTypes.map((ceiling, index) => (
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
                    sizes="(max-width: 48rem) 100vw, (max-width: 72rem) 50vw, 40vw"
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
