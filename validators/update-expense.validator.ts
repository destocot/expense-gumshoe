import * as v from 'valibot'

export const UpdateExpenseSchema = v.object({
  amount: v.union([
    v.pipe(
      v.string(),
      v.transform((i) => Number(i)),
      v.number(),
      v.minValue(0.01),
      v.transform((i) => Number(i.toFixed(2))),
    ),
    v.pipe(
      v.number(),
      v.minValue(0.01),
      v.transform((i) => Number(i.toFixed(2))),
    ),
  ]),
  type: v.picklist(
    ['expense', 'income', 'savings', 'other'],
    'Your type must be one of: expense, income, savings, other.',
  ),
  description: v.pipe(
    v.string('Your description must be a string.'),
    v.nonEmpty('Please enter your description.'),
  ),
  expenseId: v.pipe(
    v.string(),
    v.nonEmpty('Please enter your expense ID.'),
    v.cuid2('Please enter a valid expense ID.'),
  ),
})

export type UpdateExpenseInput = v.InferInput<typeof UpdateExpenseSchema>
