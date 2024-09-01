'use client'

import { Button } from '@/components/ui/button'
import { createExpense } from '@/lib/actions'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import {
  CreateExpenseInput,
  CreateExpenseSchema,
} from '@/validators/create-expense.validator'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Plus } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { TYPES } from '@/lib/constants'
import { capitalize } from '@/lib/utils'

const CreateExpenseForm = () => {
  const form = useForm<CreateExpenseInput>({
    resolver: valibotResolver(CreateExpenseSchema),
    reValidateMode: 'onSubmit',
  })

  const submit = async (values: CreateExpenseInput) => {
    await createExpense(values)
    form.reset({ amount: '', type: values.type })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <div className='flex items-end gap-x-2'>
          <FormField
            control={form.control}
            name='amount'
            render={({ field: { onChange, ...field } }) => (
              <FormItem className='flex-1'>
                <FormLabel className='sr-only'>Amount</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    step='0.01'
                    placeholder='Amount'
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value
                      const match = value.match(/^-?\d{0,}(\.\d{0,2})?/)
                      onChange(match ? match[0] : '')
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' size='icon'>
            <Plus />
          </Button>
        </div>
      </form>

      <FormField
        control={form.control}
        name='type'
        render={({ field }) => (
          <FormItem className='space-y-3'>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className='flex items-center space-x-1'
              >
                {TYPES.map((type) => {
                  return (
                    <FormItem
                      key={type}
                      className='flex items-center space-x-3 space-y-0'
                    >
                      <FormControl>
                        <RadioGroupItem value={type} />
                      </FormControl>
                      <FormLabel>{capitalize(type)}</FormLabel>
                    </FormItem>
                  )
                })}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  )
}
export default CreateExpenseForm
