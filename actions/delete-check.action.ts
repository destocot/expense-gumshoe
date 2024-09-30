'use server'

import { auth } from '@/auth.config'
import CheckModel, { Check } from '@/models/Check'
import ExpenseModel from '@/models/Expense'
import { revalidatePath } from 'next/cache'

export const deleteCheck = async (checkId: Check['_id']) => {
  const session = await auth()

  if (!session) throw new Error('Unauthorized')
  const check = await CheckModel.findByIdAndDelete(checkId)

  await ExpenseModel.deleteMany({ checkId })

  revalidatePath('/')
}
