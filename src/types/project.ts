export type ProjectDetail = {
  alt: string
  position: string
}

export type Project = {
  slug: string
  category: 'Частный интерьер' | 'Коммерческий объект'
  title: string
  city: string
  area: string
  year: string
  duration: string
  price: string
  description: string
  image: string
  imageAlt: string
  details: ProjectDetail[]
  features: string[]
}
