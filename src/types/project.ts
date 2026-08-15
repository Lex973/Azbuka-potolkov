export type ProjectDetail = {
  alt: string
  position: string
}

export type Project = {
  id: string
  title: string
  location: string
  description: string
  image: string
  imageAlt: string
  details: ProjectDetail[]
  features: string[]
}
