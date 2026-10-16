import { Reveal } from '@/components/motion/Reveal/Reveal'
import { Container } from '@/components/ui/Container/Container'
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading'
import { blurDataURL } from '@/lib/image-placeholder'

import { LightingVisualization } from './LightingVisualization'

import styles from './LightingCalculation.module.css'

export async function LightingCalculation() {
  const [interior, map] = await Promise.all([
    blurDataURL('/images/lighting-calculation/interior-lighting.png'),
    blurDataURL('/images/lighting-calculation/illuminance-map.png'),
  ])

  return (
    <section
      className={styles.section}
      id="lighting-calculation"
      aria-labelledby="lighting-calculation-title"
    >
      <Container>
        <div className={styles.intro}>
          <Reveal>
            <SectionHeading
              number="07"
              showEyebrow
              eyebrow="Светотехнический расчёт"
              title="Проверка освещённости"
              description="До монтажа проверяем, как свет будет работать в реальном помещении — не только визуально, но и в точных значениях."
              tone="inverse"
              className={styles.heading}
              id="lighting-calculation-title"
            />
          </Reveal>
        </div>

        <LightingVisualization placeholders={{ interior, map }} />
      </Container>
    </section>
  )
}
