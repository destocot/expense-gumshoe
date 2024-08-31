'use server'

import ExpenseModel from '@/models/Expense'
import { revalidatePath } from 'next/cache'
import { hash } from '@node-rs/argon2'
import UserModel from '@/models/User'
import { lucia } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import { cookies } from 'next/headers'

export const createExpense = async (amount: number) => {
  await ExpenseModel.create({ amount })
  revalidatePath('/')
}

export const deleteExpense = async ({ id }: { id: string }) => {
  await ExpenseModel.findByIdAndDelete(id)
  revalidatePath('/')
}

export const createUser = async (formData: FormData) => {
  'use server'
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  const hashedPassword = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  })

  await dbConnect()
  const newUser = await UserModel.create({ username, password: hashedPassword })
  const newUserId = newUser._id

  const session = await lucia.createSession(newUserId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)

  const cookieStore = cookies()

  cookieStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  )
}
