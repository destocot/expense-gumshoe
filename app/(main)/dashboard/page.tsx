import { BrandWithHomeLink } from '@/components/brand'
import { validateRequest } from '@/lib/validate-request'
import { redirect } from 'next/navigation'
import { ExpenseBarChart } from './_components/expense-bar-chart'
import { findExpenses } from '@/queries/expenses.queries'
import { formatMoney } from '@/lib/utils'
import UserModel from '@/models/User'
import { SettingsButton } from './_components/settings-button'
import { CheckCard } from '@/components/check-card'
import { findChecks } from '@/queries/check.queries'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function DashboardPage() {
  const { user: authUser } = await validateRequest()
  if (!authUser) redirect('/login')

  const expenses = await findExpenses()

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

  const user = await UserModel.findById(authUser.id)
  return (
    <main>
      <div className='flex flex-col gap-y-6 py-16'>
        <div className='flex'>
          <BrandWithHomeLink>
            <SettingsButton />
          </BrandWithHomeLink>
        </div>
        <h2 className='text-2xl font-bold'>{authUser.username}'s Dashboard</h2>
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
            <div className='flex flex-col items-center rounded bg-primary/10'>
              <span>Income</span>
              <span className='text-xl tabular-nums'>
                {user.checkDepositBreakdown.income}%
              </span>
            </div>
            <div className='flex flex-col items-center rounded bg-primary/10'>
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

        <ul className='flex flex-col gap-y-2'>
          {checks.map((check) => (
            <li key={check._id}>
              <CheckCard check={check} />
            </li>
          ))}
        </ul>

        <div className='rounded border'>
          <ExpenseBarChart expenses={expenses} />
        </div>
      </div>
    </main>
  )
}
