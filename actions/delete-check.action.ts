'use server'

import { auth } from '@/auth.config'
import { db } from '@/drizzle'
import { checks, expenses, SelectCheck } from '@/drizzle/schema'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export const deleteCheck = async (checkId: SelectCheck['checkId']) => {
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')

  const { deletedCheckId } = await db
    .delete(checks)
    .where(
      and(eq(checks.checkId, checkId), eq(checks.userId, session.user.userId)),
    )
    .returning({ deletedCheckId: checks.checkId })
    .then((res) => res[0])

  await db.delete(expenses).where(eq(expenses.checkId, deletedCheckId))

  revalidatePath('/')
}
