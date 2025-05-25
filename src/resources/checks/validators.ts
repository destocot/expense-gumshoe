import * as v from 'valibot'

export const CreateCheckSchema = v.object({
  amount: v.pipe(
    v.string('Please enter a valid amount'),
    v.regex(/^\d*\.?\d{0,2}$/, 'Please enter a valid amount'),
    v.check((v) => parseFloat(v) > 0, 'The amount must be greater than 0'),
  ),
  description: v.optional(
    v.pipe(
      v.string('Please enter a description'),
      v.trim(),
      v.maxLength(200, 'Your description must be at most 200 characters'),
      v.transform((v) => (v.length > 0 ? v : undefined)),
    ),
  ),
})

export type CreateCheckOutput = v.InferOutput<typeof CreateCheckSchema>
