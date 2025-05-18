import { usernameClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  plugins: [usernameClient()],
})

export const { signUp, signIn, signOut, useSession } = authClient
