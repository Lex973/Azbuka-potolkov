import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // 75 — значение next/image по умолчанию для превью и фоновых изображений.
    // 95 — фотографии, которые показываются крупно.
    qualities: [75, 95],
  },
}

export default nextConfig
