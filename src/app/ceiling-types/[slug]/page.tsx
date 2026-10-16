import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CeilingTypePage } from '@/components/sections/CeilingTypePage/CeilingTypePage'
import { JsonLd } from '@/components/seo/JsonLd'
import { siteConfig } from '@/config/site'
import { ceilingTypes, getCeilingTypeBySlug } from '@/content/ceiling-types'
import { breadcrumbSchema, pageMetadata } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return ceilingTypes.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/ceiling-types/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const ceilingType = getCeilingTypeBySlug(slug)

  if (!ceilingType) return {}

  const title = `${ceilingType.title} в ${siteConfig.cityLocative}`

  return {
    title,
    ...pageMetadata({
      title,
      description: ceilingType.metaDescription,
      path: `/ceiling-types/${ceilingType.slug}`,
      ogImage: `/images/og/ceiling-types/${ceilingType.slug}.jpg`,
      ogImageAlt: ceilingType.heroImage.alt,
      type: 'article',
    }),
  }
}

export default async function CeilingTypeRoute({ params }: PageProps<'/ceiling-types/[slug]'>) {
  const { slug } = await params
  const ceilingType = getCeilingTypeBySlug(slug)

  if (!ceilingType) notFound()

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Главная', path: '/' },
          { name: 'Виды потолков', path: '/#ceiling-types' },
          { name: ceilingType.title, path: `/ceiling-types/${ceilingType.slug}` },
        ])}
      />
      <CeilingTypePage content={ceilingType} />
    </>
  )
}
