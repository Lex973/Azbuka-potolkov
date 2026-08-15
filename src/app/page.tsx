import { Header } from '@/components/layout/Header/Header'
import { ApproachSection } from '@/components/sections/Approach/ApproachSection'
import { Hero } from '@/components/sections/Hero/Hero'
import { ProcessStrip } from '@/components/sections/Process/ProcessStrip'
import { ProjectShowcase } from '@/components/sections/Projects/ProjectShowcase'
import { commercialProjects, privateProjects } from '@/content/projects'

import styles from './page.module.css'

export default function HomePage() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <Hero />
        <ApproachSection />
        <ProcessStrip />
        <ProjectShowcase
          id="private-projects"
          number="03"
          title="Частные проекты"
          description="Интерьеры, в которых техническая точность остаётся незаметной — и поэтому всё выглядит естественно."
          projects={privateProjects}
        />
        <ProjectShowcase
          id="commercial-projects"
          number="04"
          title="Коммерческие проекты"
          description="Свет и потолочные решения для пространств с собственным ритмом, сценарием и нагрузкой."
          projects={commercialProjects}
          mirrored
        />
      </main>
    </div>
  )
}
