'use client'

import { motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'

import styles from './LightingCalculation.module.css'

const results = [
  {
    number: '01',
    label: 'Модель',
    value: 'Геометрия помещения',
  },
  {
    number: '02',
    label: 'Проверка',
    value: 'Освещённость в люксах',
  },
  {
    number: '03',
    label: 'Результат',
    value: 'Точная схема света',
  },
]

export function LightingVisualization() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={styles.visualization}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.82, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.toolbar}>
        <p>
          <span className={styles.statusDot} aria-hidden="true" />
          Расчёт освещения
        </p>
        <p>Модель помещения / сценарий 01</p>
      </div>

      <div className={styles.workspace}>
        <motion.figure
          className={styles.panel}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.68,
            delay: shouldReduceMotion ? 0 : 0.14,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className={styles.panelHeading}>
            <span>01 / Световая сцена</span>
            <span>Проектный вид</span>
          </div>
          <div className={styles.imageFrame}>
            <Image
              src="/images/lighting-calculation/interior-lighting.png"
              alt="Интерьер с рассчитанной системой трекового и акцентного освещения"
              fill
              sizes="(max-width: 64rem) 100vw, 50vw"
            />
          </div>
          <figcaption>
            Проверяем направление света, акценты и работу общей световой сцены.
          </figcaption>
        </motion.figure>

        <motion.figure
          className={styles.panel}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.68,
            delay: shouldReduceMotion ? 0 : 0.24,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className={styles.panelHeading}>
            <span>02 / Карта освещённости</span>
            <span>Результат в люксах</span>
          </div>
          <div className={[styles.imageFrame, styles.calculationFrame].join(' ')}>
            <Image
              src="/images/lighting-calculation/illuminance-map.png"
              alt="Псевдоцветная карта распределения освещённости в том же интерьере"
              fill
              sizes="(max-width: 64rem) 100vw, 50vw"
            />
            <motion.span
              className={styles.scanLine}
              aria-hidden="true"
              animate={shouldReduceMotion ? undefined : { x: ['-120%', '620%'] }}
              transition={{ duration: 5.6, repeat: Infinity, ease: 'linear', repeatDelay: 0.8 }}
            />
            <span className={[styles.luxMarker, styles.markerOne].join(' ')} aria-hidden="true">
              520 lx
            </span>
            <span className={[styles.luxMarker, styles.markerTwo].join(' ')} aria-hidden="true">
              310 lx
            </span>
            <span className={[styles.luxMarker, styles.markerThree].join(' ')} aria-hidden="true">
              165 lx
            </span>
            <div className={styles.scale} aria-hidden="true">
              <span className={styles.scaleGradient} />
              <span>80</span>
              <span>150</span>
              <span>300</span>
              <span>500</span>
              <span>750 lx</span>
            </div>
          </div>
          <figcaption>
            Видим интенсивность и равномерность света ещё до начала монтажных работ.
          </figcaption>
        </motion.figure>
      </div>

      <div className={styles.results}>
        {results.map((result, index) => (
          <motion.div
            className={styles.result}
            key={result.number}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.54,
              delay: shouldReduceMotion ? 0 : 0.32 + index * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p>
              <span>{result.number}</span> / {result.label}
            </p>
            <strong>{result.value}</strong>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
