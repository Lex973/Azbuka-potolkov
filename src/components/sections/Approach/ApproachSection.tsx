'use client'

import { motion } from 'motion/react'

import { Reveal } from '@/components/motion/Reveal/Reveal'
import { Container } from '@/components/ui/Container/Container'
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading'

import styles from './Approach.module.css'

const reasons = [
  {
    number: '01',
    title: 'До начала отделки',
    text: 'Читаем чертежи и заранее согласовываем всё, что окажется в плоскости потолка.',
  },
  {
    number: '02',
    title: 'Одна техническая карта',
    text: 'Каждый подрядчик понимает, что и к какой отметке подготовить на своём этапе.',
  },
  {
    number: '03',
    title: 'Надзор весь ремонт',
    text: 'Проверяем фактические уровни, координируем смежников и остаёмся на связи до сдачи.',
  },
  {
    number: '04',
    title: 'Смета без сюрпризов',
    text: 'Понятная смета с изображениями фиксируется в договоре — без внезапных дополнительных работ.',
  },
]

export function ApproachSection() {
  return (
    <section className={styles.section} id="approach" aria-labelledby="approach-title">
      <Container>
        <motion.div
          className={styles.intro}
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading
            number="02"
            eyebrow="Подход"
            title="Подключаемся к проекту первыми"
            description="Не просто устанавливаем потолок, а собираем все решения над головой в понятную систему — от чертежа до финальной проверки."
            tone="inverse"
            className={styles.heading}
            id="approach-title"
          />
        </motion.div>

        <div className={styles.reasonsBlock}>
          <p className={styles.label}>[ Почему выбирают именно нас? ]</p>
          <div className={styles.reasons}>
            {reasons.map((reason, index) => (
              <Reveal key={reason.number} className={styles.reason} delay={index * 0.12}>
                <span>{reason.number}</span>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
