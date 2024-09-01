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
})

export type CreateExpenseInput = v.InferInput<typeof CreateExpenseSchema>
