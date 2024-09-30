import { BrandWithHomeLink } from '@/components/brand'
import { redirect } from 'next/navigation'
import { ExpenseBarChart } from './_components/expense-bar-chart'
import { formatMoney } from '@/lib/utils'
import { SettingsButton } from './_components/settings-button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { auth } from '@/auth.config'
import { findAllExpenses } from '@/queries/expenses-queries'
import { findChecks } from '@/queries/checks-queries'
import { findOneUser } from '@/queries/users-queries'
import { CheckCard } from '@/components/check-card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { HomeIcon } from 'lucide-react'

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const expenses = await findAllExpenses(session.user.userId, {})

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

  const checks = await findChecks()
  const user = await findOneUser(session.user.userId)

  if (!expenses.length) {
    return (
      <div className='flex flex-col gap-y-6 py-16'>
        <div className='flex'>
          <BrandWithHomeLink>
            <SettingsButton />
          </BrandWithHomeLink>
        </div>
        <h2 className='text-2xl font-bold'>{user.username}'s Dashboard</h2>

        <Card>
          <CardHeader>
            <CardTitle className='text-center'>You Have No Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-center'>
              You have no expenses yet. Click the button below to add your first
              expense.
            </p>
            <Button size='sm' className='mt-4 w-full' asChild>
              <Link href='/'>
                Home
                <HomeIcon className='ml-2' size={20} />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <main>
      <div className='flex flex-col gap-y-6 py-16'>
        <div className='flex'>
          <BrandWithHomeLink>
            <SettingsButton />
          </BrandWithHomeLink>
        </div>
        <h2 className='text-2xl font-bold'>{user.username}'s Dashboard</h2>
        <Card>
          <CardContent className='grid pt-6 sm:grid-cols-2'>
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
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='text-center'>
              Deposit Check Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-3 gap-x-2'>
            <div className='flex flex-col items-center rounded bg-success/10'>
              <span>Income</span>
              <span className='text-xl tabular-nums'>
                {user.checkDepositBreakdown.income}%
              </span>
            </div>
            <div className='flex flex-col items-center rounded bg-pink-500/10'>
              <span>Savings</span>
              <span className='text-xl tabular-nums'>
                {user.checkDepositBreakdown.savings}%
              </span>
            </div>
            <div className='flex flex-col items-center rounded bg-primary/10'>
              <span>Other</span>
              <span className='text-xl tabular-nums'>
                {user.checkDepositBreakdown.other}%
              </span>
            </div>
          </CardContent>
        </Card>

        <h2 className='text-2xl font-bold tracking-tight'>Checks</h2>

        {checks.length > 0 ? (
          <Carousel orientation='vertical'>
            <CarouselContent className='-mt-1 h-[200px]'>
              {checks.map((check) => (
                <CarouselItem key={check.checkId}>
                  <CheckCard check={check} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className='text-center'>You Have No Checks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-center'>
                You have no checks yet. Click the button below to add your first
                expense.
              </p>
              <Button size='sm' className='mt-4 w-full' asChild>
                <Link href='/'>
                  Home
                  <HomeIcon className='ml-2' size={20} />
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        <div className='borderm mt-4 rounded'>
          <ExpenseBarChart expenses={expenses} />
        </div>
      </div>
    </main>
  )
}
