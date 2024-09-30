'use server'

import { login } from '@/actions/login.action'
import { db } from '@/drizzle'
import { users } from '@/drizzle/schema'
import { ArgonOptions } from '@/lib/constants'
import { RegisterSchema } from '@/validators/register.validator'
import { hash } from '@node-rs/argon2'
import * as v from 'valibot'

export const createUser = async (values: unknown) => {
  const parsedValues = v.parse(RegisterSchema, values)

  const hashedPassword = await hash(parsedValues.password, ArgonOptions)

  await db
    .insert(users)
    .values({
      username: parsedValues.username,
      password: hashedPassword,
    })
    .returning({ username: users.username, password: users.password })

  await login(parsedValues)
}
