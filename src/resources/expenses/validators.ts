import { EXPENSE_TYPES } from '@/lib/utils'
import * as v from 'valibot'

export const CreateExpenseSchema = v.object({
  amount: v.pipe(
    v.string('Please enter a valid amount'),
    v.regex(/^\d*\.?\d{0,2}$/, 'Please enter a valid amount'),
    v.check((v) => parseFloat(v) > 0, 'The amount must be greater than 0'),
  ),
  type: v.picklist(EXPENSE_TYPES, 'Please select a valid option'),
  description: v.optional(
    v.pipe(
      v.string('Please enter a description'),
      v.trim(),
      v.maxLength(200, 'Your description must be at most 200 characters'),
      v.transform((v) => (v.length > 0 ? v : undefined)),
    ),
  ),
  checkId: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))),
})

// TODO: update at least one field
export const EditExpenseSchema = v.object({
  ...CreateExpenseSchema.entries,
  id: v.pipe(v.number(), v.integer(), v.minValue(0)),
})

export type CreateExpenseOutput = v.InferOutput<typeof CreateExpenseSchema>
export type EditExpenseOutput = v.InferOutput<typeof EditExpenseSchema>
