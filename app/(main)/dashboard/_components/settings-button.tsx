'use client'

import { SaveIcon, Settings2Icon } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { updateDepositCheckBreakdown } from '@/lib/actions'
import {
  UpdateDepositCheckBreakdownInput,
  UpdateDepositCheckBreakdownSchema,
} from '@/validators/update-deposit-check-breakdown.validator'
import { valibotResolver } from '@hookform/resolvers/valibot'

export const SettingsButton = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='icon' className='size-8'>
          <Settings2Icon />
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-sm rounded'>
        <DialogHeader>
          <DialogTitle>Edit Settings</DialogTitle>
          <DialogDescription>Here you can edit your settings</DialogDescription>
        </DialogHeader>

        <DepositCheckBreakdownForm setOpen={setOpen} />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='ghost'>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const DepositCheckBreakdownForm = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const form = useForm<UpdateDepositCheckBreakdownInput>({
    resolver: valibotResolver(UpdateDepositCheckBreakdownSchema),
    defaultValues: { income: 60, savings: 10, other: 30 },
  })

  const submit = async (values: UpdateDepositCheckBreakdownInput) => {
    await updateDepositCheckBreakdown(values)
    setOpen(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className='grid grid-cols-7 items-end gap-x-2'
      >
        <FormField
          control={form.control}
          name='income'
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel>Income</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  {...field}
                  className='focus-visible:bg-primary/5 focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-inner-spin-button]:appearance-none'
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='savings'
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel>Savings</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  {...field}
                  className='focus-visible:bg-primary/5 focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-inner-spin-button]:appearance-none'
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='other'
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel>Other</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  {...field}
                  className='focus-visible:bg-primary/5 focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-inner-spin-button]:appearance-none'
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type='submit'
          size='icon'
          disabled={form.formState.isSubmitting}
        >
          <SaveIcon />
        </Button>
      </form>
    </Form>
  )
}
