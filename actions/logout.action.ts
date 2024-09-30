'use server'

import { auth, signOut } from '@/auth.config'
import { redirect } from 'next/navigation'

export const logout = async () => {
  const session = await auth()

  if (!session) throw new Error('Unauthorized')

  await signOut({ redirect: false })

  redirect('/')
}
