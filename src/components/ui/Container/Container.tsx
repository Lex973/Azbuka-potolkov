import type { HTMLAttributes, ReactNode } from 'react'

import styles from './Container.module.css'

type ContainerSize = 'default' | 'text'

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  size?: ContainerSize
}

export function Container({ children, className, size = 'default', ...props }: ContainerProps) {
  const classes = [styles.container, size === 'text' ? styles.text : '', className ?? '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
