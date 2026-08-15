'use client'

import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'

import { staggerContainerVariants, fadeUpVariants } from '@/components/motion/transitions'
import { Button } from '@/components/ui/Button/Button'

import styles from './MotionShowcase.module.css'

const motionItems = ['Плоскость', 'Свет', 'Смежники']

export function MotionShowcase() {
  const [animationKey, setAnimationKey] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className={styles.showcase}>
      <div className={styles.header}>
        <div>
          <p className={styles.label}>Reveal / stagger / line</p>
          <p className={styles.note}>Сдержанный ритм помогает последовательно считать процесс.</p>
        </div>
        <Button
          size="small"
          tone="inverse"
          variant="secondary"
          onClick={() => setAnimationKey((value) => value + 1)}
        >
          Повторить
        </Button>
      </div>

      <motion.div
        key={animationKey}
        className={styles.sequence}
        variants={shouldReduceMotion ? undefined : staggerContainerVariants}
        initial={shouldReduceMotion ? false : 'hidden'}
        animate="visible"
      >
        {motionItems.map((item, index) => (
          <motion.div
            key={item}
            className={styles.item}
            variants={shouldReduceMotion ? undefined : fadeUpVariants}
          >
            <span className={styles.point}>{String(index + 1).padStart(2, '0')}</span>
            <span className={styles.itemLabel}>{item}</span>
            {index < motionItems.length - 1 ? (
              <motion.span
                className={styles.line}
                initial={shouldReduceMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.35 + index * 0.18, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : null}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
