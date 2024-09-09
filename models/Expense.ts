import { Document, Schema, models, model } from 'mongoose'
import { TYPES } from '@/lib/constants'

export type Expense = {
  _id: string
  userId: string
  checkId?: string
  amount: number
  type: (typeof TYPES)[number]
  description: string
  createdAt: Date
  updatedAt: Date
}

const ExpenseSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    checkId: { type: Schema.Types.ObjectId, ref: 'Check' },
    amount: { type: Number, required: true },
    type: { type: String, enum: TYPES, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        ret._id = ret._id.toString()
        ret.userId = ret.userId.toString()
        if (ret.checkId) {
          ret.checkId = ret.checkId.toString()
        }
        return ret
      },
    },
  },
)

const ExpenseModel = models.Expense ?? model<Expense>('Expense', ExpenseSchema)

export default ExpenseModel
