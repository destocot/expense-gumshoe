import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from '@/lib/prisma'
import { username } from 'better-auth/plugins'
import { createProfile } from '@profiles/queries'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'sqlite',
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 6,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  advanced: {
    database: {
      useNumberId: true,
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await createProfile({
            user: { connect: { id: +user.id } },
            checkBreakdown: { income: 0.34, savings: 0.33, other: 0.33 },
          })
        },
      },
    },
  },
  plugins: [username()],
})
