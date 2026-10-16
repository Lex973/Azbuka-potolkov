export type NavigationItem = {
  label: string
  href: `#${string}`
  /** Секции, при прокрутке которых пункт считается активным. По умолчанию — цель ссылки. */
  sections?: string[]
}

export type NavigationGroup = {
  title: string
  items: NavigationItem[]
}

/** Короткий ряд в шапке. `compact: false` — пункт скрывается на средних экранах. */
export const primaryNavigation: (NavigationItem & { compact: boolean })[] = [
  { label: 'Подход', href: '#approach', compact: true },
  {
    label: 'Проекты',
    href: '#private-projects',
    sections: ['private-projects', 'commercial-projects'],
    compact: true,
  },
  { label: 'Виды потолков', href: '#ceiling-types', compact: false },
  { label: 'Сметы', href: '#estimates', compact: true },
  { label: 'Отзывы', href: '#reviews', compact: false },
]

/** Все секции главной, сгруппированные по смыслу; порядок внутри группы — как на странице. */
export const navigationGroups: NavigationGroup[] = [
  {
    title: 'Компания',
    items: [
      { label: 'Подход', href: '#approach' },
      { label: 'Роль потолка', href: '#ceiling-comparison' },
      { label: 'Отзывы', href: '#reviews' },
      { label: 'Основатель', href: '#founder' },
    ],
  },
  {
    title: 'Проекты',
    items: [
      { label: 'Частные', href: '#private-projects' },
      { label: 'Коммерческие', href: '#commercial-projects' },
      { label: 'Виды потолков', href: '#ceiling-types' },
    ],
  },
  {
    title: 'Решения',
    items: [
      { label: 'Расчёт света', href: '#lighting-calculation' },
      { label: 'Тихие стены', href: '#quiet-walls' },
      { label: 'Кондиционеры', href: '#air-conditioners' },
    ],
  },
  {
    title: 'Сотрудничество',
    items: [
      { label: 'Сметы', href: '#estimates' },
      { label: 'Прислать проект', href: '#contact-form' },
      { label: 'Контакты', href: '#contacts' },
    ],
  },
]

export const socialLinks = [
  { label: 'Instagram', href: '#contacts', ariaLabel: 'Instagram' },
  { label: 'TG', href: 'https://t.me/+79059303000', ariaLabel: 'Telegram' },
  {
    label: 'Журнал',
    href: 'https://sibhome.pro/eksperty/otdelka-remont/azbuka-potolkov-proektno-montazhnaya-kompaniya-po-ustanovke-natyazhnyh-potolkov/',
    ariaLabel: 'Публикация в журнале Sibhome',
  },
] as const
