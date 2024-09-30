'use server'

import ExpenseModel, { Expense } from '@/models/Expense'
import { revalidatePath } from 'next/cache'
import * as v from 'valibot'
import { DepositCheckSchema } from '@/validators/deposit-check.validator'
import CheckModel from '@/models/Check'
import { UpdateDepositCheckBreakdownSchema } from '@/validators/update-deposit-check-breakdown.validator'
// import UserModel from '@/models/User'
import { auth } from '@/auth.config'

export const updateDepositCheckBreakdown = async (values: unknown) => {
  const session = await auth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const parsedValues = v.parse(UpdateDepositCheckBreakdownSchema, values)

  // await UserModel.findByIdAndUpdate(user.id, {
  //   checkDepositBreakdown: parsedValues,
  // })

  revalidatePath('/dashboard')
}

export const depositCheck = async (values: unknown) => {
  const session = await auth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const parsedValues = v.parse(DepositCheckSchema, values)

  const amount = parseFloat(parsedValues.amount)

  // const newCheck = await CheckModel.create({ amount, userId: authUser.id })

  // const user = await UserModel.findById(authUser.id)

  // const incomeAmount =
  //   newCheck.amount * (user.checkDepositBreakdown.income / 100)
  // const savingsAmount =
  //   newCheck.amount * (user.checkDepositBreakdown.savings / 100)
  // const otherAmount = newCheck.amount * (user.checkDepositBreakdown.other / 100)

  // const expenses: Array<
  //   Pick<Expense, 'type' | 'amount' | 'description' | 'userId' | 'checkId'>
  // > = [
  //   {
  //     type: 'income',
  //     amount: incomeAmount,
  //     description: `Check deposit ${newCheck.id}`,
  //     userId: authUser.id,
  //     checkId: newCheck.id,
  //   },
  //   {
  //     type: 'savings',
  //     amount: savingsAmount,
  //     description: `Check deposit ${newCheck.id}`,
  //     userId: authUser.id,
  //     checkId: newCheck.id,
  //   },
  //   {
  //     type: 'other',
  //     amount: otherAmount,
  //     description: `Check deposit ${newCheck.id}`,
  //     userId: authUser.id,
  //     checkId: newCheck.id,
  //   },
  // ]

  // await ExpenseModel.create(expenses)
  revalidatePath('/')
}
