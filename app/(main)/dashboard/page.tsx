import Brand from '@/components/brand'
import { validateRequest } from '@/lib/validate-request'
import { redirect } from 'next/navigation'
import { ExpenseBarChart } from './_components/expense-bar-chart'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { HomeIcon, Settings2Icon } from 'lucide-react'
import { findAllExpensesByUserId } from '@/queries/expenses.queries'
import { Expense } from '@/models/Expense'
import { formatMoney } from '@/lib/utils'

export default async function DashboardPage() {
  const { user } = await validateRequest()
  if (!user) redirect('/login')

  const expenses: Array<Expense> = await findAllExpensesByUserId(user.id)

  const totals = expenses.reduce(
    (acc, expense) => {
      acc.income += expense.type === 'income' ? expense.amount : 0
      acc.savings += expense.type === 'savings' ? expense.amount : 0
      acc.other += expense.type === 'other' ? expense.amount : 0
      acc.expenses += expense.type === 'expense' ? expense.amount : 0
      return acc
    },
    { income: 0, savings: 0, other: 0, expenses: 0 },
  )

  return (
    <main>
      <div className='flex flex-col gap-y-6 py-16'>
        <div className='flex items-center justify-between'>
          <Brand />
          <div className='flex gap-x-2'>
            <Link href='/' className={buttonVariants({ size: 'icon' })}>
              <HomeIcon />
            </Link>
            <Button size='icon'>
              <Settings2Icon />
            </Button>
          </div>
        </div>
        <h2 className='text-2xl font-bold'>{user.username}'s Dashboard</h2>
        <div>
          <div className='flex gap-x-2'>
            <span className='min-w-20'>Expenses:</span>
            <span>{formatMoney(totals.expenses)}</span>
          </div>
          <div className='flex gap-x-2'>
            <span className='min-w-20'>Income:</span>
            <span>{formatMoney(totals.income)}</span>
          </div>
          <div className='flex gap-x-2'>
            <span className='min-w-20'>Savings:</span>
            <span>{formatMoney(totals.savings)}</span>
          </div>
          <div className='flex gap-x-2'>
            <span className='min-w-20'>Other:</span>
            <span>{formatMoney(totals.other)}</span>
          </div>
        </div>
        <div className='rounded border'>
          <ExpenseBarChart expenses={expenses} />
        </div>
      </div>
    </main>
  )
}
// {
//   _id: new ObjectId('66d50655b88c74e812af2d10'),
//   userId: new ObjectId('66d36d6dfb5529308346f64c'),
//   amount: 15.19,
//   type: 'expense',
//   description: 'Burger By Day',
//   createdAt: 2024-09-02T00:27:01.109Z,
//   updatedAt: 2024-09-02T00:27:01.109Z
// }
