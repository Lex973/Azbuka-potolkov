import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CeilingTypePage } from '@/components/sections/CeilingTypePage/CeilingTypePage'
import { ceilingTypes, getCeilingTypeBySlug } from '@/content/ceiling-types'

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

  return {
    title: ceilingType.title,
    description: ceilingType.metaDescription,
  }
}

export default async function CeilingTypeRoute({ params }: PageProps<'/ceiling-types/[slug]'>) {
  const { slug } = await params
  const ceilingType = getCeilingTypeBySlug(slug)

  if (!ceilingType) notFound()

  return <CeilingTypePage content={ceilingType} />
}
