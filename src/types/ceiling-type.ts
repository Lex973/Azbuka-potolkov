export type CeilingTypeImage = {
  src: string
  alt: string
  caption: string
}

export type CeilingTypeDetail = {
  slug: string
  title: string
  metaDescription: string
  heroImage: CeilingTypeImage
  lead: string
  intro: {
    eyebrow: string
    title: string
    paragraphs: readonly string[]
    note: string
  }
  gallery: {
    eyebrow: string
    title: string
    description: string
    images: readonly CeilingTypeImage[]
  }
  installation: {
    eyebrow: string
    title: string
    paragraphs: readonly string[]
    ctaLabel: string
  }
}
