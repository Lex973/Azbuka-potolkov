'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState, type MouseEvent } from 'react'

import { Container } from '@/components/ui/Container/Container'
import { ArrowRightIcon } from '@/components/ui/Icons/Icons'
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading'
import { SliderControls } from '@/components/ui/SliderControls/SliderControls'
import type { Project } from '@/types/project'

import styles from './ProjectShowcase.module.css'

type ProjectShowcaseProps = {
  id: string
  number: string
  title: string
  projects: Project[]
  mirrored?: boolean
}

export function ProjectShowcase({
  id,
  number,
  title,
  projects,
  mirrored = false,
}: ProjectShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const draggedRef = useRef(false)
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

  function handleProjectClick(event: MouseEvent<HTMLAnchorElement>) {
    if (draggedRef.current) {
      event.preventDefault()
    }
  }

  const projectHref = `/projects/${activeProject.slug}`

  return (
    <section
      className={[styles.section, mirrored ? styles.mirroredSection : ''].filter(Boolean).join(' ')}
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <Container>
        <motion.div
          className={styles.sectionIntro}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading
            number={number}
            showEyebrow
            eyebrow="Портфолио"
            title={title}
            className={styles.heading}
            id={`${id}-title`}
          />
        </motion.div>

        <div className={styles.carousel}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.article
              key={activeProject.slug}
              className={styles.project}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              variants={{
                enter: (move: number) => ({ opacity: 0, x: move * 48 }),
                center: { opacity: 1, x: 0 },
                exit: (move: number) => ({ opacity: 0, x: move * -36 }),
              }}
              transition={{ duration: reduceMotion ? 0 : 0.58, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className={styles.media}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.06}
                onDragStart={() => {
                  draggedRef.current = true
                }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) showNext()
                  if (info.offset.x > 60) showPrevious()
                  window.setTimeout(() => {
                    draggedRef.current = false
                  }, 0)
                }}
              >
                <Link
                  className={styles.projectLink}
                  href={projectHref}
                  prefetch={false}
                  onClick={handleProjectClick}
                  aria-label={`Открыть проект «${activeProject.title}»`}
                >
                  <figure className={styles.imageFrame}>
                    <Image
                      src={activeProject.image}
                      alt={activeProject.imageAlt}
                      fill
                      sizes="(max-width: 90rem) 92vw, 83rem"
                      quality={95}
                    />
                    <span className={styles.projectNumber} aria-hidden="true">
                      {String(activeIndex + 1).padStart(2, '0')}
                    </span>
                    <span className={styles.openProject} aria-hidden="true">
                      Открыть проект <ArrowRightIcon />
                    </span>
                  </figure>
                </Link>
              </motion.div>

              <div className={styles.details} aria-label="Детали проекта">
                {activeProject.details.slice(0, 3).map((detail, detailIndex) => (
                  <motion.figure
                    key={`${activeProject.slug}-${detail.alt}`}
                    className={[styles.detailImage, detail.position ? styles.detailCrop : '']
                      .filter(Boolean)
                      .join(' ')}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.5,
                      delay: reduceMotion ? 0 : 0.08 + detailIndex * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Image
                      src={detail.image}
                      alt={detail.alt}
                      fill
                      sizes="(max-width: 40rem) 33vw, 30vw"
                      style={{ objectPosition: detail.position }}
                    />
                  </motion.figure>
                ))}
              </div>

              <div className={styles.meta} aria-live="polite">
                <Link href={projectHref} prefetch={false}>
                  <h3>{activeProject.title}</h3>
                </Link>
                <p>
                  <span>{activeProject.city}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeProject.area}</span>
                </p>
              </div>
            </motion.article>
          </AnimatePresence>

          <div className={styles.controls}>
            <SliderControls
              count={projects.length}
              activeIndex={activeIndex}
              onPrevious={showPrevious}
              onNext={showNext}
              onSelect={selectProject}
              showDots={false}
              counterFormat="compact"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
