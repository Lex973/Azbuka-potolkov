'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import { useState } from 'react'

import { Container } from '@/components/ui/Container/Container'
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading'
import { SliderControls } from '@/components/ui/SliderControls/SliderControls'
import type { Project } from '@/types/project'

import styles from './ProjectShowcase.module.css'

type ProjectShowcaseProps = {
  id: string
  number: string
  title: string
  description: string
  projects: Project[]
  mirrored?: boolean
}

export function ProjectShowcase({
  id,
  number,
  title,
  description,
  projects,
  mirrored = false,
}: ProjectShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const reduceMotion = useReducedMotion()
  const activeProject = projects[activeIndex]

  function selectProject(index: number) {
    if (index === activeIndex) return

    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }

  function showPrevious() {
    const nextIndex = (activeIndex - 1 + projects.length) % projects.length
    setDirection(-1)
    setActiveIndex(nextIndex)
  }

  function showNext() {
    const nextIndex = (activeIndex + 1) % projects.length
    setDirection(1)
    setActiveIndex(nextIndex)
  }

  return (
    <section
      className={[styles.section, mirrored ? styles.mirroredSection : ''].filter(Boolean).join(' ')}
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <Container>
        <motion.div
          className={styles.sectionIntro}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading
            number={number}
            eyebrow="Портфолио"
            title={title}
            description={description}
            className={styles.heading}
            id={`${id}-title`}
          />
          <p className={styles.swipeHint}>Листайте проекты свайпом или стрелками</p>
        </motion.div>

        <div className={styles.viewport}>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.article
              key={activeProject.id}
              className={[styles.project, mirrored ? styles.mirrored : '']
                .filter(Boolean)
                .join(' ')}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              variants={{
                enter: (move: number) => ({ opacity: 0, x: move * 84, scale: 0.97 }),
                center: { opacity: 1, x: 0, scale: 1 },
                exit: (move: number) => ({ opacity: 0, x: move * -64, scale: 0.98 }),
              }}
              transition={{ duration: reduceMotion ? 0 : 0.82, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70) showNext()
                if (info.offset.x > 70) showPrevious()
              }}
            >
              <div className={styles.copy} aria-live="polite">
                <p className={styles.location}>{activeProject.location}</p>
                <h3>{activeProject.title}</h3>
                <p className={styles.description}>{activeProject.description}</p>
                <ul className={styles.features}>
                  {activeProject.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.gallery}>
                <motion.figure
                  className={styles.mainImage}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={activeProject.image}
                    alt={activeProject.imageAlt}
                    fill
                    sizes="(max-width: 64rem) 100vw, 68vw"
                  />
                </motion.figure>
                <div className={styles.details}>
                  {activeProject.details.map((detail, detailIndex) => (
                    <motion.figure
                      key={detail.alt}
                      className={styles.detailImage}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.65,
                        delay: reduceMotion ? 0 : 0.14 + detailIndex * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Image
                        src={activeProject.image}
                        alt={detail.alt}
                        fill
                        sizes="(max-width: 40rem) 33vw, 22vw"
                        style={{ objectPosition: detail.position }}
                      />
                    </motion.figure>
                  ))}
                </div>
                <div className={styles.controls}>
                  <SliderControls
                    count={projects.length}
                    activeIndex={activeIndex}
                    onPrevious={showPrevious}
                    onNext={showNext}
                    onSelect={selectProject}
                  />
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}
