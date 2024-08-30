import { Document, Schema, model, models } from 'mongoose'

export type User = Document & { _id: string }

const UserSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
  } as const,
  { _id: false, versionKey: false },
)

const UserModel = models.User ?? model<User>('User', UserSchema)

export default UserModel
