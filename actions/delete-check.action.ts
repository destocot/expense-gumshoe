'use server'

import { validateRequest } from '@/lib/validate-request'
import CheckModel, { Check } from '@/models/Check'
import ExpenseModel from '@/models/Expense'
import { revalidatePath } from 'next/cache'

export const deleteCheck = async (checkId: Check['_id']) => {
  const { user } = await validateRequest()
  if (!user) throw new Error('Unauthorized')

  const check = await CheckModel.findByIdAndDelete(checkId)

  await ExpenseModel.deleteMany({ checkId })

  revalidatePath('/')
}
