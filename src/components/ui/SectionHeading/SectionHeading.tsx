import type { ElementType } from 'react'

import styles from './SectionHeading.module.css'

type SectionHeadingProps = {
  number: string
  eyebrow: string
  title: string
  description?: string
  tone?: 'default' | 'inverse'
  as?: ElementType
  className?: string
  id?: string
}

export function SectionHeading({
  number,
  eyebrow,
  title,
  description,
  tone = 'default',
  as: Heading = 'h2',
  className,
  id,
}: SectionHeadingProps) {
  const classes = [styles.heading, styles[tone], className ?? ''].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <p className={styles.eyebrow}>
        <span>{number}</span> / {eyebrow}
      </p>
      <Heading className={styles.title} id={id}>
        {title}
      </Heading>
      <span className={styles.line} aria-hidden="true" />
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  )
}
