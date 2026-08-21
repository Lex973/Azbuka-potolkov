import { LightboxGallery } from '@/components/ui/LightboxGallery/LightboxGallery'
import type { CeilingTypeImage } from '@/types/ceiling-type'

type CeilingGalleryProps = {
  images: readonly CeilingTypeImage[]
}

export function CeilingGallery({ images }: CeilingGalleryProps) {
  return <LightboxGallery images={images} />
}
