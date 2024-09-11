'use server'

import ExpenseModel from '@/models/Expense'
import type { Expense } from '@/models/Expense'
import { revalidatePath } from 'next/cache'

export const deleteExpense = async (expenseId: Expense['_id']) => {
  await ExpenseModel.findByIdAndDelete(expenseId)
  revalidatePath('/')
}
