'use client'

import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { cn, EXPENSE_TYPES, formatCurrency } from '@/lib/utils'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form'
import { Input } from '@ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select'
import { Textarea } from '@ui/textarea'
import { Button } from '@ui/button'
import { DollarSignIcon, Loader2Icon } from 'lucide-react'
import { type EditExpenseOutput, EditExpenseSchema } from '@expenses/validators'
import type { Expense } from '@/generated/prisma'
import { editExpenseAction } from '@expenses/actions/edit-expense.action'
import { useRouter } from 'next/navigation'

interface EditExpenseFormProps {
  defaultValues: Expense
  onSuccess?: () => void
}

export const EditExpenseForm = ({ defaultValues, onSuccess }: EditExpenseFormProps) => {
  const router = useRouter()

  const form = useForm<EditExpenseOutput>({
    resolver: valibotResolver(EditExpenseSchema),
    defaultValues: {
      amount: formatCurrency(defaultValues.amount).slice(1),
      type: defaultValues.type,
      description: defaultValues.description ?? '',
      id: defaultValues.id,
    },
  })

  async function submit(values: EditExpenseOutput) {
    const { error } = await editExpenseAction(values)

    if (error) return

    router.refresh()

    if (onSuccess) {
      onSuccess()
    } else {
      router.push('/')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    {...field}
                    className='ps-6 tabular-nums'
                    onChange={(evt) => {
                      let value = evt.target.value

                      if (value.endsWith('.')) {
                        return field.onChange(evt)
                      }

                      const [int, dec] = value.split('.')
                      value = dec ? `${int}.${dec.slice(0, 2)}` : value
                      evt.target.value = value
                      return field.onChange(evt)
                    }}
                  />
                  <DollarSignIcon className='stroke-muted-foreground absolute top-1/2 left-2 size-4 -translate-y-1/2' />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <div className='relative'>
                    <SelectTrigger className='w-full'>
                      <SelectValue />
                      <div
                        className={cn(
                          'absolute top-1/2 right-12 size-4 -translate-y-1/2 rounded-full',
                          {
                            'bg-red-500': field.value === 'EXPENSE',
                            'bg-green-500': field.value === 'INCOME',
                            'bg-blue-500': field.value === 'SAVINGS',
                            'bg-yellow-500': field.value === 'OTHER',
                          },
                        )}
                      />
                    </SelectTrigger>
                  </div>
                </FormControl>

                <SelectContent>
                  {EXPENSE_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} className='resize-none' maxLength={200} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={form.formState.isSubmitting} className='w-full'>
          {form.formState.isSubmitting ? (
            <Loader2Icon className='animate-spin' />
          ) : (
            'Update Expense'
          )}
        </Button>
      </form>
    </Form>
  )
}
