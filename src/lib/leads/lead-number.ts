import 'server-only'

import { mkdir, readdir } from 'node:fs/promises'
import { join } from 'node:path'

const dateFormat = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Novosibirsk',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

/** Empty directories reserve numbers atomically across processes. Store on a persistent
 * volume; no personal data. Reservations are never reused after failed delivery. */
export function createLeadNumberAllocator(root: string) {
  return async (date: Date): Promise<string> => {
    const parts = dateFormat.formatToParts(date)
    const part = (type: Intl.DateTimeFormatPartTypes) =>
      parts.find((item) => item.type === type)!.value
    const day = part('day')
    const month = part('month')
    const directory = join(root, `${part('year')}-${month}-${day}`)
    await mkdir(directory, { recursive: true })
    const entries = await readdir(directory)
    let number = 1
    for (const entry of entries) {
      if (/^[1-9]\d*$/.test(entry)) number = Math.max(number, Number(entry) + 1)
    }
    for (;;) {
      try {
        await mkdir(join(directory, String(number)))
        return `${day}-${month}-${number}`
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error
        number += 1
      }
    }
  }
}
