import Brand from '@/components/brand'
import { validateRequest } from '@/lib/validate-request'
import { redirect } from 'next/navigation'
import { ExpenseBarChart } from './_components/expense-bar-chart'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { HomeIcon } from 'lucide-react'
import { findAllExpensesByUserId } from '@/queries/expenses.queries'

export default async function DashboardPage() {
  const { user } = await validateRequest()
  if (!user) redirect('/login')

  const expenses = await findAllExpensesByUserId(user.id)

  return (
    <main>
      <div className='flex flex-col gap-y-6 py-16'>
        <div className='flex items-center justify-between'>
          <Brand />
          <Link href='/' className={buttonVariants({ size: 'icon' })}>
            <HomeIcon />
          </Link>
        </div>
        <div className='rounded border'>
          <ExpenseBarChart expenses={expenses} />
        </div>
      </div>
    </main>
  )
}
// {
//   _id: new ObjectId('66d50655b88c74e812af2d10'),
//   userId: new ObjectId('66d36d6dfb5529308346f64c'),
//   amount: 15.19,
//   type: 'expense',
//   description: 'Burger By Day',
//   createdAt: 2024-09-02T00:27:01.109Z,
//   updatedAt: 2024-09-02T00:27:01.109Z
// }
