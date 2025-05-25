'use server'

import { authGuard } from '@/lib/server-utils'
import { revalidatePath } from 'next/cache'

export async function editCheckBreakdownAction(prevState: undefined, formData: FormData) {
  const loggedInUser = await authGuard()

  console.log(formData, loggedInUser.id)

  revalidatePath('/')

  return undefined
}
