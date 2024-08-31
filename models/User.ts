import { Document, Schema, model, models } from 'mongoose'

export type User = Document & {
  username: string
  password: string
}

const UserSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  } as const,
  { versionKey: false },
)

const UserModel = models.User ?? model<User>('User', UserSchema)

export default UserModel
