export type CeilingTypeImage = {
  src: string
  alt: string
  caption: string
}

export type CeilingTypeDetail = {
  slug: string
  title: string
  metaDescription: string
  /** `position` — фокус кадра, если важная часть фото не в центре. */
  heroImage: CeilingTypeImage & { position?: string }
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
