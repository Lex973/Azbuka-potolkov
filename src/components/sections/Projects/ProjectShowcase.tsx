'use client'

import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import Image, { getImageProps } from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { preload } from 'react-dom'

import { useFirstVisit } from '@/components/motion/useFirstVisit'
import { Container } from '@/components/ui/Container/Container'
import { ArrowRightIcon } from '@/components/ui/Icons/Icons'
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading'
import { SliderControls } from '@/components/ui/SliderControls/SliderControls'
import type { Project } from '@/types/project'

import styles from './ProjectShowcase.module.css'

const mainImageSizes = '(max-width: 90rem) 92vw, 83rem'
const slideEase = [0.22, 1, 0.36, 1] as const

type ProjectShowcaseProps = {
  id: string
  number: string
  title: string
  projects: Project[]
  /** Мыльные превью по `src` для главных фото и деталей всех слайдов. */
  placeholders: Record<string, string>
  mirrored?: boolean
}

export function ProjectShowcase({
  id,
  number,
  title,
  projects,
  placeholders,
  mirrored = false,
}: ProjectShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const draggedRef = useRef(false)
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const isFirstVisit = useFirstVisit()
  // Детали появляются с анимацией только при переключении слайда, а не при загрузке страницы.
  const [hasSwitched, setHasSwitched] = useState(false)
  const isNearViewport = useInView(sectionRef, { once: true, margin: '600px 0px' })
  const activeProject = projects[activeIndex]

  // Когда карусель подъезжает к экрану, заранее грузим главные фото остальных слайдов:
  // при переключении картинка уже в кеше и не догружается посреди анимации.
  useEffect(() => {
    if (!isNearViewport) return

    for (const project of projects) {
      const { props } = getImageProps({
        src: project.image,
        alt: '',
        fill: true,
        sizes: mainImageSizes,
        quality: 95,
      })
      preload(props.src, {
        as: 'image',
        imageSrcSet: props.srcSet,
        imageSizes: props.sizes,
        fetchPriority: 'low',
      })
    }
  }, [isNearViewport, projects])

  function selectProject(index: number) {
    if (index === activeIndex) return

    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
    setHasSwitched(true)
  }

  function showPrevious() {
    const nextIndex = (activeIndex - 1 + projects.length) % projects.length
    setDirection(-1)
    setActiveIndex(nextIndex)
    setHasSwitched(true)
  }

  function showNext() {
    const nextIndex = (activeIndex + 1) % projects.length
    setDirection(1)
    setActiveIndex(nextIndex)
    setHasSwitched(true)
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
      ref={sectionRef}
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <Container>
        <motion.div
          className={styles.sectionIntro}
          initial={isFirstVisit ? { opacity: 0, y: 18 } : false}
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
                enter: (move: number) => ({ opacity: 0, x: move * 16 }),
                center: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: reduceMotion ? 0 : 0.38, ease: slideEase },
                },
                exit: (move: number) => ({
                  opacity: 0,
                  x: move * -12,
                  transition: { duration: reduceMotion ? 0 : 0.2, ease: slideEase },
                }),
              }}
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
                      placeholder="blur"
                      blurDataURL={placeholders[activeProject.image]}
                      fill
                      sizes={mainImageSizes}
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
                    initial={hasSwitched ? { opacity: 0, y: 10 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.32,
                      delay: reduceMotion ? 0 : 0.06 + detailIndex * 0.05,
                      ease: slideEase,
                    }}
                  >
                    <Image
                      src={detail.image}
                      alt={detail.alt}
                      placeholder="blur"
                      blurDataURL={placeholders[detail.image]}
                      fill
                      sizes="(max-width: 40rem) 33vw, 30vw"
                      style={{ objectPosition: detail.position }}
                    />
                  </motion.figure>
                ))}
              </div>

              <div className={styles.meta} aria-live="polite">
                <Link className={styles.projectTitle} href={projectHref} prefetch={false}>
                  {projects.map((project) => (
                    <h3
                      key={project.slug}
                      className={
                        project.slug === activeProject.slug ? undefined : styles.inactiveTitle
                      }
                      aria-hidden={project.slug !== activeProject.slug}
                    >
                      {project.title}
                    </h3>
                  ))}
                </Link>
                <p>
                  {activeProject.city && (
                    <>
                      <span>{activeProject.city}</span>
                      <span aria-hidden="true">·</span>
                    </>
                  )}
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
