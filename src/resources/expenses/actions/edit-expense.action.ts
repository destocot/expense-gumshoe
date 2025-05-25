'use server'

import { prisma } from '@/lib/prisma'
import { authGuard } from '@/lib/server-utils'
import { EditExpenseSchema, EditExpenseOutput } from '@expenses/validators'
import { revalidatePath } from 'next/cache'
import { flatten, safeParse } from 'valibot'

export async function editExpenseAction(values: EditExpenseOutput) {
  const loggedInUser = await authGuard()

  const parsedValues = safeParse(EditExpenseSchema, values)

  if (!parsedValues.success) {
    return { error: flatten<typeof EditExpenseSchema>(parsedValues.issues) }
  }

  const { amount, type, description, id } = parsedValues.output

  await prisma.expense.update({
    where: { id, profileId: +loggedInUser.id },
    data: {
      ...(amount ? { amount: parseFloat(amount) * 100 } : {}),
      ...(type ? { type } : {}),
      ...(description ? { description } : {}),
    },
  })

  revalidatePath('/')

  return { error: null }
}
