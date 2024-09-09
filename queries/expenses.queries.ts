import dbConnect from '@/lib/dbConnect'
import { validateRequest } from '@/lib/validate-request'
import ExpenseModel, { Expense } from '@/models/Expense'
import { redirect } from 'next/navigation'

export const findExpenses = async (): Promise<Array<Expense>> => {
  const { user: authUser } = await validateRequest()
  if (!authUser) redirect('/login')

  await dbConnect()

  const expenseDocs = await ExpenseModel.find({
    userId: authUser.id,
  }).sort({
    createdAt: -1,
  })

  const expenses: Array<Expense> = expenseDocs.map((doc) => doc.toJSON())

  return expenses
}
