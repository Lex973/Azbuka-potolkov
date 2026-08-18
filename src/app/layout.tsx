import type { Metadata } from 'next'
import { Manrope, Poppins } from 'next/font/google'

import './globals.css'

const manrope = Manrope({
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  variable: '--font-manrope',
})

const poppins = Poppins({
  weight: ['300', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
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
    <html lang="ru" className={`${poppins.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  )
}
