import Image from 'next/image'
import Link from 'next/link'

import { ContactDialogButton } from '@/components/forms/ContactDialog/ContactDialogButton'
import { Footer } from '@/components/layout/Footer/Footer'
import { Header } from '@/components/layout/Header/Header'
import { Reveal } from '@/components/motion/Reveal/Reveal'
import { Container } from '@/components/ui/Container/Container'
import type { CeilingTypeDetail } from '@/types/ceiling-type'

import { CeilingGallery } from './CeilingGallery'
import styles from './CeilingTypePage.module.css'

type CeilingTypePageProps = {
  content: CeilingTypeDetail
}

export function CeilingTypePage({ content }: CeilingTypePageProps) {
  return (
    <div className={styles.page}>
      <Header />

      <main id="home">
        <section className={styles.hero} aria-labelledby="ceiling-type-title">
          <Image
            className={styles.heroImage}
            src={content.heroImage.src}
            alt={content.heroImage.alt}
            fill
            preload
            sizes="100vw"
          />
          <div className={styles.heroOverlay} aria-hidden="true" />
          <Container className={styles.heroInner}>
            <Reveal>
              <h1 id="ceiling-type-title">{content.title}</h1>
              <p className={styles.lead}>{content.lead}</p>
            </Reveal>
          </Container>
        </section>

        <section className={styles.intro} aria-labelledby="ceiling-intro-title">
          <Container>
            <Reveal className={styles.introCopy}>
              <div className={styles.sectionLabel}>
                <p>{content.intro.eyebrow}</p>
              </div>
              <h2 id="ceiling-intro-title">{content.intro.title}</h2>
              <div className={styles.goldLine} aria-hidden="true" />
              {content.intro.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className={styles.note}>{content.intro.note}</p>
            </Reveal>
          </Container>
        </section>

        <section className={styles.gallery} aria-labelledby="ceiling-gallery-title">
          <Container>
            <Reveal className={styles.galleryHeading}>
              <div className={styles.sectionLabel}>
                <p>{content.gallery.eyebrow}</p>
              </div>
              <h2 id="ceiling-gallery-title">{content.gallery.title}</h2>
              <p>{content.gallery.description}</p>
            </Reveal>

            <CeilingGallery images={content.gallery.images} />
          </Container>
        </section>

        <section className={styles.feature} aria-labelledby="ceiling-feature-title">
          <Container className={styles.featureGrid}>
            <Reveal className={styles.featureCopy}>
              <p className={styles.inverseEyebrow}>{content.feature.eyebrow}</p>
              <h2 id="ceiling-feature-title">{content.feature.title}</h2>
              <p>{content.feature.description}</p>
            </Reveal>
            <ul className={styles.featurePoints}>
              {content.feature.points.map((point, index) => (
                <Reveal key={point} delay={index * 0.07}>
                  <li>{point}</li>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>

        <section className={styles.installation} aria-labelledby="ceiling-installation-title">
          <Container>
            <Reveal className={styles.installationCopy}>
              <div className={styles.sectionLabel}>
                <p>{content.installation.eyebrow}</p>
              </div>
              <h2 id="ceiling-installation-title">{content.installation.title}</h2>
              <div className={styles.goldLine} aria-hidden="true" />
              {content.installation.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <ContactDialogButton className={styles.cta} size="large">
                {content.installation.ctaLabel}
              </ContactDialogButton>
            </Reveal>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  )
}
