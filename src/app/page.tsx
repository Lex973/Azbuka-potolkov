import { Header } from '@/components/layout/Header/Header'
import { Footer } from '@/components/layout/Footer/Footer'
import { ApproachSection } from '@/components/sections/Approach/ApproachSection'
import { CeilingTypes } from '@/components/sections/CeilingTypes/CeilingTypes'
import { CeilingComparison } from '@/components/sections/CeilingComparison/CeilingComparison'
import { ContactSection } from '@/components/sections/Contact/ContactSection'
import { Estimates } from '@/components/sections/Estimates/Estimates'
import { FinalCtaSection } from '@/components/sections/FinalCta/FinalCtaSection'
import { FounderSection } from '@/components/sections/Founder/FounderSection'
import { Hero } from '@/components/sections/Hero/Hero'
import { LightingCalculation } from '@/components/sections/LightingCalculation/LightingCalculation'
import { ProjectShowcase } from '@/components/sections/Projects/ProjectShowcase'
import { Testimonials } from '@/components/sections/Testimonials/Testimonials'
import { commercialProjects, privateProjects } from '@/content/projects'

import styles from './page.module.css'

export default function HomePage() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <Hero />
        <ApproachSection />
        <CeilingComparison />
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
        <LightingCalculation />
        <CeilingTypes />
        <Estimates />
        <Testimonials />
        <ContactSection />
        <FinalCtaSection />
        <FounderSection />
      </main>
      <Footer />
    </div>
  )
}
