'use server'

import ExpenseModel from '@/models/Expense'
import { revalidatePath } from 'next/cache'

export const createExpense = async (amount: number) => {
  await ExpenseModel.create({ amount })
  revalidatePath('/')
}

export const deleteExpense = async ({ id }: { id: string }) => {
  await ExpenseModel.findByIdAndDelete(id)
  revalidatePath('/')
}
