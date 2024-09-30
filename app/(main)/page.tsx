import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/auth.config'
import { Brand } from '@/components/brand'
import { SignedIn, SignedOut } from '@/components/control'
import CreateExpenseForm from '@/components/create-expense-form'
import { DepositCheckButton } from '@/components/deposit-check-form'
import ExpenseList from '@/components/expense-list'
import { TimeSelector } from '@/components/time-selector'
import { Button } from '@/components/ui/button'
import { cn, formatMoney } from '@/lib/utils'
import { findAllExpenses, getExpenseBalance } from '@/queries/expenses-queries'
import { ArrowRightIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type HomePageProps = {
  searchParams: { t?: 'day' | 'week' | 'month' }
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const time = searchParams?.t ?? 'week'

  return (
    <div className='space-y-4 py-16'>
      <Brand className='block' />

      <SignedIn>
        <SignedInContent time={time} />
      </SignedIn>

      <SignedOut>
        <Button size='sm' asChild>
          <Link href='/login'>
            Get Started
            <ArrowRightIcon size={20} className='ml-2' />
          </Link>
        </Button>
      </SignedOut>
    </div>
  )
}

const SignedInContent = async ({
  time,
}: {
  time: 'day' | 'week' | 'month'
}) => {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const expenses = await findAllExpenses(session.user.userId, { time })
  const total = await getExpenseBalance()

  return (
    <>
      <h1
        className={cn('text-3xl font-bold tabular-nums', {
          'text-success': total > 0,
          'text-destructive': total < 0,
        })}
      >
        {formatMoney(total)}
      </h1>

      <CreateExpenseForm />

      <div className='flex gap-x-4'>
        <DepositCheckButton />
        <TimeSelector time={time} />
      </div>

      {expenses.length > 0 ? (
        <ExpenseList expenses={expenses} />
      ) : (
        <Card>
          <CardContent>
            <CardHeader>
              <CardTitle className='text-center'>
                You Have No Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-center'>
                You have no expenses yet. Fill out the form above to add your
                first expense.
              </p>
            </CardContent>
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default HomePage
