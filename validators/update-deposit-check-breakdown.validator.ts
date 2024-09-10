import * as v from 'valibot'

const numberBetween0And100 = v.pipe(v.number(), v.minValue(0), v.maxValue(100))

export const UpdateDepositCheckBreakdownSchema = v.pipe(
  v.object({
    income: v.union([
      v.pipe(
        v.string(),
        v.transform((i) => Number(i)),
        numberBetween0And100,
      ),
      numberBetween0And100,
    ]),
    savings: v.union([
      v.pipe(
        v.string(),
        v.transform((i) => Number(i)),
        numberBetween0And100,
      ),
      numberBetween0And100,
    ]),
    other: v.union([
      v.pipe(
        v.string(),
        v.transform((i) => Number(i)),
        numberBetween0And100,
      ),
      numberBetween0And100,
    ]),
  }),
  v.forward(
    v.partialCheck(
      [['income'], ['savings'], ['other']],
      (input) => input.income + input.savings + input.other === 100,
      'The sum of income, savings, and other must equal 100.',
    ),
    ['other'],
  ),
)

export type UpdateDepositCheckBreakdownInput = v.InferInput<
  typeof UpdateDepositCheckBreakdownSchema
>
