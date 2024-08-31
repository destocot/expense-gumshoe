import * as v from 'valibot'

export const LoginSchema = v.object({
  username: v.pipe(
    v.string('Your username must be a string.'),
    v.nonEmpty('Please enter your username.'),
  ),
  password: v.pipe(
    v.string('Your password must be a string.'),
    v.nonEmpty('Please enter your password.'),
  ),
})

export type LoginInput = v.InferInput<typeof LoginSchema>
