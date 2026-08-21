import Image from 'next/image'

import { ContactDialogButton } from '@/components/forms/ContactDialog/ContactDialogButton'
import { Footer } from '@/components/layout/Footer/Footer'
import { Header } from '@/components/layout/Header/Header'
import { Reveal } from '@/components/motion/Reveal/Reveal'
import { Container } from '@/components/ui/Container/Container'
import { LightboxGallery } from '@/components/ui/LightboxGallery/LightboxGallery'
import type { Project } from '@/types/project'

import styles from './ProjectPage.module.css'

type ProjectPageProps = {
  project: Project
}

export function ProjectPage({ project }: ProjectPageProps) {
  const facts = [
    ['Тип объекта', project.category],
    ['Площадь', project.area],
    ['Город', project.city],
    ['Год', project.year],
    ['Срок монтажа', project.duration],
    ['Стоимость', project.price],
  ] as const

  const galleryImages = project.details.map((detail, index) => ({
    src: project.image,
    alt: detail.alt,
    caption: project.features[index] ?? project.title,
    objectPosition: detail.position,
  }))

  return (
    <div className={styles.page}>
      <Header />

      <main>
        <section className={styles.overview} aria-labelledby="project-title">
          <Container className={styles.overviewGrid}>
            <Reveal className={styles.mainMedia}>
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                preload
                sizes="(max-width: 64rem) 100vw, 66vw"
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
              <h2 id="project-gallery-title">Результат виден в линиях</h2>
              <p>Нажмите на фотографию, чтобы рассмотреть её в полном размере.</p>
            </Reveal>
            <LightboxGallery images={galleryImages} columns={3} />
          </Container>
        </section>

        <section className={styles.contact} aria-labelledby="project-contact-title">
          <Container>
            <Reveal className={styles.contactInner}>
              <div>
                <p className={styles.eyebrow}>Следующий проект</p>
                <h2 id="project-contact-title">Хотите заказать проект?</h2>
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
