'use client'

import { Button } from '@/components/ui/button'
import { deleteExpense } from '@/actions/delete-expense.action'
import { cn } from '@/lib/utils'
import { Trash2Icon } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

type DeleteExpenseButtonProps = { expenseId: string; className?: string }

export const DeleteExpenseButton = ({
  expenseId,
  className,
}: DeleteExpenseButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn('h-full w-full', className)} variant='secondary'>
          <Trash2Icon />
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-xs'>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogFooter className='flex gap-2 sm:flex-row-reverse'>
          <DialogClose className='flex-1' asChild>
            <Button variant='ghost'>Cancel</Button>
          </DialogClose>
          <Button
            className='flex-1'
            variant='destructive'
            onClick={async () => {
              await deleteExpense(expenseId)
            }}
          >
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
