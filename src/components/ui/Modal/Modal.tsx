'use client'

import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { CloseIcon } from '@/components/ui/Icons/Icons'
import { lockBodyScroll } from '@/lib/scroll-lock'

import styles from './Modal.module.css'

type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  eyebrow?: string
  children: ReactNode
}

export function Modal({ open, onClose, title, eyebrow, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)
  const titleId = useId()
  // Окно появляется в DOM только с первым открытием: заголовки окон
  // не попадают в HTML страницы раньше её собственного h1.
  // Портал в body: иначе стили секции, где стоит кнопка (`.hero p`, `h2`),
  // протекают внутрь окна.
  const [mounted, setMounted] = useState(open)

  if (open && !mounted) setMounted(true)

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) {
      return
    }

    if (open && !dialog.open) {
      restoreFocusRef.current = document.activeElement as HTMLElement | null
      dialog.showModal()
    }

    if (!open && dialog.open) {
      dialog.close()
    }

    if (open) return lockBodyScroll()
  }, [open])

  function handleClose() {
    onClose()
  }

  if (!mounted) return null

  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault()
        handleClose()
      }}
      onClose={() => {
        requestAnimationFrame(() => restoreFocusRef.current?.focus({ preventScroll: true }))
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          handleClose()
        }
      }}
    >
      <div className={styles.panel}>
        <button className={styles.close} type="button" onClick={handleClose} aria-label="Закрыть">
          <CloseIcon />
        </button>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <h2 className={styles.title} id={titleId}>
          {title}
        </h2>
        <div className={styles.content}>{children}</div>
      </div>
    </dialog>,
    document.body,
  )
}
