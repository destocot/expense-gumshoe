'use server'

import { db } from '@/drizzle'
import { expenses, SelectExpense } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export const deleteExpense = async (expenseId: SelectExpense['expenseId']) => {
  await db.delete(expenses).where(eq(expenses.expenseId, expenseId))

  revalidatePath('/')
}
