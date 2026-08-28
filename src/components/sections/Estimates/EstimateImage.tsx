'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { CloseIcon } from '@/components/ui/Icons/Icons'

import styles from './Estimates.module.css'

type EstimateImageProps = {
  src: string
  alt: string
  title: string
  width: number
  height: number
}

export function EstimateImage({ src, alt, title, width, height }: EstimateImageProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) {
      dialog.showModal()
      document.body.style.overflow = 'hidden'
    }
    if (!isOpen && dialog.open) dialog.close()
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  function close() {
    setIsOpen(false)
  }

  return (
    <>
      <button
        className={styles.imageButton}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Увеличить изображение: ${title}`}
      >
        <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 48rem) 92vw, 46vw" />
      </button>
      <dialog
        ref={dialogRef}
        className={styles.imageDialog}
        aria-label="Увеличенное изображение сметы"
        onCancel={(event) => {
          event.preventDefault()
          close()
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close()
        }}
      >
        <button className={styles.dialogClose} type="button" onClick={close} aria-label="Закрыть">
          <CloseIcon />
        </button>
        <Image className={styles.modalImage} src={src} alt={alt} width={width} height={height} sizes="90vw" />
      </dialog>
    </>
  )
}
