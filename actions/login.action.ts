'use server'

import { redirect } from 'next/navigation'
import { signIn } from '@/auth.config'
import { validateObject } from '@/lib/utils'
import { AuthError } from 'next-auth'

export const login = async (values: unknown) => {
  let success = false

  try {
    const credentials = validateObject(values)

    await signIn('credentials', { ...credentials, redirect: false })
    success = true
  } catch (err) {
    if (err instanceof AuthError) {
      console.log('[authErr]:', err.message)
    } else {
      console.log('[err]:', err)
    }
  }

  if (success) redirect('/')
}
