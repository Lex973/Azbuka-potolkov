'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { Reveal } from '@/components/motion/Reveal/Reveal'
import { CloseIcon } from '@/components/ui/Icons/Icons'

import styles from './LightboxGallery.module.css'

export type LightboxImage = {
  src: string
  alt: string
  caption: string
  objectPosition?: string
}

type LightboxGalleryProps = {
  images: readonly LightboxImage[]
  columns?: 3 | 4
}

export function LightboxGallery({ images, columns = 4 }: LightboxGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const selectedImage = selectedIndex === null ? null : images[selectedIndex]

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) return

    if (selectedImage && !dialog.open) {
      dialog.showModal()
      document.body.style.overflow = 'hidden'
    }

    if (!selectedImage && dialog.open) dialog.close()

    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedImage])

  function openImage(index: number, trigger: HTMLButtonElement) {
    triggerRef.current = trigger
    setSelectedIndex(index)
  }

  function closeImage() {
    setSelectedIndex(null)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }

  const gridClassName = [styles.grid, columns === 3 ? styles.threeColumns : '']
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <div className={gridClassName}>
        {images.map((image, index) => (
          <Reveal key={`${image.src}-${image.caption}-${index}`} delay={(index % columns) * 0.04}>
            <figure className={styles.figure}>
              <button
                className={styles.imageButton}
                type="button"
                aria-label={`Открыть фотографию: ${image.caption}`}
                onClick={(event) => openImage(index, event.currentTarget)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={
                    columns === 3
                      ? '(max-width: 48rem) 100vw, (max-width: 64rem) 50vw, 33vw'
                      : '(max-width: 48rem) 100vw, (max-width: 64rem) 50vw, 25vw'
                  }
                  style={{ objectPosition: image.objectPosition }}
                />
              </button>
            </figure>
          </Reveal>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label="Просмотр фотографии"
        onCancel={(event) => {
          event.preventDefault()
          closeImage()
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeImage()
        }}
      >
        <button className={styles.close} type="button" onClick={closeImage} aria-label="Закрыть">
          <CloseIcon />
        </button>
        {selectedImage ? (
          <figure className={styles.lightboxFigure}>
            <div className={styles.lightboxImage}>
              <Image src={selectedImage.src} alt={selectedImage.alt} fill sizes="100vw" />
            </div>
            <figcaption>{selectedImage.caption}</figcaption>
          </figure>
        ) : null}
      </dialog>
    </>
  )
}
