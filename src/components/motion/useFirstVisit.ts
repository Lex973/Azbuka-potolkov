'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

// Живёт, пока открыта вкладка: при переходах внутри сайта модуль не перезагружается.
const visitedPaths = new Set<string>()

/**
 * `true`, пока страница открыта впервые за сессию. При возврате на уже
 * просмотренную страницу анимации появления не повторяются: контент сразу
 * стоит на месте, и браузер не пересчитывает десятки анимаций при восстановлении скролла.
 */
export function useFirstVisit() {
  const pathname = usePathname()
  const [isFirstVisit] = useState(() => !visitedPaths.has(pathname))

  useEffect(() => {
    visitedPaths.add(pathname)
  }, [pathname])

  return isFirstVisit
}
