'use client'

import { cn, formatMoney } from '@/lib/utils'
import type { Expense } from '@/models/Expense'
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react'
import { DeleteExpenseButton } from '@/components/delete-expense-button'
import { useState } from 'react'

type ExpenseItemProps = { expense: Expense }

export const ExpenseItem = ({ expense }: ExpenseItemProps) => {
  const expenseId = expense._id as string
  const [isHovered, setIsHovered] = useState(false)

  return (
    <li
      className='relative overflow-hidden rounded'
      onMouseEnter={() => void setIsHovered(true)}
      onMouseLeave={() => void setIsHovered(false)}
    >
      <div
        className={cn('flex flex-col rounded border bg-background', {
          'w-[90%]': isHovered,
        })}
      >
        <div className='p-1.5'>
          <span className='text-sm'>{expense.description}</span>

          <div className='flex items-end justify-between'>
            <div className='flex items-center gap-x-2'>
              <ExpenseIcon type={expense.type} />
              <span className='tabular-nums'>
                {formatMoney(expense.amount)}
              </span>
            </div>
            <span className='text-xs opacity-50'>
              {new Date(expense.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <div
        className={cn(
          'absolute bottom-0 right-0 top-0 w-[10%] cursor-pointer',
          {
            'opacity-0': !isHovered,
            'opacity-100': isHovered,
          },
        )}
      >
        <DeleteExpenseButton expenseId={expenseId} className='rounded-none' />
      </div>
    </li>
  )
}

const ExpenseIcon = ({ type }: { type: 'income' | 'expense' }) => {
  if (type === 'income') {
    return <PlusCircleIcon size={16} className='stroke-success' />
  }

  if (type === 'expense') {
    return <MinusCircleIcon size={16} className='stroke-destructive' />
  }

  return null
}
