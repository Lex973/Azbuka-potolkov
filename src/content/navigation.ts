export type NavigationItem = {
  label: string
  href: `#${string}`
}

export const primaryNavigation: NavigationItem[] = [
  { label: 'Главная', href: '#home' },
  { label: 'Подход', href: '#approach' },
  { label: 'Частные проекты', href: '#private-projects' },
  { label: 'Коммерческие проекты', href: '#commercial-projects' },
]

export const secondaryNavigation: NavigationItem[] = [
  { label: 'Свет', href: '#light' },
  { label: 'Виды потолков', href: '#ceiling-types' },
  { label: 'Сметы', href: '#estimates' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Тихие стены', href: '#quiet-walls' },
  { label: 'Кондиционеры', href: '#air-conditioners' },
  { label: 'Контакты', href: '#contacts' },
]

export const allNavigation = [...primaryNavigation, ...secondaryNavigation]

export const socialLinks = [
  { label: 'VK', href: '#contacts', ariaLabel: 'ВКонтакте' },
  { label: 'TG', href: '#contacts', ariaLabel: 'Telegram' },
] as const
