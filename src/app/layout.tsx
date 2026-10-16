import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'

import { siteConfig } from '@/config/site'

import './globals.css'

const manrope = Manrope({
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  formatDetection: { telephone: false },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={manrope.variable}
      // Плавная прокрутка нужна для якорей, но при переходе между страницами
      // Next должен отключать её, иначе новая страница открывается не сверху.
      data-scroll-behavior="smooth"
    >
      <body>{children}</body>
    </html>
  )
}
