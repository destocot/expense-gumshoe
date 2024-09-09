'use client'

import { Button } from '@/components/ui/button'
import { updateExpense } from '@/lib/actions'
import { cn } from '@/lib/utils'
import { PencilIcon } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Expense } from '@/models/Expense'
import { DialogDescription } from '@radix-ui/react-dialog'
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
import { valibotResolver } from '@hookform/resolvers/valibot'
import { DollarSignIcon } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { TYPES } from '@/lib/constants'
import {
  UpdateExpenseInput,
  UpdateExpenseSchema,
} from '@/validators/update-expense.validator'
import { Dispatch, SetStateAction, useState } from 'react'

type UpdateExpenseButtonProps = {
  expense: Expense
  className?: string
}

export const UpdateExpenseButton = ({
  expense,
  className,
}: UpdateExpenseButtonProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn('h-full w-full', className)}>
          <PencilIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-sm'>
        <DialogHeader>
          <DialogTitle>Update Expense</DialogTitle>
          <DialogDescription>
            Update the expense details below.
          </DialogDescription>
        </DialogHeader>
        <UpdateExpenseForm expense={expense} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}

const UpdateExpenseForm = ({
  expense,
  setOpen,
}: {
  expense: Expense
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const form = useForm<UpdateExpenseInput>({
    resolver: valibotResolver(UpdateExpenseSchema),
    reValidateMode: 'onSubmit',
    defaultValues: {
      amount: expense.amount,
      description: expense.description,
      type: expense.type as 'income' | 'expense',
      _id: expense._id.toString(),
    },
  })

  const submit = async (values: UpdateExpenseInput) => {
    await updateExpense(values)
    setOpen(false)
  }

  const { watch } = form
  const watchType = watch('type')

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className='flex flex-col gap-y-0.5'
      >
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel className='sr-only'>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder='Description'
                  {...field}
                  className='focus-visible:bg-primary/5 focus-visible:ring-0 focus-visible:ring-offset-0'
                />
              </FormControl>
            </FormItem>
          )}
        />

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
                      className={cn(
                        'border-b-2 ps-6 focus-visible:bg-primary/5 focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-inner-spin-button]:appearance-none',
                        {
                          'border-b-destructive': watchType === 'expense',
                          'border-b-success': watchType === 'income',
                        },
                      )}
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
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className='flex flex-col'
                  >
                    {['income', 'expense'].map((type) => {
                      return (
                        <FormItem
                          key={type}
                          className='flex items-center space-x-3 space-y-0'
                        >
                          <FormControl>
                            <RadioGroupItem value={type} />
                          </FormControl>
                          <FormLabel className='uppercase'>
                            {type.slice(0, 3)}
                          </FormLabel>
                        </FormItem>
                      )
                    })}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DialogFooter className='mt-4 flex gap-2 sm:flex-row-reverse'>
          <DialogClose className='flex-1' asChild>
            <Button variant='ghost'>Cancel</Button>
          </DialogClose>
          <Button type='submit' className='flex-1'>
            Update
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
