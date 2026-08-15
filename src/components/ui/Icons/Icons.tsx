import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 12H19M13 6L19 12L13 18" stroke="currentColor" strokeWidth="1.35" />
    </svg>
  )
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M20 12H5M11 6L5 12L11 18" stroke="currentColor" strokeWidth="1.35" />
    </svg>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}

export function PlusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}

export function TelegramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M21.4 3.6 2.8 10.8c-.8.3-.8.9-.1 1.2l4.8 1.5 1.8 5.7c.2.5.4.6.8.6.3 0 .5-.1.7-.3l2.4-2.3 4.9 3.6c.9.5 1.5.2 1.7-.8l3.1-14.7c.3-1.2-.5-1.7-1.5-1.3Z"
        fill="currentColor"
      />
      <path d="m9.1 13 9.5-5.9-7.5 7.2-.3 3.1-1.7-5.4Z" fill="var(--color-brand)" />
    </svg>
  )
}

export function VkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M3.8 6.6h2.3l2.2 6.5 2.2-6.5h2.2l-3.2 10.8H7L3.8 6.6Z" fill="currentColor" />
      <path
        d="M13.4 6.6h2.2v3.8l3-3.8h2.8l-3.8 4.7 4 6.1h-2.9l-3.1-4.5v4.5h-2.2V6.6Z"
        fill="currentColor"
      />
    </svg>
  )
}
