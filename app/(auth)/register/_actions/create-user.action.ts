'use server'

import { lucia } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/models/User'
import { RegisterSchema } from '@/validators/register.validator'
import { hash } from '@node-rs/argon2'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import * as v from 'valibot'

export const createUser = async (values: unknown) => {
  const parsedValues = v.parse(RegisterSchema, values)

  const hashedPassword = await hash(parsedValues.password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  })

  await dbConnect()
  const newUser = await UserModel.create({
    username: parsedValues.username,
    password: hashedPassword,
  })

  await createSession(newUser._id)
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
