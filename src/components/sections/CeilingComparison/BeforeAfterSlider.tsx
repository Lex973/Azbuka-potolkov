'use client'

import Image from 'next/image'
import { useState, type CSSProperties, type ChangeEvent } from 'react'

import styles from './CeilingComparison.module.css'

type ComparisonStyle = CSSProperties & {
  '--comparison-position': string
}

export function BeforeAfterSlider() {
  const [position, setPosition] = useState(50)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setPosition(Number(event.currentTarget.value))
  }

  const comparisonStyle: ComparisonStyle = {
    '--comparison-position': `${position}%`,
  }

  return (
    <figure className={styles.comparison} style={comparisonStyle}>
      <div className={styles.afterImage}>
        <Image
          src="/images/ceiling-comparison/living-room-after-finished-v3.png"
          alt="Завершённая гостиная с готовым потолком"
          fill
          sizes="(max-width: 90rem) 94vw, 82rem"
        />
      </div>

      <div className={styles.beforeImage}>
        <Image
          src="/images/ceiling-comparison/living-room-before-raw-v4.png"
          alt="Та же гостиная без чистовой отделки потолка"
          fill
          sizes="(max-width: 90rem) 94vw, 82rem"
        />
      </div>

      <span className={[styles.label, styles.beforeLabel].join(' ')}>Без потолка</span>
      <span className={[styles.label, styles.afterLabel].join(' ')}>С потолком</span>

      <input
        className={styles.range}
        type="range"
        min="0"
        max="100"
        step="1"
        value={position}
        onChange={handleChange}
        aria-label="Сравнить интерьер без потолка и с готовым потолком"
        aria-valuetext={`Без потолка ${position}%, с потолком ${100 - position}%`}
      />

      <span className={styles.divider} aria-hidden="true">
        <span className={styles.handle}>
          <span className={styles.arrowLeft} />
          <span className={styles.arrowRight} />
        </span>
      </span>

      <figcaption className={styles.caption}>Перемещайте бегунок, чтобы сравнить</figcaption>
    </figure>
  )
}
