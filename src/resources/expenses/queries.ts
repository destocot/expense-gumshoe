import { Prisma } from '@/generated/prisma'
import { prisma } from '@/lib/prisma'
import { authGuard } from '@/lib/server-utils'
import 'server-only'

export async function findOneExpense(where: Prisma.ExpenseWhereUniqueInput) {
  const loggedInUser = await authGuard()

  const expense = await prisma.expense.findUnique({
    where: { userId: +loggedInUser.id, ...where },
  })

  return { data: expense }
}
