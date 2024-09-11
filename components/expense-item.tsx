'use client'

import { cn, formatMoney } from '@/lib/utils'
import type { Expense } from '@/models/Expense'
import {
  InfoIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  Trash2Icon,
} from 'lucide-react'
import { DeleteExpenseButton } from '@/components/delete-expense-button'
import { UpdateExpenseButton } from './update-expense-button'
import { Button, buttonVariants } from './ui/button'
import Link from 'next/link'

type ExpenseItemProps = { expense: Expense }

export const ExpenseItem = ({ expense }: ExpenseItemProps) => {
  const expenseId = expense._id.toString()

  return (
    <li className='group bg-background'>
      <div className='flex justify-between rounded p-1.5'>
        <div>
          <span className='truncate text-sm'>{expense.description}</span>

          <div className='flex items-center gap-x-2'>
            <ExpenseIcon type={expense.type} />
            <span className='tabular-nums'>{formatMoney(expense.amount)}</span>
          </div>
        </div>

        <span className='self-end text-xs opacity-50 group-hover:hidden'>
          {new Date(expense.createdAt).toLocaleDateString()}
        </span>

        {expense.checkId ? (
          <div className='hidden gap-x-1.5 group-hover:flex'>
            <Link
              href={`/c/${expense.checkId}`}
              className={cn(buttonVariants(), 'h-full px-1.5')}
            >
              <InfoIcon />
            </Link>
            <Button className='h-full px-1.5' variant='secondary'>
              <Trash2Icon />
            </Button>
          </div>
        ) : (
          <div className='hidden gap-x-1.5 group-hover:flex'>
            <UpdateExpenseButton expense={expense} className='px-1.5' />
            <DeleteExpenseButton expenseId={expenseId} className='px-1.5' />
          </div>
        )}
      </div>
    </li>
  )
}

const ExpenseIcon = ({ type }: { type: Expense['type'] }) => {
  if (type === 'income') {
    return <PlusCircleIcon size={16} className='stroke-success' />
  }

  if (type === 'expense') {
    return <MinusCircleIcon size={16} className='stroke-destructive' />
  }

  return null
}
