'use server'

import ExpenseModel from '@/models/Expense'
import { revalidatePath } from 'next/cache'
import { hash, verify } from '@node-rs/argon2'
import UserModel from '@/models/User'
import { lucia } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateRequest } from './validate-request'
import * as v from 'valibot'
import { RegisterSchema } from '@/validators/register.validator'
import { LoginSchema } from '@/validators/login.validator'

export const createExpense = async (amount: number) => {
  const { user } = await validateRequest()
  if (!user) throw new Error('Unauthorized')

  await ExpenseModel.create({ amount, userId: user.id })
  revalidatePath('/')
}

export const deleteExpense = async ({ id }: { id: string }) => {
  await ExpenseModel.findByIdAndDelete(id)
  revalidatePath('/')
}

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

export const logoutUser = async () => {
  const { session } = await validateRequest()

  if (!session) throw new Error('Unauthorized')

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  )

  redirect('/login')
}
