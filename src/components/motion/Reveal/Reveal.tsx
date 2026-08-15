'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

import { fadeUpVariants } from '@/components/motion/transitions'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.24 }}
      transition={{
        delay: shouldReduceMotion ? 0 : delay,
        duration: shouldReduceMotion ? 0 : undefined,
      }}
    >
      {children}
    </motion.div>
  )
}
