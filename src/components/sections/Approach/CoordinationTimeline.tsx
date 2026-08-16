'use client'

import { motion, useReducedMotion } from 'motion/react'

import styles from './CoordinationTimeline.module.css'

const steps = [
  { number: '01', title: 'Фиксируем уровень', text: 'Даём рабочую отметку в начале ремонта.' },
  {
    number: '02',
    title: 'Передаём смежникам',
    text: 'Мебель, плитка и двери считают от одной плоскости.',
  },
  {
    number: '03',
    title: 'Сводим решения',
    text: 'Согласовываем узлы и обновляем данные по факту.',
  },
]

export function CoordinationTimeline() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.ol
      className={styles.timeline}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.24 } } }}
    >
      {steps.map((step, index) => (
        <motion.li
          key={step.number}
          className={styles.timelineStep}
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: reduceMotion ? 0 : 0.7,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        >
          <div className={styles.rail}>
            <motion.span
              className={styles.dot}
              variants={{
                hidden: { opacity: 0, scale: 0.3 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: reduceMotion ? 0 : 0.55,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
            />
            <motion.span
              className={styles.connector}
              data-tail={index === steps.length - 1}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{
                duration: reduceMotion ? 0 : 0.85,
                delay: reduceMotion ? 0 : index * 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </div>
          <p className={styles.stepNumber}>{step.number}</p>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </motion.li>
      ))}
    </motion.ol>
  )
}
