import * as v from 'valibot'

export const RegisterSchema = v.pipe(
  v.object({
    username: v.pipe(
      v.string('Your username must be a string.'),
      v.nonEmpty('Please enter your username.'),
      v.minLength(6, 'Your username must have 6 characters or more.'),
    ),
    password: v.pipe(
      v.string('Your password must be a string.'),
      v.nonEmpty('Please enter your password.'),
      v.minLength(6, 'Your password must have 6 characters or more.'),
    ),
    confirmPassword: v.pipe(
      v.string('Your password must be a string.'),
      v.nonEmpty('Please confirm your password.'),
    ),
  }),
  v.forward(
    v.partialCheck(
      [['password'], ['confirmPassword']],
      (input) => input.password === input.confirmPassword,
      'The two passwords do not match.',
    ),
    ['confirmPassword'],
  ),
)

export type RegisterInput = v.InferInput<typeof RegisterSchema>
