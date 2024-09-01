'use server'

import ExpenseModel from '@/models/Expense'
import { revalidatePath } from 'next/cache'
import { lucia } from '@/lib/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateRequest } from './validate-request'
import * as v from 'valibot'
import { CreateExpenseSchema } from '@/validators/create-expense.validator'

export const createExpense = async (values: unknown) => {
  const { user } = await validateRequest()
  if (!user) throw new Error('Unauthorized')

  const parsedValues = v.parse(CreateExpenseSchema, values)

  await ExpenseModel.create({ ...parsedValues, userId: user.id })
  revalidatePath('/')
}

export const deleteExpense = async ({ id }: { id: string }) => {
  await ExpenseModel.findByIdAndDelete(id)
  revalidatePath('/')
}

export const logoutUser = async () => {
  const { session } = await validateRequest()

  if (!session) throw new Error('Unauthorized')

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  )

  redirect('/login')
}
