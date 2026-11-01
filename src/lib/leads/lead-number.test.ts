import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

import { createLeadNumberAllocator } from './lead-number'

const roots: string[] = []
async function root() {
  const path = await mkdtemp(join(tmpdir(), 'lead-number-'))
  roots.push(path)
  return path
}
afterEach(async () => {
  await Promise.all(roots.splice(0).map((path) => rm(path, { recursive: true, force: true })))
})

describe('daily lead numbers', () => {
  it('uses Novosibirsk midnight, resets daily and keeps the year in storage', async () => {
    const allocate = createLeadNumberAllocator(await root())
    expect(await allocate(new Date('2026-11-01T16:59:59Z'))).toBe('01-11-1')
    expect(await allocate(new Date('2026-11-01T16:59:59Z'))).toBe('01-11-2')
    expect(await allocate(new Date('2026-11-01T17:00:00Z'))).toBe('02-11-1')
    expect(await allocate(new Date('2027-11-01T00:00:00Z'))).toBe('01-11-1')
  })

  it('survives allocator restarts and concurrent independent allocators', async () => {
    const path = await root()
    const date = new Date('2026-11-01T00:00:00Z')
    expect(await createLeadNumberAllocator(path)(date)).toBe('01-11-1')
    const numbers = await Promise.all(
      Array.from({ length: 20 }, () => createLeadNumberAllocator(path)(date)),
    )
    expect(new Set(numbers).size).toBe(20)
    expect(await createLeadNumberAllocator(path)(date)).toBe('01-11-22')
  })

  it('fails instead of silently resetting when storage is unavailable', async () => {
    const path = join(await root(), 'file')
    await writeFile(path, 'not a directory')
    await expect(createLeadNumberAllocator(path)(new Date())).rejects.toThrow()
  })
})
