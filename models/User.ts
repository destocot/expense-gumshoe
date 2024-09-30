// import { Document, Schema, model, models } from 'mongoose'

// export type User = Document & {
//   username: string
//   password: string
//   checkDepositBreakdown: { income: number; savings: number; other: number }
// }

// const UserSchema = new Schema<User>(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     checkDepositBreakdown: {
//       income: {
//         type: Number,
//         default: 60,
//       },
//       savings: {
//         type: Number,
//         default: 10,
//       },
//       other: {
//         type: Number,
//         default: 30,
//       },
//     },
//   } as const,
//   { versionKey: false },
// )

// const UserModel = models.User ?? model<User>('User', UserSchema)

// export default UserModel
