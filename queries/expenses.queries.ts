import dbConnect from '@/lib/dbConnect'
import ExpenseModel from '@/models/Expense'

export const findIncomeAndExpenseByUserId = async (userId: string) => {
  await dbConnect()

  const expenseDocs = await ExpenseModel.find({
    userId,
    type: { $in: ['income', 'expense'] },
  }).sort({
    createdAt: -1,
  })

  const expenses = expenseDocs.map((doc) =>
    doc.toObject({ flattenObjectIds: true }),
  )

  return expenses
}

export const findAllExpensesByUserId = async (userId: string) => {
  await dbConnect()

  const expenseDocs = await ExpenseModel.find({ userId }).sort({
    createdAt: -1,
  })

  const expenses = expenseDocs.map((doc) =>
    doc.toObject({ flattenObjectIds: true }),
  )

  return expenses
}
