import * as v from 'valibot'

export const CreateExpenseSchema = v.object({
  amount: v.union([
    v.pipe(
      v.string(),
      v.transform((i) => Number(i)),
      v.number(),
      v.minValue(0.01),
      v.transform((i) => i.toFixed(2)),
    ),
    v.pipe(
      v.number(),
      v.minValue(0.01),
      v.transform((i) => i.toFixed(2)),
    ),
  ]),
  type: v.picklist(
    ['expense', 'income'],
    'Your type must be either income or expense.',
  ),
  description: v.pipe(
    v.string('Your description must be a string.'),
    v.nonEmpty('Please enter your description.'),
  ),
})

export type CreateExpenseInput = v.InferInput<typeof CreateExpenseSchema>
