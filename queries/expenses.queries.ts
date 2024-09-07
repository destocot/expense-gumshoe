import dbConnect from '@/lib/dbConnect'
import ExpenseModel from '@/models/Expense'

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
