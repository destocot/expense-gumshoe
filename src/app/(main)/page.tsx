import { Button } from '@/components/ui/button'
import { authGuard } from '@/lib/server-utils'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { ExpenseListServer } from '@expenses/components/expense-list-server'

export default async function Page() {
  await authGuard()

  return (
    <div className='container space-y-16 py-16'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>Expenses</h1>

        <Button variant='outline' size='sm' asChild>
          <Link href='/expenses/new'>
            <PlusIcon />
            <span className='hidden sm:inline'>New Expense</span>
          </Link>
        </Button>
      </div>

      <ExpenseListServer />
    </div>
  )
}
