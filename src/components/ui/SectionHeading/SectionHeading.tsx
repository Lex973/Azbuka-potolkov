import type { ElementType, ReactNode } from 'react'

import styles from './SectionHeading.module.css'

type SectionHeadingProps = {
  /** Kept for backwards compatibility; section headings no longer display numbering. */
  number?: string
  eyebrow: string
  title: ReactNode
  description?: string
  tone?: 'default' | 'inverse'
  as?: ElementType
  className?: string
  id?: string
  showEyebrow?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'default',
  as: Heading = 'h2',
  className,
  id,
  showEyebrow = false,
}: SectionHeadingProps) {
  const classes = [styles.heading, styles[tone], className ?? ''].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {showEyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <Heading className={styles.title} id={id}>
        {title}
      </Heading>
      <span className={styles.line} aria-hidden="true" />
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  )
}
