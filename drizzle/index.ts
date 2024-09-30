import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from './schema'

const TURSO_CONNECTION_URL = process.env.TURSO_CONNECTION_URL
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN

if (!TURSO_CONNECTION_URL) {
  throw new Error('TURSO_CONNECTION_URL is required')
}

if (!TURSO_AUTH_TOKEN) {
  throw new Error('TURSO_AUTH_TOKEN is required')
}

const client = createClient({
  url: TURSO_CONNECTION_URL,
  authToken: TURSO_AUTH_TOKEN,
})

export const db = drizzle(client, { schema })
