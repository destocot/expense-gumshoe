'use client'

import { Button } from '@/components/ui/button'
// import { updateExpense } from '@/lib/actions'
import { cn } from '@/lib/utils'
import { PencilIcon } from 'lucide-react'

type UpdateExpenseButtonProps = { expenseId: string; className?: string }

export const UpdateExpenseButton = ({
  expenseId,
  className,
}: UpdateExpenseButtonProps) => {
  return (
    <Button
      className={cn('h-full w-full', className)}
      variant='secondary'
      onClick={async () => {
        // await updateExpense({ id: expenseId })
      }}
    >
      <PencilIcon />
    </Button>
  )
}
