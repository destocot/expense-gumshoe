'use client'

import { Button } from '@/components/ui/button'
// import { updateExpense } from '@/lib/actions'
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

type UpdateExpenseButtonProps = { expenseId: string; className?: string }

export const UpdateExpenseButton = ({
  expenseId,
  className,
}: UpdateExpenseButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn('h-full w-full', className)}>
          <PencilIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-xs'>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogFooter className='flex gap-x-2'>
          <DialogClose className='flex-1' asChild>
            <Button variant='ghost'>Cancel</Button>
          </DialogClose>
          <Button
            className='flex-1'
            variant='destructive'
            onClick={async () => {
              // await deleteExpense({ id: expenseId })
            }}
          >
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
