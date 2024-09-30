'use server'

import { parse } from 'valibot'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth.config'
import { db } from '@/drizzle'
import { expenses } from '@/drizzle/schema'
import { UpdateExpenseSchema } from '@/validators/update-expense.validator'
import { eq } from 'drizzle-orm'

export const updateExpense = async (values: unknown) => {
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')

  const parsedValues = parse(UpdateExpenseSchema, values)

  await db
    .update(expenses)
    .set(parsedValues)
    .where(eq(expenses.expenseId, parsedValues.expenseId))

  revalidatePath('/')
}
