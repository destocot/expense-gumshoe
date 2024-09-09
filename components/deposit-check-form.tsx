'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DialogDescription } from '@radix-ui/react-dialog'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { DollarSignIcon } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import {
  DepositCheckInput,
  DepositCheckSchema,
} from '@/validators/deposit-check.validator'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { depositCheck } from '@/lib/actions'

type DepositCheckFormProps = {
  className?: string
}

export const DepositCheckButton = ({ className }: DepositCheckFormProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm' variant='outline' className={className}>
          Deposit Check
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-sm'>
        <DialogHeader>
          <DialogTitle>Deposit Check</DialogTitle>
          <DialogDescription>Enter the amount of the check.</DialogDescription>
        </DialogHeader>
        <DepositCheckForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}

const DepositCheckForm = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const form = useForm<DepositCheckInput>({
    resolver: valibotResolver(DepositCheckSchema),
    reValidateMode: 'onSubmit',
    defaultValues: { amount: '' },
  })

  const submit = async (values: DepositCheckInput) => {
    await depositCheck(values)
    setOpen(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className='flex flex-col gap-y-0.5'
      >
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
                    className='border-b-2 ps-6 focus-visible:bg-primary/5 focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-inner-spin-button]:appearance-none'
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

        <DialogFooter className='mt-4 flex gap-2 sm:flex-row-reverse'>
          <DialogClose className='flex-1' asChild>
            <Button variant='ghost'>Cancel</Button>
          </DialogClose>
          <Button type='submit' className='flex-1'>
            Deposit
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
