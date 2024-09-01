'use server'

import dbConnect from '@/lib/dbConnect'
import UserModel from '@/models/User'
import { LoginSchema } from '@/validators/login.validator'
import { verify } from '@node-rs/argon2'
import { redirect } from 'next/navigation'
import * as v from 'valibot'
import { lucia } from '@/lib/auth'
import { cookies } from 'next/headers'

export const login = async (values: unknown) => {
  const parsedValues = v.parse(LoginSchema, values)

  await dbConnect()
  const existingUser = await UserModel.findOne({
    username: parsedValues.username,
  })

  if (!existingUser) throw new Error('User not found')

  const isValidPassword = await verify(
    existingUser.password,
    parsedValues.password,
    {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    },
  )

  if (!isValidPassword) throw new Error('Invalid password')

  await createSession(existingUser._id)
  redirect('/')
}

const createSession = async (userId: string) => {
  const session = await lucia.createSession(userId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  )
}
