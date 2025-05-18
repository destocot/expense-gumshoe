'use client'

import { Button } from '@/components/ui/button'
import { PencilIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import { useTransition } from 'react'
import { deleteExpenseAction } from '@expenses/actions/delete-expense.action'

interface ExpenseActionButtonsProps {
  expenseId: number
}

export const ExpenseActionButton = ({ expenseId }: ExpenseActionButtonsProps) => {
  const [isPending, startTransition] = useTransition()

  const handleDelete = (id: number) => {
    startTransition(async () => {
      await deleteExpenseAction(id)
    })
  }

  return (
    <div className='flex items-center gap-2'>
      <Button variant='secondary' size='icon' asChild>
        <Link href={`/expenses/${expenseId}/edit`}>
          <PencilIcon />
          <span className='sr-only'>Edit</span>
        </Link>
      </Button>

      <Button
        size='icon'
        variant='destructive'
        onClick={handleDelete.bind(null, expenseId)}
        disabled={isPending}
      >
        <TrashIcon />
        <span className='sr-only'>Delete</span>
      </Button>
    </div>
  )
}
