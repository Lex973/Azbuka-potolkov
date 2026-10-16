import type { MetadataRoute } from 'next'

import { ceilingTypes } from '@/content/ceiling-types'
import { projects } from '@/content/projects'
import { absoluteUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/'), changeFrequency: 'monthly', priority: 1 },
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
    ...ceilingTypes.map((ceilingType) => ({
      url: absoluteUrl(`/ceiling-types/${ceilingType.slug}`),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ]
}
