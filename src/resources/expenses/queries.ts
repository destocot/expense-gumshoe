import 'server-only'
import { Prisma } from '@/generated/prisma'
import { prisma } from '@/lib/prisma'
import { authGuard } from '@/lib/server-utils'

export async function findOneExpense(where: Prisma.ExpenseWhereUniqueInput) {
  const loggedInUser = await authGuard()

  const expense = await prisma.expense.findUnique({
    where: { profileId: +loggedInUser.id, ...where },
  })

  return { data: expense }
}

export async function findAllExpenses(opts: Prisma.ExpenseFindManyArgs = {}) {
  await authGuard()

  const { where, orderBy, ...rest } = opts

  const expenses = await prisma.expense.findMany({
    where,
    orderBy: { createdAt: 'desc', ...orderBy },
    ...rest,
  })

  return { data: expenses }
}
