'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useRef } from 'react'

import { maskedLineVariants, softStaggerContainerVariants } from '@/components/motion/transitions'
import { Container } from '@/components/ui/Container/Container'

import styles from './Hero.module.css'

const heroFacts = [
  { value: 'с 2014', label: 'работаем с потолками' },
  { value: '98%', label: 'объектов по дизайн-проектам' },
  { value: '>100', label: 'объектов в год' },
]

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.055])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 42])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.82], [1, 0.35])

  return (
    <section ref={heroRef} className={styles.hero} id="home" aria-labelledby="hero-title">
      <motion.div
        className={styles.imageFrame}
        style={{
          y: reduceMotion ? 0 : imageY,
          scale: reduceMotion ? 1 : imageScale,
        }}
      >
        <motion.div
          className={styles.imageEntrance}
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.07 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: reduceMotion ? 0 : 1.4,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Image
            className={styles.image}
            src="/images/projects/private-skyline.webp"
            alt="Современная гостиная с интегрированным в потолок светом"
            fill
            priority
            sizes="100vw"
          />
        </motion.div>
      </motion.div>
      <div className={styles.overlay} />
      <motion.div
        className={styles.contentMotion}
        style={{
          y: reduceMotion ? 0 : contentY,
          opacity: reduceMotion ? 1 : contentOpacity,
        }}
      >
        <Container className={styles.content}>
          <motion.div
            className={styles.copy}
            variants={softStaggerContainerVariants}
            initial={reduceMotion ? false : 'hidden'}
            animate="visible"
          >
            <motion.p className={styles.eyebrow} variants={maskedLineVariants}>
              Технический партнёр дизайнеров и архитекторов
            </motion.p>
            <h1 className={styles.title} id="hero-title">
              <span className={styles.titleLine}>
                <motion.span variants={maskedLineVariants}>Потолок, свет и климат —</motion.span>
              </span>
              <span className={styles.titleLine}>
                <motion.strong variants={maskedLineVariants}>одна ответственность</motion.strong>
              </span>
            </h1>
            <motion.p className={styles.lead} variants={maskedLineVariants}>
              Включаемся на этапе чертежей, находим ошибки в узлах до монтажа и ведём объект до
              сдачи. Ваш проект реализуется так, как нарисован.
            </motion.p>
          </motion.div>

          <dl className={styles.facts}>
            {heroFacts.map((fact, index) => (
              <motion.div
                key={fact.value}
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.72,
                  delay: reduceMotion ? 0 : 0.65 + index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <dt>{fact.value}</dt>
                <dd>{fact.label}</dd>
              </motion.div>
            ))}
          </dl>
        </Container>
      </motion.div>
      <motion.div
        className={styles.scrollCue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 1.25 }}
        aria-hidden="true"
      >
        <span>Листайте</span>
        <i />
      </motion.div>
    </section>
  )
}
