import { type Options } from '@node-rs/argon2'

export const TYPES = ['income', 'expense', 'savings', 'other'] as const

export const ArgonOptions = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
} satisfies Options
