import * as v from 'valibot'

export const DepositCheckSchema = v.object({
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
})

export type DepositCheckInput = v.InferInput<typeof DepositCheckSchema>
