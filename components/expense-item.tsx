'use client'

import {
  CuboidIcon,
  InfoIcon,
  MinusCircleIcon,
  PiggyBankIcon,
  PlusCircleIcon,
} from 'lucide-react'
import Link from 'next/link'
import { formatMoney } from '@/lib/utils'
import { DeleteExpenseButton } from '@/components/delete-expense-button'
import { UpdateExpenseButton } from '@/components/update-expense-button'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { type SelectExpense } from '@/drizzle/schema'

type ExpenseItemProps = { expense: SelectExpense }

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
          {new Date(expense.createdAt!).toLocaleDateString()}
        </div>
        {!expense.checkId ? (
          <div className='absolute bottom-2 right-2 hidden gap-x-1.5 group-hover:flex'>
            <UpdateExpenseButton expense={expense} />
            <DeleteExpenseButton expenseId={expense.expenseId} />
          </div>
        ) : (
          <div className='absolute bottom-2 right-2 hidden group-hover:block'>
            <Button variant='secondary' size='icon' asChild>
              <Link href={`/c/${expense.checkId}`}>
                <InfoIcon size={20} />
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

const ExpenseIcon = ({ type }: { type: SelectExpense['type'] }) => {
  switch (type) {
    case 'income':
      return <PlusCircleIcon size={16} className='stroke-success' />
    case 'expense':
      return <MinusCircleIcon size={16} className='stroke-destructive' />
    case 'savings':
      return <PiggyBankIcon size={16} className='stroke-pink-500' />
    case 'other':
      return <CuboidIcon size={16} className='stroke-primary' />
  }
}
