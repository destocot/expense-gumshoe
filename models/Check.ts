import { Document, Schema, models, model } from 'mongoose'

export type Check = Document & {
  _id: Schema.Types.ObjectId
  userId: Schema.Types.ObjectId
  amount: number
  createdAt: Date
  updatedAt: Date
}

const CheckSchema = new Schema<Check>(
  {
    amount: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, versionKey: false },
)

const CheckModel = models.Check ?? model<Check>('Check', CheckSchema)

export default CheckModel
