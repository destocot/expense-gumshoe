import * as v from 'valibot'

export const EmailSchema = v.pipe(
  v.string('Please enter your email'),
  v.nonEmpty('Please enter your email'),
  v.email('The email is badly formatted'),
)

export const LoginSchema = v.object({
  usernameOrEmail: v.pipe(
    v.string('Please enter your username or email'),
    v.nonEmpty('Please enter your username or email'),
  ),
  password: v.pipe(
    v.string('Please enter your password'),
    v.nonEmpty('Please enter your password'),
  ),
})

export const RegisterSchema = v.object({
  email: v.string(),
  name: v.optional(v.string(), ''),
  password: v.string(),
  username: v.string(),
})

export type LoginSchemaErrors = v.FlatErrors<typeof LoginSchema>['nested']
export type RegisterSchemaErrors = v.FlatErrors<typeof RegisterSchema>['nested']
