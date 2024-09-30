import 'server-only'

import { db } from '@/drizzle'
import {
  expenses,
  SelectCheck,
  SelectExpense,
  type SelectUser,
} from '@/drizzle/schema'
import { and, between, desc, eq, sql } from 'drizzle-orm'
import { auth } from '@/auth.config'

export const findAllExpenses = async (
  userId: SelectUser['userId'],
  options: { time?: 'day' | 'week' | 'month' },
): Promise<Array<SelectExpense>> => {
  const session = await auth()
  if (session?.user?.userId !== userId) {
    throw new Error('Unauthorized')
  }

  const conditions = [eq(expenses.userId, userId)]

  const time = options?.time

  if (time) {
    let startDate = sql`date('now', 'weekday 0', '-7 days')`
    let endDate = sql`date('now', 'weekday 0', '-1 days')`
    if (time === 'day') {
      startDate = sql`date('now', 'start of day')`
      endDate = sql`date('now', 'start of day', '+1 day')`
    }

    if (time === 'month') {
      startDate = sql`date('now', 'start of month')`
      endDate = sql`datetime('now', 'start of month', '+1 month', '-1 second')`
    }

    conditions.push(between(expenses.createdAt, startDate, endDate))
  }

  return await db
    .select()
    .from(expenses)
    .where(and(...conditions))
    .orderBy(desc(expenses.createdAt))
}

export const findOneExpense = async (
  userId: SelectUser['userId'],
  expenseId: SelectExpense['expenseId'],
): Promise<SelectExpense | null> => {
  const session = await auth()
  if (session?.user?.userId !== userId) {
    throw new Error('Unauthorized')
  }

  return await db
    .select()
    .from(expenses)
    .where(and(eq(expenses.userId, userId), eq(expenses.expenseId, expenseId)))
    .then((res) => res[0] ?? null)
}

export const getExpenseBalance = async () => {
  const session = await auth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  return await db
    .select({
      total: sql<number>`
        sum(
          case 
            when ${expenses.type} = 'income' then ${expenses.amount} 
            when ${expenses.type} = 'expense' then -${expenses.amount}
            else 0
          end
        )`,
    })
    .from(expenses)
    .then((res) => res[0]?.total ?? 0)
}

export const findOneExpenseByCheckId = async (
  checkId: SelectCheck['checkId'],
): Promise<Array<SelectExpense>> => {
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')

  return await db
    .select()
    .from(expenses)
    .where(
      and(
        eq(expenses.checkId, checkId),
        eq(expenses.userId, session.user.userId),
      ),
    )
}
