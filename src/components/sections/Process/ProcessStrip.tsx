import { Container } from '@/components/ui/Container/Container'
import { Reveal } from '@/components/motion/Reveal/Reveal'

import { CoordinationTimeline } from '../Approach/CoordinationTimeline'

import styles from './ProcessStrip.module.css'

export function ProcessStrip() {
  return (
    <section className={styles.section} aria-labelledby="process-strip-title">
      <Container>
        <Reveal className={styles.heading}>
          <h2 id="process-strip-title">Одна отметка для всей команды</h2>
        </Reveal>
        <CoordinationTimeline />
      </Container>
    </section>
  )
}
