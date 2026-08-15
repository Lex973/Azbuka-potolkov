import type { Transition, Variants } from 'motion/react'

export const motionTransition: Transition = {
  duration: 0.72,
  ease: [0.22, 1, 0.36, 1],
}

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: motionTransition },
}

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
}
