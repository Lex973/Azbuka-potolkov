import type { Transition, Variants } from 'motion/react'

export const motionTransition: Transition = {
  duration: 0.72,
  ease: [0.22, 1, 0.36, 1],
}

export const emphasizedTransition: Transition = {
  duration: 0.9,
  ease: [0.16, 1, 0.3, 1],
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

export const softStaggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
}

export const maskedLineVariants: Variants = {
  hidden: { y: '112%', opacity: 0 },
  visible: { y: '0%', opacity: 1, transition: emphasizedTransition },
}
