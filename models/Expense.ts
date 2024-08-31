import { Document, Schema, models, model } from 'mongoose'

export type Expense = Document & {
  userId: Schema.Types.ObjectId
  amount: number
}

const ExpenseSchema = new Schema<Expense>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
  },
  { versionKey: false },
)

const ExpenseModel = models.Expense ?? model<Expense>('Expense', ExpenseSchema)

export default ExpenseModel
