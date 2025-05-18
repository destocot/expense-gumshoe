import { authGuard } from '@/lib/server-utils'
import { CreateExpenseForm } from '@expenses/components/create-expense-form'

export default async function Page() {
  await authGuard()

  return (
    <div className='container flex flex-col items-center space-y-16 py-16'>
      <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>Create New Expense</h1>

      <p className='text-muted-foreground sm:text-lg'>
        Fill out the details below to log a new expense.
      </p>

      <div className='w-full max-w-sm'>
        <CreateExpenseForm />
      </div>
    </div>
  )
}
