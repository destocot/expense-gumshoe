'use server'

import { auth } from '@/auth.config'
import ExpenseModel from '@/models/Expense'
import { UpdateExpenseSchema } from '@/validators/update-expense.validator'
import { revalidatePath } from 'next/cache'
import * as v from 'valibot'

export const updateExpense = async (values: unknown) => {
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')

  const parsedValues = v.parse(UpdateExpenseSchema, values)

  await ExpenseModel.findByIdAndUpdate(parsedValues._id, {
    ...parsedValues,
    userId: session.user.userId,
  })
  revalidatePath('/')
}
