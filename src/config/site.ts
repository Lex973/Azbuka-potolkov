export const siteConfig = {
  name: 'Азбука Потолков',
  /** Временный адрес: canonical, sitemap и превью строятся от него. Заменить на финальный домен. */
  url: 'https://azbukapotolkov.ru',
  city: 'Новосибирск',
  /** Для фраз «в Новосибирске». */
  cityLocative: 'Новосибирске',
  foundingYear: 2014,
  founder: 'Роман Аникин',
  description:
    'Технический партнёр дизайнеров и архитекторов в Новосибирске: натяжные потолки, свет и сложные потолочные узлы — от чертежей до сдачи объекта.',
  phone: {
    display: '+7 905 930-30-00',
    href: 'tel:+79059303000',
  },
  addresses: ['ул. Кирова, 27, Новосибирск', 'ул. Короленко, 11, Новосибирск'],
  hours: 'Пн–Пт, 10:00–19:00',
  hoursNote: 'По предварительному звонку',
  twoGisUrl: 'https://2gis.ru/novosibirsk/firm/70000001019224822',
  reviewsUrl: 'https://2gis.ru/novosibirsk/firm/70000001019224822/tab/reviews',
  telegramUrl: 'https://t.me/+79059303000',
  maxUrl: 'https://max.ru/',
  socialLinks: [
    { label: 'Telegram', href: 'https://t.me/+79059303000' },
    { label: 'MAX', href: 'https://max.ru/' },
  ],
} as const
