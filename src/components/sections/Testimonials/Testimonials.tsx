import { TestimonialsCarousel } from '@/components/sections/Testimonials/TestimonialsCarousel'
import { ButtonLink } from '@/components/ui/Button/Button'
import { Container } from '@/components/ui/Container/Container'
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading'
import { siteConfig } from '@/config/site'
import { testimonials } from '@/content/testimonials'

import styles from './Testimonials.module.css'

export function Testimonials() {
  return (
    <section className={styles.section} id="reviews" aria-labelledby="reviews-title">
      <Container>
        <div className={styles.intro}>
          <div>
            <SectionHeading
              number="09"
              eyebrow="Отзывы"
              title={
                <>
                  Доверие складывается
                  <br />
                  из деталей
                </>
              }
              description="В отзывах чаще всего говорят о точности, порядке на объекте и внимании к проекту — от замера до сдачи."
              className={styles.heading}
              id="reviews-title"
            />
          </div>

          <div className={styles.proof}>
            <div className={styles.rating} aria-label="Рейтинг 5 из 5 на 2ГИС">
              <span>5,0</span>
              <div>
                <p aria-hidden="true">★★★★★</p>
                <small>52 отзыва на 2ГИС</small>
              </div>
            </div>
            <ButtonLink
              href={siteConfig.reviewsUrl}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              showArrow
            >
              Все отзывы
            </ButtonLink>
          </div>
        </div>

        <div className={styles.carouselReveal}>
          <TestimonialsCarousel items={testimonials} />
        </div>

        <p className={styles.disclaimer}>
          Опубликованы фрагменты отзывов. Орфография и пунктуация бережно отредактированы.
        </p>
      </Container>
    </section>
  )
}
