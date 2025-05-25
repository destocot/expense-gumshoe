import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card'
import { Expense } from '@/generated/prisma'
import { formatCurrency, formatDate } from '@/lib/utils'
import { ExpenseTypeBadge } from '@expenses/components/expense-type-badge'
import { ExpenseActionButton } from '@expenses/components/expense-action-buttons'

interface ExpenseListProps {
  expenses: Array<Expense>
}

export const ExpenseList = ({ expenses }: ExpenseListProps) => {
  return (
    <ul className='space-y-4'>
      {expenses.map((e) => (
        <li key={e.id}>
          <Card className='group rounded-md'>
            <CardHeader>
              <div className='flex items-center justify-between gap-1'>
                <CardTitle>{formatCurrency(e.amount)}</CardTitle>
                <ExpenseTypeBadge type={e.type} />
              </div>

              <CardDescription>{formatDate(e.createdAt)}</CardDescription>
            </CardHeader>

            <CardContent>
              <div className='relative flex items-center'>
                <p className='text-muted-foreground line-clamp-1 pe-[95px] text-sm break-all'>
                  {e.description ?? '-'}
                </p>

                <div className='absolute right-0 opacity-0 group-hover:opacity-100'>
                  <ExpenseActionButton expenseId={e.id} />
                </div>
              </div>
            </CardContent>
          </Card>
        </li>
      ))}

      <div className='h-2' />
    </ul>
  )
}
