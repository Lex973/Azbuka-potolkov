import Image from 'next/image'

import { ArrowRightIcon } from '@/components/ui/Icons/Icons'

import styles from './ProjectCard.module.css'

type ProjectCardProps = {
  image: string
  alt: string
  index: string
  category: string
  title: string
  description: string
}

export function ProjectCard({ image, alt, index, category, title, description }: ProjectCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image
          className={styles.image}
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 52vw"
        />
        <span className={styles.index}>{index}</span>
      </div>
      <div className={styles.content}>
        <p className={styles.category}>{category}</p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <span className={styles.action} aria-hidden="true">
          Смотреть проект
          <ArrowRightIcon />
        </span>
      </div>
    </article>
  )
}
