'use server'

import { auth } from '@/auth.config'
import { db } from '@/drizzle'
import { expenses } from '@/drizzle/schema'
import { CreateExpenseSchema } from '@/validators/create-expense.validator'
import { revalidatePath } from 'next/cache'
import { parse } from 'valibot'

export const createExpense = async (values: unknown) => {
  const session = await auth()
  if (!session?.user?.userId) {
    throw new Error('Unauthorized')
  }

  const parsedValues = parse(CreateExpenseSchema, values)

  await db.insert(expenses).values({
    ...parsedValues,
    userId: session.user.userId,
  })

  revalidatePath('/')
}
