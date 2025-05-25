import { Card, CardContent } from '@ui/card'
import { authGuard } from '@/lib/server-utils'
import { EditExpenseForm } from '@expenses/components/edit-expense-form'
import { findOneExpense } from '@expenses/queries'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ expenseId: string }>
}

export default async function Page({ params }: PageProps) {
  await authGuard()

  const expenseId = (await params).expenseId

  const { data: expense } = await findOneExpense({ id: +expenseId })

  if (!expense) notFound()

  return (
    <div className='container space-y-16 py-16'>
      <div className='mx-auto space-y-4 text-center'>
        <h1 className='text-4xl font-bold tracking-tight'>Create New Expense</h1>

        <p className='text-muted-foreground text-lg'>
          Fill out the details below to log a new expense.
        </p>
      </div>

      <Card className='mx-auto w-full max-w-md'>
        <CardContent>
          <EditExpenseForm defaultValues={expense} />
        </CardContent>
      </Card>
    </div>
  )
}
