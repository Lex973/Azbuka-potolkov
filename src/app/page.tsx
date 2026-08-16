import { Header } from '@/components/layout/Header/Header'
import { ApproachSection } from '@/components/sections/Approach/ApproachSection'
import { Hero } from '@/components/sections/Hero/Hero'
import { LightingCalculation } from '@/components/sections/LightingCalculation/LightingCalculation'
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
        <ProjectShowcase
          id="private-projects"
          number="04"
          title="Частные проекты"
          projects={privateProjects}
        />
        <ProjectShowcase
          id="commercial-projects"
          number="05"
          title="Коммерческие проекты"
          projects={commercialProjects}
          mirrored
        />
        <ProcessStrip />
        <LightingCalculation />
      </main>
    </div>
  )
}
