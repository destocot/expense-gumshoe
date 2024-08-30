import { Document, model, models, Schema } from 'mongoose'

export type Session = Document & {
  _id: string
  user_id: string
  expires_at: Date
}

const Session = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    expires_at: {
      type: Date,
      required: true,
    },
  } as const,
  { _id: false, versionKey: false },
)

const SessionModel = models.Session ?? model<Session>('Session', Session)

export default SessionModel
