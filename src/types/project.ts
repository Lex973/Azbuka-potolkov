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

/** Разделы галереи в порядке показа на странице проекта. */
export type ProjectGalleryStage = 'visualization' | 'documentation' | 'result' | 'process'

/** Раздел без фотографий не выводится. */
export type ProjectGallery = Partial<Record<ProjectGalleryStage, ProjectGalleryImage[]>>

export type Project = {
  slug: string
  category?: 'Частный интерьер' | 'Коммерческий объект'
  objectType?: string
  title: string
  city?: string
  area: string
  year: string
  duration: string
  price?: string
  description: string
  image: string
  imageAlt: string
  details: ProjectDetail[]
  /** Фотографии для страницы проекта. Если не заданы, галерея собирается из деталей. */
  gallery?: ProjectGallery
  features: string[]
}
