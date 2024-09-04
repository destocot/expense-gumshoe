'use client'

import { Button } from '@/components/ui/button'
import { deleteExpense } from '@/lib/actions'
import { cn } from '@/lib/utils'
import { Trash2Icon } from 'lucide-react'

type DeleteExpenseButtonProps = { expenseId: string; className?: string }

export const DeleteExpenseButton = ({
  expenseId,
  className,
}: DeleteExpenseButtonProps) => {
  return (
    <Button
      className={cn('h-full w-full', className)}
      variant='destructive'
      onClick={async () => {
        await deleteExpense({ id: expenseId })
      }}
    >
      <Trash2Icon />
    </Button>
  )
}
