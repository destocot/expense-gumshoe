'use server'

import { prisma } from '@/lib/prisma'
import { authGuard } from '@/lib/server-utils'
import { CreateExpenseOutput, CreateExpenseSchema } from '@expenses/validators'
import { revalidatePath } from 'next/cache'
import { flatten, safeParse } from 'valibot'

export async function createExpenseAction(values: CreateExpenseOutput) {
  const loggedInUser = await authGuard()

  const parsedValues = safeParse(CreateExpenseSchema, values)

  if (!parsedValues.success) {
    return { error: flatten<typeof CreateExpenseSchema>(parsedValues.issues) }
  }

  const { amount, type, description, checkId } = parsedValues.output

  await prisma.expense.create({
    data: {
      amount: parseFloat(amount) * 100,
      type,
      ...(description ? { description } : {}),
      profileId: +loggedInUser.id,
      ...(checkId ? { checkId } : {}),
    },
  })

  revalidatePath('/')

  return { error: null }
}
