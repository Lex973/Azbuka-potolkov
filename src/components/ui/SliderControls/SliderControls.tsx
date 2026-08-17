'use client'

import { ArrowLeftIcon, ArrowRightIcon } from '@/components/ui/Icons/Icons'

import styles from './SliderControls.module.css'

type SliderControlsProps = {
  count: number
  activeIndex: number
  onPrevious?: () => void
  onNext?: () => void
  onSelect?: (index: number) => void
  showDots?: boolean
  showCounter?: boolean
  counterFormat?: 'padded' | 'compact'
}

export function SliderControls({
  count,
  activeIndex,
  onPrevious,
  onNext,
  onSelect,
  showDots = true,
  showCounter = true,
  counterFormat = 'padded',
}: SliderControlsProps) {
  return (
    <div
      className={styles.controls}
      data-compact={counterFormat === 'compact' && !showDots ? 'true' : undefined}
    >
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
      {showDots ? (
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
      ) : null}
      {showCounter ? (
        <p className={styles.counter} data-format={counterFormat} aria-live="polite">
          <span>
            {counterFormat === 'compact'
              ? activeIndex + 1
              : String(activeIndex + 1).padStart(2, '0')}
          </span>
          {counterFormat === 'compact' ? (
            <span aria-hidden="true">/</span>
          ) : (
            <span className={styles.counterLine} />
          )}
          <span>{counterFormat === 'compact' ? count : String(count).padStart(2, '0')}</span>
        </p>
      ) : null}
    </div>
  )
}
