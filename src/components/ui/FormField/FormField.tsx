import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

import styles from './FormField.module.css'

type SharedFieldProps = {
  id: string
  label: string
  error?: string
  hint?: string
}

type TextFieldProps = SharedFieldProps & InputHTMLAttributes<HTMLInputElement>
type TextAreaFieldProps = SharedFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>

export function TextField({ id, label, error, hint, className, ...props }: TextFieldProps) {
  const descriptionId = error || hint ? `${id}-description` : undefined

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={[styles.control, className ?? ''].filter(Boolean).join(' ')}
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={descriptionId}
        {...props}
      />
      {error || hint ? (
        <span className={error ? styles.error : styles.hint} id={descriptionId}>
          {error ?? hint}
        </span>
      ) : null}
    </div>
  )
}

export function TextAreaField({ id, label, error, hint, className, ...props }: TextAreaFieldProps) {
  const descriptionId = error || hint ? `${id}-description` : undefined

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <textarea
        className={[styles.control, styles.textarea, className ?? ''].filter(Boolean).join(' ')}
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={descriptionId}
        {...props}
      />
      {error || hint ? (
        <span className={error ? styles.error : styles.hint} id={descriptionId}>
          {error ?? hint}
        </span>
      ) : null}
    </div>
  )
}
