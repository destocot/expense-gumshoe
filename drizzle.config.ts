import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'
import type { Config } from 'drizzle-kit'

config({ path: '.env.local' })

const TURSO_CONNECTION_URL = process.env.TURSO_CONNECTION_URL
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN

if (!TURSO_CONNECTION_URL) {
  throw new Error('TURSO_CONNECTION_URL is required')
}

if (!TURSO_AUTH_TOKEN) {
  throw new Error('TURSO_AUTH_TOKEN is required')
}

const drizzleConfig = {
  schema: './drizzle/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: TURSO_CONNECTION_URL,
    authToken: TURSO_AUTH_TOKEN,
  },
} satisfies Config

export default defineConfig(drizzleConfig)
