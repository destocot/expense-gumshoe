'use server'

import { validateRequest } from '@/lib/validate-request'
import ExpenseModel from '@/models/Expense'
import { CreateExpenseSchema } from '@/validators/create-expense.validator'
import { revalidatePath } from 'next/cache'
import * as v from 'valibot'

export const createExpense = async (values: unknown) => {
  const { user } = await validateRequest()
  if (!user) throw new Error('Unauthorized')

  const parsedValues = v.parse(CreateExpenseSchema, values)

  await ExpenseModel.create({ ...parsedValues, userId: user.id })
  revalidatePath('/')
}
