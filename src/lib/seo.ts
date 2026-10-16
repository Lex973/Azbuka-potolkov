import { existsSync } from 'node:fs'
import { join } from 'node:path'

import type { Metadata } from 'next'

import { siteConfig } from '@/config/site'

/** Превью 1200×630 для соцсетей лежат в public/images/og. */
const defaultOgImage = '/images/og/home.jpg'

type PageMetadataOptions = {
  title: string
  description: string
  path: string
  /** Превью страницы; если файл ещё не подготовлен, используется общее превью сайта. */
  ogImage?: string
  ogImageAlt?: string
  type?: 'website' | 'article'
}

/** canonical, Open Graph и Twitter для одной страницы. */
export function pageMetadata({
  title,
  description,
  path,
  ogImage,
  ogImageAlt,
  type = 'website',
}: PageMetadataOptions): Metadata {
  const image =
    ogImage && existsSync(join(process.cwd(), 'public', ogImage)) ? ogImage : defaultOgImage
  const images = [{ url: image, width: 1200, height: 630, alt: ogImageAlt ?? title }]

  return {
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: 'ru_RU',
      siteName: siteConfig.name,
      url: path,
      title,
      description,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
  }
}

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString()
}

const organizationId = absoluteUrl('/#organization')

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': organizationId,
    name: siteConfig.name,
    description: siteConfig.description,
    url: absoluteUrl('/'),
    image: absoluteUrl(defaultOgImage),
    logo: absoluteUrl('/apple-icon.png'),
    telephone: siteConfig.phone.href.replace('tel:', ''),
    foundingDate: String(siteConfig.foundingYear),
    founder: { '@type': 'Person', name: siteConfig.founder },
    areaServed: { '@type': 'City', name: siteConfig.city },
    address: siteConfig.addresses.map((address) => ({
      '@type': 'PostalAddress',
      streetAddress: address.replace(`, ${siteConfig.city}`, ''),
      addressLocality: siteConfig.city,
      addressCountry: 'RU',
    })),
    // Совпадает с siteConfig.hours.
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '19:00',
    },
    sameAs: [siteConfig.telegramUrl, siteConfig.twoGisUrl],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: absoluteUrl('/'),
    inLanguage: 'ru-RU',
    publisher: { '@id': organizationId },
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
