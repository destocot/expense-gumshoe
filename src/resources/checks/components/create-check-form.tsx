'use client'

import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form'
import { Input } from '@ui/input'
import { Button } from '@ui/button'
import { DollarSignIcon, Loader2Icon } from 'lucide-react'
import { type CreateCheckOutput, CreateCheckSchema } from '@checks/validators'
import { useRouter } from 'next/navigation'
import { Textarea } from '@ui/textarea'
import { createCheckAction } from '@checks/actions/create-check.action'

interface CreateCheckFormProps {
  onSuccess?: () => void
}

export const CreateCheckForm = ({ onSuccess }: CreateCheckFormProps) => {
  const router = useRouter()

  const form = useForm<CreateCheckOutput>({
    resolver: valibotResolver(CreateCheckSchema),
    defaultValues: { amount: '', description: '' },
  })

  async function submit(values: CreateCheckOutput) {
    const { error } = await createCheckAction(values)

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
          {form.formState.isSubmitting ? <Loader2Icon className='animate-spin' /> : 'Deposit Check'}
        </Button>
      </form>
    </Form>
  )
}
