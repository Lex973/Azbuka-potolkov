'use client'

import { useEffect, useId, useRef, type ReactNode } from 'react'

import { CloseIcon } from '@/components/ui/Icons/Icons'

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

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) {
      return
    }

    if (open && !dialog.open) {
      restoreFocusRef.current = document.activeElement as HTMLElement | null
      dialog.showModal()
      document.body.style.overflow = 'hidden'
    }

    if (!open && dialog.open) {
      dialog.close()
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  function handleClose() {
    document.body.style.overflow = ''
    onClose()
    requestAnimationFrame(() => restoreFocusRef.current?.focus())
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault()
        handleClose()
      }}
      onClose={() => {
        document.body.style.overflow = ''
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
    </dialog>
  )
}
