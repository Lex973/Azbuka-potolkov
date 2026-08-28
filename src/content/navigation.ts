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
  { label: 'Роль потолка', href: '#ceiling-comparison' },
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
  { label: 'Instagram', href: '#contacts', ariaLabel: 'Instagram' },
  { label: 'TG', href: 'https://t.me/+79059303000', ariaLabel: 'Telegram' },
  {
    label: 'Журнал',
    href: 'https://sibhome.pro/eksperty/otdelka-remont/azbuka-potolkov-proektno-montazhnaya-kompaniya-po-ustanovke-natyazhnyh-potolkov/',
    ariaLabel: 'Публикация в журнале Sibhome',
  },
] as const
