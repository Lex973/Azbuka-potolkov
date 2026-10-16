import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProjectPage } from '@/components/sections/ProjectPage/ProjectPage'
import { JsonLd } from '@/components/seo/JsonLd'
import { siteConfig } from '@/config/site'
import { commercialProjects, getProjectBySlug, privateProjects, projects } from '@/content/projects'
import { breadcrumbSchema, pageMetadata } from '@/lib/seo'
import type { Project } from '@/types/project'

type ProjectRouteProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

const sections = [
  { name: 'Частные проекты', path: '/#private-projects', projects: privateProjects },
  { name: 'Коммерческие проекты', path: '/#commercial-projects', projects: commercialProjects },
]

function projectSection(project: Project) {
  return sections.find((section) => section.projects.includes(project)) ?? sections[0]
}

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: ProjectRouteProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) return {}

  const title = `${project.title}, ${project.area} — проект в ${siteConfig.cityLocative}`
  const objectType = project.objectType ?? project.category
  const facts = [objectType !== project.title ? objectType : null, project.area].filter(Boolean)
  const description = `${project.description} ${facts.join(', ')}, срок — ${project.duration}.`

  return {
    title,
    ...pageMetadata({
      title,
      description,
      path: `/projects/${project.slug}`,
      ogImage: `/images/og/projects/${project.slug}.jpg`,
      ogImageAlt: project.pageImageAlt ?? project.imageAlt,
      type: 'article',
    }),
  }
}

export default async function ProjectRoute({ params }: ProjectRouteProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) notFound()

  const section = projectSection(project)

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Главная', path: '/' },
          { name: section.name, path: section.path },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />
      <ProjectPage project={project} />
    </>
  )
}
