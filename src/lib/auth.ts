import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from '@/lib/prisma'
import { username } from 'better-auth/plugins'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'sqlite',
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 6,
  },
  cookieCache: {
    enabled: true,
    maxAge: 5 * 60,
  },
  advanced: {
    database: {
      useNumberId: true,
    },
  },
  plugins: [username()],
})
