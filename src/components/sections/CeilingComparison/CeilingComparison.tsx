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
            description="Интерьер становится гармоничным, когда потолку уделяют должное внимание на этапе проектирования, создавая подходящие рабочие узлы, наполняя его деталями и светом соответствующими общей картине интерьера, и ювелирной обработки каждого соединения, каждого угла и каждой детали"
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
