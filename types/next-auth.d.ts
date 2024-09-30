import { type SelectUser } from '@/drizzle/schema'

declare module 'next-auth' {
  interface User {
    userId: SelectUser['userId']
    username: SelectUser['username']
  }
}

import { JWT } from 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string
    username: string
  }
}
