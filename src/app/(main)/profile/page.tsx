import { Badge } from '@ui/badge'
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@ui/card'
import { formatCurrency } from '@/lib/utils'
import { LogoutButton } from '@auth/components/logout-button'
import { ExpenseTypeBadge } from '@expenses/components/expense-type-badge'
import { findAllExpenses } from '@expenses/queries'
import { findOneProfile } from '@profiles/queries'
import { EditCheckBreakdownDialog } from '@/resources/profiles/components/edit-check-breakdown-dialog'

export default async function Page() {
  const profile = await findOneProfile()

  const { data: expenses } = await findAllExpenses({ where: { profileId: profile.id } })

  const aggregations = (expenses ?? []).reduce(
    (accu, { type, amount }) => {
      switch (type) {
        case 'EXPENSE':
          return { ...accu, net: accu.net - amount, expenses: accu.expenses + amount }
        case 'INCOME':
          return { ...accu, net: accu.net + amount, income: accu.income + amount }
        case 'OTHER':
          return { ...accu, other: accu.other + amount }
        case 'SAVINGS':
          return { ...accu, savings: accu.savings + amount }
        default:
          return accu
      }
    },
    { expenses: 0, income: 0, savings: 0, other: 0, net: 0 },
  )

  return (
    <div className='container space-y-16 py-16'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>Profile</h1>

        <LogoutButton />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Aggregations</CardTitle>
        </CardHeader>

        <CardContent className='relative grid grid-cols-2 gap-3'>
          <div className='space-x-2 justify-self-center'>
            <ExpenseTypeBadge type='EXPENSE' />
            <span className='text-sm'>{formatCurrency(aggregations.expenses)}</span>
          </div>
          <div className='space-x-2 justify-self-center'>
            <ExpenseTypeBadge type='INCOME' />
            <span className='text-sm'>{formatCurrency(aggregations.income)}</span>
          </div>
          <div className='space-x-2 justify-self-center'>
            <ExpenseTypeBadge type='SAVINGS' />
            <span className='text-sm'>{formatCurrency(aggregations.savings)}</span>
          </div>
          <div className='space-x-2 justify-self-center'>
            <ExpenseTypeBadge type='OTHER' />
            <span className='text-sm'>{formatCurrency(aggregations.other)}</span>
          </div>

          <div className='absolute inset-x-0 top-1/2 -translate-y-1/2 border border-dashed' />
          <div className='absolute inset-y-0 top-0 left-1/2 -translate-x-1/2 border border-dashed' />
        </CardContent>

        <CardFooter className='justify-center'>
          <Badge variant='outline'>Net</Badge>
          <span className='text-sm'>{formatCurrency(aggregations.net)}</span>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Check Breakdown</CardTitle>
          <CardAction>
            <EditCheckBreakdownDialog defaultValues={profile.checkBreakdown} />
          </CardAction>
        </CardHeader>

        <CardContent className='grid grid-cols-3 gap-2'>
          <div className='space-x-2 justify-self-center'>
            <Badge variant='outline'>Income</Badge>
            <span className='text-sm'>{profile.checkBreakdown.income}</span>
          </div>
          <div className='space-x-2 justify-self-center'>
            <Badge variant='outline'>Savings</Badge>
            <span className='text-sm'>{profile.checkBreakdown.savings}</span>
          </div>
          <div className='space-x-2 justify-self-center'>
            <Badge variant='outline'>Other</Badge>
            <span className='text-sm'>{profile.checkBreakdown.other}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
