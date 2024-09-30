'use server'

import { revalidatePath } from 'next/cache'
import { parse } from 'valibot'
import { eq } from 'drizzle-orm'
import { DepositCheckSchema } from '@/validators/deposit-check.validator'
import { UpdateDepositCheckBreakdownSchema } from '@/validators/update-deposit-check-breakdown.validator'
import { auth } from '@/auth.config'
import { db } from '@/drizzle'
import { checks, expenses, InferExpense, users } from '@/drizzle/schema'

export const updateDepositCheckBreakdown = async (values: unknown) => {
  const session = await auth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const parsedValues = parse(UpdateDepositCheckBreakdownSchema, values)

  await db
    .update(users)
    .set({ checkDepositBreakdown: parsedValues })
    .where(eq(users.userId, session.user.userId))

  revalidatePath('/dashboard')
}

export const depositCheck = async (values: unknown) => {
  const session = await auth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const parsedValues = parse(DepositCheckSchema, values)

  const amount = parsedValues.amount

  const newCheck = await db
    .insert(checks)
    .values({
      amount,
      userId: session.user.userId,
    })
    .returning({ checkId: checks.checkId, amount: checks.amount })
    .then((res) => res[0])

  const { checkDepositBreakdown } = await db
    .select({ checkDepositBreakdown: users.checkDepositBreakdown })
    .from(users)
    .where(eq(users.userId, session.user.userId))
    .then((res) => res[0])

  const newExpenses: Array<InferExpense> = [
    {
      type: 'income',
      amount: newCheck.amount * (checkDepositBreakdown.income / 100),
      description: `Check deposit ${newCheck.checkId}`,
      userId: session.user.userId,
      checkId: newCheck.checkId,
    },
    {
      type: 'savings',
      amount: newCheck.amount * (checkDepositBreakdown.savings / 100),
      description: `Check deposit ${newCheck.checkId}`,
      userId: session.user.userId,
      checkId: newCheck.checkId,
    },
    {
      type: 'other',
      amount: newCheck.amount * (checkDepositBreakdown.other / 100),
      description: `Check deposit ${newCheck.checkId}`,
      userId: session.user.userId,
      checkId: newCheck.checkId,
    },
  ]

  await db.insert(expenses).values(newExpenses)

  revalidatePath('/')
}
