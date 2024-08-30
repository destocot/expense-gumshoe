import { Document, Schema, models, model } from 'mongoose'

export type Expense = Document & { amount: number }

const ExpenseSchema = new Schema<Expense>(
  {
    amount: { type: Number, required: true },
  },
  { versionKey: false },
)

const ExpenseModel = models.Expense ?? model<Expense>('Expense', ExpenseSchema)

export default ExpenseModel
