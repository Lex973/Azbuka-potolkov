import { Container } from '@/components/ui/Container/Container'

import { CoordinationTimeline } from '../Approach/CoordinationTimeline'

import styles from './ProcessStrip.module.css'

export function ProcessStrip() {
  return (
    <section className={styles.section} aria-labelledby="process-strip-title">
      <Container>
        <div className={styles.heading}>
          <h2 id="process-strip-title">Одна отметка для всей команды</h2>
        </div>
        <CoordinationTimeline />
      </Container>
    </section>
  )
}
