import { Schema, models, model } from 'mongoose'

export type Check = {
  _id: string
  userId: string
  amount: number
  createdAt: Date
  updatedAt: Date
}

const CheckSchema = new Schema(
  {
    amount: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        ret._id = ret._id.toString()
        ret.userId = ret.userId.toString()
        return ret
      },
    },
  },
)

const CheckModel = models.Check ?? model<Check>('Check', CheckSchema)

export default CheckModel
