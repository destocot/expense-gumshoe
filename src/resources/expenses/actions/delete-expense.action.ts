'use server'

import { prisma } from '@/lib/prisma'
import { authGuard } from '@/lib/server-utils'
import { revalidatePath } from 'next/cache'

export async function deleteExpenseAction(expenseId: number) {
  const loggedInUser = await authGuard()

  await prisma.expense.delete({
    where: { id: expenseId, profileId: +loggedInUser.id },
  })

  revalidatePath('/')
}
