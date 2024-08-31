import { Document, model, models, Schema } from 'mongoose'

export type Session = Document & {
  userId: Schema.Types.ObjectId
  expiresAt: Date
}

const Session = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  } as const,
  { versionKey: false },
)

const SessionModel = models.Session ?? model<Session>('Session', Session)

export default SessionModel
