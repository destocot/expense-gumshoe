'use server'

import { prisma } from '@/lib/prisma'
import { authGuard } from '@/lib/server-utils'
import { revalidatePath } from 'next/cache'
import { flatten, safeParse } from 'valibot'
import { type CreateCheckOutput, CreateCheckSchema } from '@checks/validators'
import { createExpenseAction } from '@expenses/actions/create-expense.action'
import { Profile } from '@profiles/types'

export async function createCheckAction(values: CreateCheckOutput) {
  const loggedInUser = await authGuard()

  const parsedValues = safeParse(CreateCheckSchema, values)

  if (!parsedValues.success) {
    return { error: flatten<typeof CreateCheckSchema>(parsedValues.issues) }
  }

  const { amount, description } = parsedValues.output

  const check = await prisma.check.create({
    data: {
      amount: parseFloat(amount) * 100,
      ...(description ? { description } : {}),
      profileId: +loggedInUser.id,
    },
    select: { id: true, amount: true, profile: { select: { checkBreakdown: true } } },
  })

  const { income, other } = check.profile.checkBreakdown as Profile['checkBreakdown']
  const incomeAmount = Math.round(check.amount * income)
  const otherAmount = Math.round(check.amount * other)
  const savingsAmount = check.amount - incomeAmount - otherAmount

  const expenseDescription = `for check #${check.id.toString().padStart(5, '0')}`

  await Promise.all([
    createExpenseAction({
      type: 'INCOME',
      amount: (incomeAmount / 100).toFixed(2),
      description: expenseDescription,
      checkId: check.id,
    }),
    createExpenseAction({
      type: 'OTHER',
      amount: (otherAmount / 100).toFixed(2),
      description: expenseDescription,
      checkId: check.id,
    }),
    createExpenseAction({
      type: 'SAVINGS',
      amount: (savingsAmount / 100).toFixed(2),

      description: expenseDescription,
      checkId: check.id,
    }),
  ])

  revalidatePath('/')

  return { error: null }
}
