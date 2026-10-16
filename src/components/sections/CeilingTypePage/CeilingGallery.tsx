import {
  LightboxGallery,
  type LightboxImage,
} from '@/components/ui/LightboxGallery/LightboxGallery'

type CeilingGalleryProps = {
  images: readonly LightboxImage[]
}

export function CeilingGallery({ images }: CeilingGalleryProps) {
  return <LightboxGallery images={images} />
}
