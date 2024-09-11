'use server'

import { lucia } from '@/lib/auth'
import { validateRequest } from '@/lib/validate-request'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const logout = async () => {
  const { session } = await validateRequest()

  if (!session) throw new Error('Unauthorized')

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  )

  redirect('/login')
}
