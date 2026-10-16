import Image from 'next/image'

import { ContactDialogButton } from '@/components/forms/ContactDialog/ContactDialogButton'
import { Footer } from '@/components/layout/Footer/Footer'
import { Header } from '@/components/layout/Header/Header'
import { Reveal } from '@/components/motion/Reveal/Reveal'
import { Container } from '@/components/ui/Container/Container'
import { LightboxGallery } from '@/components/ui/LightboxGallery/LightboxGallery'
import { blurDataURLs } from '@/lib/image-placeholder'
import type { Project, ProjectGalleryStage } from '@/types/project'

import styles from './ProjectPage.module.css'

type ProjectPageProps = {
  project: Project
}

/** Превью галереи кадрируем выше центра: в проектах важен потолок, а не пол. */
const galleryFocus = '50% 15%'

/** Порядок разделов: от замысла к чертежам, результату и процессу. */
const galleryStages: readonly { stage: ProjectGalleryStage; title: string }[] = [
  { stage: 'visualization', title: 'Визуализация' },
  { stage: 'documentation', title: 'Техническая документация' },
  { stage: 'result', title: 'Результат работы' },
  { stage: 'process', title: 'Этапы работ' },
]

export async function ProjectPage({ project }: ProjectPageProps) {
  const mainImage = project.pageImage ?? project.image
  const placeholders = await blurDataURLs([
    mainImage,
    ...Object.values(project.gallery ?? {}).flatMap((photos) => photos.map((photo) => photo.src)),
    ...project.details.map((detail) => detail.image),
  ])

  const facts = [
    ['Тип объекта', project.objectType ?? project.category],
    ['Площадь', project.area],
    ...(project.city ? ([['Город', project.city]] as const) : []),
    ['Год', project.year],
    ['Срок монтажа', project.duration],
    ...(project.price ? ([['Стоимость', project.price]] as const) : []),
  ] as const

  const gallerySections = project.gallery
    ? galleryStages.flatMap(({ stage, title }) => {
        const photos = project.gallery?.[stage] ?? []
        if (photos.length === 0) return []

        return {
          stage,
          title,
          images: photos.map((photo) => ({
            src: photo.src,
            alt: photo.alt,
            caption: photo.alt,
            objectPosition: galleryFocus,
            blurDataURL: placeholders[photo.src],
          })),
        }
      })
    : [
        {
          stage: 'visualization' as const,
          title: 'Визуализация',
          images: project.details.map((detail, index) => ({
            src: detail.image,
            alt: detail.alt,
            caption: project.features[index] ?? project.title,
            objectPosition: detail.position,
            blurDataURL: placeholders[detail.image],
          })),
        },
      ]

  return (
    <div className={styles.page}>
      <Header />

      <main>
        <section className={styles.overview} aria-labelledby="project-title">
          <Container className={styles.overviewGrid}>
            <Reveal className={styles.mainMedia}>
              <Image
                src={mainImage}
                placeholder="blur"
                blurDataURL={placeholders[mainImage]}
                alt={project.pageImageAlt ?? project.imageAlt}
                fill
                preload
                sizes="(max-width: 64rem) 100vw, 66vw"
                quality={95}
              />
            </Reveal>

            <Reveal className={styles.summary} delay={0.08}>
              <p className={styles.eyebrow}>{project.category}</p>
              <h1 id="project-title">{project.title}</h1>
              <div className={styles.goldLine} aria-hidden="true" />
              <p className={styles.description}>{project.description}</p>

              <dl className={styles.facts} aria-label="Данные проекта">
                {facts.map(([label, value]) => (
                  <div className={styles.fact} key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </Container>
        </section>

        <section className={styles.gallery} aria-labelledby="project-gallery-title">
          <Container>
            <Reveal className={styles.galleryHeading}>
              <p className={styles.eyebrow}>Детали проекта</p>
              <h2 id="project-gallery-title">Результат виден в деталях</h2>
              <p>Нажмите на фотографию, чтобы рассмотреть её в полном размере.</p>
            </Reveal>
            {gallerySections.map(({ stage, title, images }) => (
              <section
                key={stage}
                className={styles.gallerySection}
                aria-labelledby={`gallery-${stage}-title`}
              >
                <Reveal className={styles.stageTitle}>
                  <h3 id={`gallery-${stage}-title`}>{title}</h3>
                </Reveal>
                <LightboxGallery
                  images={images}
                  columns={3}
                  aspect={project.gallery && stage !== 'documentation' ? 'tall' : 'wide'}
                  fit={stage === 'documentation' ? 'contain' : 'cover'}
                />
              </section>
            ))}
          </Container>
        </section>

        <section className={styles.contact} aria-labelledby="project-contact-title">
          <Container>
            <Reveal className={styles.contactInner}>
              <div>
                <p className={styles.eyebrow}>Следующий проект</p>
                <h2 id="project-contact-title">Хотите обсудить проект?</h2>
                <p>Расскажите о пространстве — подключимся к задаче и предложим решение.</p>
              </div>
              <ContactDialogButton className={styles.cta} size="large" showArrow={false}>
                Написать нам
              </ContactDialogButton>
            </Reveal>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  )
}
