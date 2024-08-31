import { Lucia } from 'lucia'
import { MongodbAdapter } from '@lucia-auth/adapter-mongodb'
import mongoose from 'mongoose'

const adapter = new MongodbAdapter(
  mongoose.connection.collection('sessions'),
  mongoose.connection.collection('users'),
)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: { secure: process.env.NODE_ENV === 'production' },
  },
  getUserAttributes: (attributes) => {
    return { username: attributes.username }
  },
})
