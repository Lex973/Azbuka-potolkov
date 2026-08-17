export type ProjectDetail = {
  alt: string
  position: string
}

export type Project = {
  slug: string
  title: string
  city: string
  area: string
  description: string
  image: string
  imageAlt: string
  details: ProjectDetail[]
  features: string[]
}
