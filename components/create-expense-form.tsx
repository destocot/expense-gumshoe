'use client'

import { Button } from '@/components/ui/button'
import { createExpense } from '@/lib/actions'
import { Input } from '@/components/ui/input'
import * as v from 'valibot'
import { useRef } from 'react'

const CreateExpenseSchema = v.object({
  amount: v.pipe(v.string(), v.transform(Number), v.number(), v.minValue(0)),
})

const CreateExpenseForm = () => {
  const ref = useRef<HTMLFormElement>(null)

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const formData = new FormData(evt.target as HTMLFormElement)
    const values = Object.fromEntries(formData)

    const parsedValues = v.parse(CreateExpenseSchema, values)
    await createExpense(parsedValues.amount)
    ref.current?.reset()
  }

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit}
      className='flex items-center gap-x-2'
    >
      <Input type='number' step='0.01' min='0' name='amount' />
      <Button type='submit' size='sm'>
        Add Expense
      </Button>
    </form>
  )
}
export default CreateExpenseForm
