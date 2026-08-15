import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

import { ArrowRightIcon } from '@/components/ui/Icons/Icons'

import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'small' | 'medium' | 'large'
type ButtonTone = 'default' | 'inverse'
type PreviewState = 'hover' | 'active'

type SharedButtonProps = {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  tone?: ButtonTone
  showArrow?: boolean
  previewState?: PreviewState
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & SharedButtonProps
type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & SharedButtonProps

function getButtonClassName(
  variant: ButtonVariant,
  size: ButtonSize,
  tone: ButtonTone,
  className?: string,
) {
  return [styles.button, styles[variant], styles[size], styles[tone], className ?? '']
    .filter(Boolean)
    .join(' ')
}

export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  tone = 'default',
  showArrow = false,
  previewState,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={getButtonClassName(variant, size, tone, className)}
      data-preview-state={previewState}
      type={type}
      {...props}
    >
      <span>{children}</span>
      {showArrow ? <ArrowRightIcon className={styles.arrow} /> : null}
    </button>
  )
}

export function ButtonLink({
  children,
  variant = 'primary',
  size = 'medium',
  tone = 'default',
  showArrow = false,
  previewState,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={getButtonClassName(variant, size, tone, className)}
      data-preview-state={previewState}
      {...props}
    >
      <span>{children}</span>
      {showArrow ? <ArrowRightIcon className={styles.arrow} /> : null}
    </a>
  )
}
