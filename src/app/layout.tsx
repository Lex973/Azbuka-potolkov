import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'

import './globals.css'

const manrope = Manrope({
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  title: {
    default: 'Азбука Потолков',
    template: '%s — Азбука Потолков',
  },
  description: 'Технический партнёр дизайнеров и архитекторов Новосибирска по потолкам и свету.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body>{children}</body>
    </html>
  )
}
