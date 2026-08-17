'use client'

import { useState, type CSSProperties } from 'react'

import { ArrowLeftIcon, ArrowRightIcon } from '@/components/ui/Icons/Icons'
import type { Testimonial } from '@/content/testimonials'

import styles from './Testimonials.module.css'

type TestimonialsCarouselProps = {
  items: Testimonial[]
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function TestimonialsCarousel({ items }: TestimonialsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const progress = `${((activeIndex + 1) / items.length) * 100}%`

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + items.length) % items.length)
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % items.length)
  }

  return (
    <div
      className={styles.carousel}
      style={{ '--testimonials-progress': progress } as CSSProperties}
    >
      <div className={styles.viewport} id="testimonials-carousel">
        <div
          className={styles.track}
          style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
        >
          {items.map((item, index) => (
            <article
              className={styles.review}
              key={`${item.author}-${index}`}
              aria-hidden={index !== activeIndex}
            >
              <div className={styles.reviewMeta}>
                <span className={styles.avatar} aria-hidden="true">
                  {getInitials(item.author)}
                </span>
                <div>
                  <p className={styles.author}>{item.author}</p>
                  <p className={styles.source}>2ГИС · 5 / 5</p>
                </div>
              </div>
              <blockquote>«{item.text}»</blockquote>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.carouselFooter}>
        <div className={styles.arrows}>
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Предыдущий отзыв"
            aria-controls="testimonials-carousel"
          >
            <ArrowLeftIcon />
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label="Следующий отзыв"
            aria-controls="testimonials-carousel"
          >
            <ArrowRightIcon />
          </button>
        </div>

        <p className={styles.counter} aria-live="polite" aria-atomic="true">
          <span>{String(activeIndex + 1).padStart(2, '0')}</span>
          <span aria-hidden="true" />
          {String(items.length).padStart(2, '0')}
        </p>
      </div>
    </div>
  )
}
