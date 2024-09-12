'use client'

import { cn, formatMoney } from '@/lib/utils'
import type { Expense } from '@/models/Expense'
import {
  CuboidIcon,
  InfoIcon,
  MinusCircleIcon,
  PiggyBankIcon,
  PlusCircleIcon,
  Trash2Icon,
} from 'lucide-react'
import { DeleteExpenseButton } from '@/components/delete-expense-button'
import { UpdateExpenseButton } from './update-expense-button'
import { Button, buttonVariants } from './ui/button'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DeleteCheckButton } from './delete-check-button'

type ExpenseItemProps = { expense: Expense }

export const ExpenseItem = ({ expense }: ExpenseItemProps) => {
  return (
    <Card className='group relative'>
      <CardHeader className='p-4'>
        <CardTitle className='line-clamp-1 text-sm'>
          {expense.description}
        </CardTitle>
      </CardHeader>
      <CardContent className='flex items-center justify-between p-4 pt-0'>
        <div className='flex items-center gap-x-2'>
          <ExpenseIcon type={expense.type} />
          <span className='tabular-nums'>{formatMoney(expense.amount)}</span>
        </div>
        <div className='text-xs opacity-50 group-hover:hidden'>
          {new Date(expense.createdAt).toLocaleDateString()}
        </div>
        {!!expense.checkId ? (
          <div className='absolute bottom-2 right-2 hidden gap-x-1.5 group-hover:flex'>
            <CheckLink checkId={expense.checkId} />
            <DeleteCheckButton checkId={expense.checkId} />
          </div>
        ) : (
          <div className='absolute bottom-2 right-2 hidden gap-x-1.5 group-hover:flex'>
            <UpdateExpenseButton expense={expense} />
            <DeleteExpenseButton expenseId={expense._id} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

const CheckLink = ({ checkId }: { checkId: string }) => {
  return (
    <Link
      className={buttonVariants({ variant: 'secondary', size: 'icon' })}
      href={`/c/${checkId}`}
    >
      <InfoIcon size={18} />
    </Link>
  )
}

const ExpenseIcon = ({ type }: { type: Expense['type'] }) => {
  switch (type) {
    case 'income':
      return <PlusCircleIcon size={16} className='stroke-success' />
    case 'expense':
      return <MinusCircleIcon size={16} className='stroke-destructive' />
    case 'savings':
      return <PiggyBankIcon size={16} className='stroke-pink-500' />
    case 'other':
      return <CuboidIcon size={16} className='stroke-primary' />
    default:
      return null
  }
}
