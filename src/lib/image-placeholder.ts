import { join } from 'node:path'

import sharp from 'sharp'

const cache = new Map<string, Promise<string>>()

/**
 * Мыльное превью картинки из public/ для `placeholder="blur"`: копия ~16 px шириной,
 * около 300 байт. Считается на сервере при сборке, поэтому новые фото получают превью сами.
 */
export function blurDataURL(src: string) {
  let pending = cache.get(src)

  if (!pending) {
    pending = sharp(join(process.cwd(), 'public', src))
      .resize(16, 16, { fit: 'inside' })
      .webp({ quality: 40 })
      .toBuffer()
      .then((buffer) => `data:image/webp;base64,${buffer.toString('base64')}`)
    cache.set(src, pending)
  }

  return pending
}

/** Пропсы `next/image` для серверных компонентов: `<Image {...await blurProps(src)} />`. */
export async function blurProps(src: string) {
  return { placeholder: 'blur', blurDataURL: await blurDataURL(src) } as const
}

/** Превью для набора картинок, которые передаются в клиентский компонент. */
export async function blurDataURLs(sources: readonly string[]) {
  const entries = await Promise.all(sources.map(async (src) => [src, await blurDataURL(src)]))
  return Object.fromEntries(entries) as Record<string, string>
}
