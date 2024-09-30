'use client'

import { Button } from '@/components/ui/button'
import { deleteExpense } from '@/actions/delete-expense.action'
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
import { DialogDescription } from '@radix-ui/react-dialog'

type DeleteExpenseButtonProps = { expenseId: string }

export const DeleteExpenseButton = ({
  expenseId,
}: DeleteExpenseButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='destructive' size='icon'>
          <Trash2Icon size={20} />
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-xs'>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription className='sr-only'>
            This will permanently the expense.
          </DialogDescription>
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
