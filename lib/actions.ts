'use server'

import ExpenseModel, { Expense } from '@/models/Expense'
import { revalidatePath } from 'next/cache'
import { lucia } from '@/lib/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateRequest } from './validate-request'
import * as v from 'valibot'
import { CreateExpenseSchema } from '@/validators/create-expense.validator'
import { UpdateExpenseSchema } from '@/validators/update-expense.validator'
import { DepositCheckSchema } from '@/validators/deposit-check.validator'
import CheckModel from '@/models/Check'
import { UpdateDepositCheckBreakdownSchema } from '@/validators/update-deposit-check-breakdown.validator'
import UserModel from '@/models/User'

export const createExpense = async (values: unknown) => {
  const { user } = await validateRequest()
  if (!user) throw new Error('Unauthorized')

  const parsedValues = v.parse(CreateExpenseSchema, values)

  await ExpenseModel.create({ ...parsedValues, userId: user.id })
  revalidatePath('/')
}

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

export const updateDepositCheckBreakdown = async (values: unknown) => {
  const { user } = await validateRequest()
  if (!user) throw new Error('Unauthorized')

  const parsedValues = v.parse(UpdateDepositCheckBreakdownSchema, values)

  await UserModel.findByIdAndUpdate(user.id, {
    checkDepositBreakdown: parsedValues,
  })

  revalidatePath('/dashboard')
}

export const depositCheck = async (values: unknown) => {
  const { user: authUser } = await validateRequest()
  if (!authUser) throw new Error('Unauthorized')

  const parsedValues = v.parse(DepositCheckSchema, values)

  const amount = parseFloat(parsedValues.amount)

  const newCheck = await CheckModel.create({ amount, userId: authUser.id })

  const user = await UserModel.findById(authUser.id)

  const incomeAmount =
    newCheck.amount * (user.checkDepositBreakdown.income / 100)
  const savingsAmount =
    newCheck.amount * (user.checkDepositBreakdown.savings / 100)
  const otherAmount = newCheck.amount * (user.checkDepositBreakdown.other / 100)

  const expenses: Array<
    Pick<Expense, 'type' | 'amount' | 'description' | 'userId' | 'checkId'>
  > = [
    {
      type: 'income',
      amount: incomeAmount,
      description: `Check deposit ${newCheck.id}`,
      userId: authUser.id,
      checkId: newCheck.id,
    },
    {
      type: 'savings',
      amount: savingsAmount,
      description: `Check deposit ${newCheck.id}`,
      userId: authUser.id,
      checkId: newCheck.id,
    },
    {
      type: 'other',
      amount: otherAmount,
      description: `Check deposit ${newCheck.id}`,
      userId: authUser.id,
      checkId: newCheck.id,
    },
  ]

  await ExpenseModel.create(expenses)
  revalidatePath('/')
}
