'use client'

import { useState } from 'react'

import { SliderControls } from '@/components/ui/SliderControls/SliderControls'

export function SliderControlsDemo() {
  const [activeIndex, setActiveIndex] = useState(0)
  const count = 4

  return (
    <SliderControls
      count={count}
      activeIndex={activeIndex}
      onPrevious={() => setActiveIndex((activeIndex - 1 + count) % count)}
      onNext={() => setActiveIndex((activeIndex + 1) % count)}
      onSelect={setActiveIndex}
    />
  )
}
