'use server'

import { validateRequest } from '@/lib/validate-request'
import ExpenseModel from '@/models/Expense'
import { UpdateExpenseSchema } from '@/validators/update-expense.validator'
import { revalidatePath } from 'next/cache'
import * as v from 'valibot'

export const updateExpense = async (values: unknown) => {
  const { user } = await validateRequest()
  if (!user) throw new Error('Unauthorized')

  const parsedValues = v.parse(UpdateExpenseSchema, values)

  await ExpenseModel.findByIdAndUpdate(parsedValues._id, {
    ...parsedValues,
    userId: user.id,
  })
  revalidatePath('/')
}
