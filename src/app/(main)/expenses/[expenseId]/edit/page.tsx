import { authGuard } from '@/lib/server-utils'
import { EditExpenseForm } from '@/resources/expenses/components/edit-expense-form'
import { findOneExpense } from '@/resources/expenses/queries'
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
    <div className='container flex flex-col items-center space-y-16 py-16'>
      <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>Edit Expense</h1>

      <p className='text-muted-foreground sm:text-lg'>
        Modify the details below to update this expense.
      </p>

      <div className='w-full max-w-sm'>
        <EditExpenseForm defaultValues={expense} />
      </div>
    </div>
  )
}
