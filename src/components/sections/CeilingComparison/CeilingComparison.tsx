import { Reveal } from '@/components/motion/Reveal/Reveal'
import { Container } from '@/components/ui/Container/Container'
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading'

import { BeforeAfterSlider } from './BeforeAfterSlider'

import styles from './CeilingComparison.module.css'

export function CeilingComparison() {
  return (
    <section
      className={styles.section}
      id="ceiling-comparison"
      aria-labelledby="ceiling-comparison-title"
    >
      <Container>
        <Reveal>
          <SectionHeading
            number="06"
            eyebrow="Роль потолка"
            title="Потолок завершает пространство"
            description="Стены, пол и мебель уже на месте. Но без готового потолка интерьер всё ещё выглядит незавершённым. Переместите бегунок и посмотрите, как меняется ощущение от всего пространства."
            className={styles.heading}
            id="ceiling-comparison-title"
          />
        </Reveal>

        <Reveal className={styles.sliderReveal} delay={0.1}>
          <BeforeAfterSlider />
        </Reveal>
      </Container>
    </section>
  )
}
