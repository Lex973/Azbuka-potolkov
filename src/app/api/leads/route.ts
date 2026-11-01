import { siteConfig } from '@/config/site'
import { createLeadHandler } from '@/lib/leads/handle-lead-request'
import { createLeadNumberAllocator } from '@/lib/leads/lead-number'
import { readTelegramConfig, sendTelegramMessage } from '@/lib/leads/telegram'

/** Приём заявок с форм сайта. Архитектура и запуск — LEAD_FORMS.md. */
export const POST = createLeadHandler({
  siteUrl: siteConfig.url,
  allocateNumber: createLeadNumberAllocator(process.env.LEAD_NUMBER_DIR || '.lead-data'),
  allowedOrigins: (process.env.LEAD_ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  allowLocalhost: process.env.NODE_ENV === 'development',
  // Переменные читаются при каждой заявке, а не при сборке.
  readConfig: () => readTelegramConfig(process.env),
  send: (text, config) => sendTelegramMessage(text, config),
  log: (entry) => {
    const line = JSON.stringify({ time: new Date().toISOString(), ...entry })
    if (entry.result === 'failed' || entry.result === 'not_configured') console.error(line)
    else console.info(line)
  },
})
