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
import { DollarSignIcon, Plus } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { TYPES } from '@/lib/constants'
import { capitalize } from '@/lib/utils'

const CreateExpenseForm = () => {
  const form = useForm<CreateExpenseInput>({
    resolver: valibotResolver(CreateExpenseSchema),
    reValidateMode: 'onSubmit',
    defaultValues: { amount: '' },
  })

  const submit = async (values: CreateExpenseInput) => {
    await createExpense(values)
    form.reset({ type: values.type })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className='flex flex-col gap-y-2.5'
      >
        <div className='flex items-end gap-x-2'>
          <FormField
            control={form.control}
            name='amount'
            render={({ field: { onChange, ...field } }) => (
              <FormItem className='flex-1'>
                <FormLabel className='sr-only'>Amount</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type='number'
                      step={0.01}
                      placeholder='0.00'
                      className='ps-6 [&::-webkit-inner-spin-button]:appearance-none'
                      {...field}
                      onChange={(evt) => {
                        const dec = evt.target.value.split('.')[1]
                        if (dec?.length > 2) return
                        onChange(evt)
                      }}
                    />
                    <DollarSignIcon
                      className='absolute left-1.5 top-1/2 -translate-y-1/2 text-muted-foreground'
                      size={16}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type='submit' size='icon'>
            <Plus />
          </Button>
        </div>

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
      </form>
    </Form>
  )
}
export default CreateExpenseForm
