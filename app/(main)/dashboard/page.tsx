import Brand from '@/components/brand'
import dbConnect from '@/lib/dbConnect'
import { validateRequest } from '@/lib/validate-request'
import ExpenseModel, { Expense } from '@/models/Expense'
import { redirect } from 'next/navigation'
import { ExpenseBarChart } from './_components/expense-bar-chart'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { HomeIcon } from 'lucide-react'
import { Document } from 'mongoose'

export const toObjects = <T extends Document>(
  documents: T[],
): Omit<T, keyof Document>[] =>
  documents.map((document) => {
    return document.toObject({ flattenObjectIds: true })
  })

const findAllExpenses = async (userId: string) => {
  await dbConnect()
  const expenses = await ExpenseModel.find({
    userId,
  }).sort({ createdAt: -1 })

  return expenses
}

export default async function DashboardPage() {
  const { user } = await validateRequest()

  if (!user) redirect('/login')

  const _expenses = (await findAllExpenses(user.id)) as Array<Expense>
  const expenses = toObjects(_expenses)

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
