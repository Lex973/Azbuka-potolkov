'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

import { ContactDialogButton } from '@/components/forms/ContactDialog/ContactDialogButton'
import { ButtonLink } from '@/components/ui/Button/Button'
import { Container } from '@/components/ui/Container/Container'

import styles from './Hero.module.css'

const heroFacts = [
  { value: '2014', label: 'работаем с проектами' },
  { value: '98%', label: 'объектов по дизайн-проектам' },
  { value: '≈100', label: 'объектов в год' },
]

export function Hero() {
  return (
    <section className={styles.hero} id="home" aria-labelledby="hero-title">
      <Image
        className={styles.image}
        src="/images/projects/private-skyline.webp"
        alt="Современная гостиная с интегрированным в потолок светом"
        fill
        priority
        sizes="100vw"
      />
      <div className={styles.overlay} />
      <Container className={styles.content}>
        <motion.div
          className={styles.copy}
          initial={{ opacity: 0, y: 46 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={styles.eyebrow}>Технический партнёр · Новосибирск</p>
          <h1 className={styles.title} id="hero-title">
            Всё над головой — берём на себя
          </h1>
          <p className={styles.lead}>
            Входим в проект на этапе чертежей и ведём потолки и свет до спокойной сдачи.
          </p>
          <div className={styles.buttons}>
            <ContactDialogButton size="large" tone="inverse" />
            <ButtonLink
              href="#private-projects"
              size="large"
              variant="secondary"
              tone="inverse"
              showArrow
            >
              Смотреть проекты
            </ButtonLink>
          </div>
        </motion.div>

        <dl className={styles.facts}>
          {heroFacts.map((fact, index) => (
            <motion.div
              key={fact.value}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.72,
                delay: 0.65 + index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <dt>{fact.value}</dt>
              <dd>{fact.label}</dd>
            </motion.div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
