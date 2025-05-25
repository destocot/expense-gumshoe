import { Button } from '@ui/button'
import { authGuard } from '@/lib/server-utils'
import { BanknoteArrowDownIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { ExpenseListServer } from '@expenses/components/expense-list-server'

export default async function Page() {
  const loggedInUser = await authGuard()

  return (
    <div className='container space-y-16 py-16'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>Expenses</h1>

        <div className='space-x-4'>
          <Button variant='outline' size='sm' asChild>
            <Link href='/expenses/new'>
              <PlusIcon />
              <span className='hidden md:inline'>New Expense</span>
            </Link>
          </Button>

          <Button variant='outline' size='sm' asChild>
            <Link href='/checks/new'>
              <BanknoteArrowDownIcon />
              <span className='hidden md:inline'>Deposit Check</span>
            </Link>
          </Button>
        </div>
      </div>

      <ExpenseListServer userId={+loggedInUser.id} />
    </div>
  )
}
