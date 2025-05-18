import 'server-only'

import { headers } from 'next/headers'
import { auth } from '@/lib/auth'

export async function authGuard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    throw new Error('Unauthorized')
  }

  return { id: session.user.id }
}
