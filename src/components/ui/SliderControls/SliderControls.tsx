'use client'

import { ArrowLeftIcon, ArrowRightIcon } from '@/components/ui/Icons/Icons'

import styles from './SliderControls.module.css'

type SliderControlsProps = {
  count: number
  activeIndex: number
  onPrevious?: () => void
  onNext?: () => void
  onSelect?: (index: number) => void
}

export function SliderControls({
  count,
  activeIndex,
  onPrevious,
  onNext,
  onSelect,
}: SliderControlsProps) {
  return (
    <div className={styles.controls}>
      <div className={styles.arrows}>
        <button
          className={styles.arrow}
          type="button"
          onClick={onPrevious}
          aria-label="Предыдущий проект"
        >
          <ArrowLeftIcon />
        </button>
        <button
          className={styles.arrow}
          type="button"
          onClick={onNext}
          aria-label="Следующий проект"
        >
          <ArrowRightIcon />
        </button>
      </div>
      <div className={styles.dots} role="group" aria-label="Выбор проекта">
        {Array.from({ length: count }, (_, index) => (
          <button
            key={index}
            className={styles.dot}
            data-active={index === activeIndex}
            type="button"
            onClick={() => onSelect?.(index)}
            aria-label={`Проект ${index + 1}`}
            aria-current={index === activeIndex ? 'true' : undefined}
          />
        ))}
      </div>
      <p className={styles.counter} aria-live="polite">
        <span>{String(activeIndex + 1).padStart(2, '0')}</span>
        <span className={styles.counterLine} />
        <span>{String(count).padStart(2, '0')}</span>
      </p>
    </div>
  )
}
