'use client'

import { Button } from '@/components/ui/button'
import { deleteExpense } from '@/lib/actions'
import { cn } from '@/lib/utils'
import { Trash2Icon } from 'lucide-react'

type DeleteExpenseButtonProps = { id: string; className?: string }

export const DeleteExpenseButton = ({
  id,
  className,
}: DeleteExpenseButtonProps) => {
  return (
    <Button
      size='icon'
      className={cn('h-fit w-fit p-0.5', className)}
      variant='destructive'
      onClick={async () => {
        await deleteExpense({ id })
      }}
    >
      <Trash2Icon size={16} />
    </Button>
  )
}
