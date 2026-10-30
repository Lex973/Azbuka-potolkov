import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // В Node без условия react-server пакет бросает ошибку при импорте.
      // Защиту от попадания в клиентский бандл проверяет сборка Next, не тесты.
      'server-only': fileURLToPath(new URL('./node_modules/server-only/empty.js', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'telegram-relay/src/**/*.test.ts'],
  },
})
