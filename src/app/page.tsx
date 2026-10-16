import type { Metadata } from 'next'

import { Header } from '@/components/layout/Header/Header'
import { Footer } from '@/components/layout/Footer/Footer'
import { ApproachSection } from '@/components/sections/Approach/ApproachSection'
import { AirConditionersSection } from '@/components/sections/AirConditioners/AirConditionersSection'
import { CeilingTypes } from '@/components/sections/CeilingTypes/CeilingTypes'
import { CeilingComparison } from '@/components/sections/CeilingComparison/CeilingComparison'
import { ContactSection } from '@/components/sections/Contact/ContactSection'
import { Estimates } from '@/components/sections/Estimates/Estimates'
import { FounderSection } from '@/components/sections/Founder/FounderSection'
import { Hero } from '@/components/sections/Hero/Hero'
import { LightingCalculation } from '@/components/sections/LightingCalculation/LightingCalculation'
import { ProjectShowcase } from '@/components/sections/Projects/ProjectShowcase'
import { QuietWallsSection } from '@/components/sections/QuietWalls/QuietWallsSection'
import { Testimonials } from '@/components/sections/Testimonials/Testimonials'
import { JsonLd } from '@/components/seo/JsonLd'
import { siteConfig } from '@/config/site'
import { commercialProjects, privateProjects } from '@/content/projects'
import { organizationSchema, pageMetadata, websiteSchema } from '@/lib/seo'

import styles from './page.module.css'

const title = `Натяжные потолки и свет по дизайн-проектам в ${siteConfig.cityLocative}`
const description = `${siteConfig.description} С ${siteConfig.foundingYear} года, около 100 объектов в год.`

export const metadata: Metadata = {
  title: { absolute: `${title} — ${siteConfig.name}` },
  ...pageMetadata({
    title,
    description,
    path: '/',
    ogImage: '/images/og/home.jpg',
    ogImageAlt: 'Интерьер с потолком и встроенным светом',
  }),
}

export default function HomePage() {
  return (
    <div className={styles.page}>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={websiteSchema()} />
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
        <FounderSection />
        <QuietWallsSection />
        <AirConditionersSection />
      </main>
      <Footer />
    </div>
  )
}
