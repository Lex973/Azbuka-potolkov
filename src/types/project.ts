export type ProjectDetail = {
  image: string
  alt: string
  /** Кадрирование, если деталь показывает фрагмент общего фото проекта. */
  position?: string
}

export type ProjectGalleryImage = {
  src: string
  alt: string
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
  /** Фотографии для страницы проекта. Если не заданы, галерея собирается из деталей. */
  gallery?: ProjectGalleryImage[]
  features: string[]
}
