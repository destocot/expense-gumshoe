import dbConnect from '@/lib/dbConnect'
import { validateRequest } from '@/lib/validate-request'
import ExpenseModel, { Expense } from '@/models/Expense'
import { redirect } from 'next/navigation'

export const findExpenses = async (options?: {
  time?: 'day' | 'week' | 'month'
}): Promise<Array<Expense>> => {
  const { user: authUser } = await validateRequest()
  if (!authUser) redirect('/login')

  const filter = { userId: authUser.id }

  if (options?.time) {
    const time = options.time

    const now = new Date()
    let startDate

    switch (time.toLowerCase()) {
      case 'day':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        break
      case 'week':
        startDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - (now.getDay() || 7),
        )
        break
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        break
    }

    // @ts-ignore
    filter.createdAt = { $gte: startDate, $lt: now }
  }

  await dbConnect()

  const expenseDocs = await ExpenseModel.find(filter).sort({
    createdAt: -1,
  })

  const expenses: Array<Expense> = expenseDocs.map((doc) => doc.toJSON())

  return expenses
}

export const findExpensesByCheckId = async (checkId: string) => {
  const { user: authUser } = await validateRequest()
  if (!authUser) redirect('/login')

  await dbConnect()

  const expenseDocs = await ExpenseModel.find({ checkId, userId: authUser.id })

  const expenses: Array<Expense> = expenseDocs.map((doc) => doc.toJSON())

  return expenses
}
