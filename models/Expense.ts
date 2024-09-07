import { Document, Schema, models, model } from 'mongoose'
import { TYPES } from '@/lib/constants'

export type Expense = Document & {
  _id: Schema.Types.ObjectId
  userId: Schema.Types.ObjectId
  amount: number
  type: (typeof TYPES)[number]
  description: string
  createdAt: Date
  updatedAt: Date
}

const ExpenseSchema = new Schema<Expense>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: TYPES, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
)

const ExpenseModel = models.Expense ?? model<Expense>('Expense', ExpenseSchema)

export default ExpenseModel
