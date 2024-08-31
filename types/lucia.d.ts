import { lucia } from '@/lib/auth'

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

type DatabaseUserAttributes = { username: string }
