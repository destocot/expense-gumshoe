import { User, type NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { safeParse } from 'valibot'
import { LoginSchema } from './validators/login.validator'
import { db } from './drizzle'
import { lower, users } from './drizzle/schema'
import { eq } from 'drizzle-orm'
import { verify } from '@node-rs/argon2'
import { ArgonOptions } from './lib/constants'

const authConfig = {
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  pages: { signIn: '/login' },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = safeParse(LoginSchema, credentials)

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.output

          const user = await db
            .select()
            .from(users)
            .where(eq(lower(users.username), username.toLowerCase()))
            .then((res) => res[0] ?? null)

          if (!user) return null

          const passwordsMatch = await verify(
            user.password,
            password,
            ArgonOptions,
          )
          if (!passwordsMatch) return null

          return { userId: user.userId, username: user.username }
        }

        return null
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.userId
        token.username = user.username
      }

      return token
    },
    session: async ({ session, token }) => {
      session.user.userId = token.userId
      session.user.username = token.username
      return session
    },
  },
} satisfies NextAuthConfig

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)
