import { auth } from '@/auth.config'
import { BrandWithHomeLink } from '@/components/brand'
import { CheckCard } from '@/components/check-card'
import { DeleteCheckButton } from '@/components/delete-check-button'
import { ExpenseItem } from '@/components/expense-item'
import { Button } from '@/components/ui/button'
import { findCheck } from '@/queries/checks-queries'
import { findOneExpenseByCheckId } from '@/queries/expenses-queries'
import { notFound, redirect } from 'next/navigation'

type CheckPageProps = { params: { checkId: string } }

const CheckPage = async (props: CheckPageProps) => {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const checkId = props.params.checkId
  if (!checkId) notFound()

  const check = await findCheck(checkId)
  if (!check) notFound()

  const expenses = await findOneExpenseByCheckId(checkId)

  return (
    <main>
      <div className='space-y-4 py-16'>
        <BrandWithHomeLink />
        <CheckCard check={check} name={session.user.username} />

        <ul className='flex flex-col gap-y-2'>
          {expenses.map((expense) => (
            <li key={expense.expenseId} className='flex flex-col gap-y-2'>
              <ExpenseItem key={expense.expenseId} expense={expense} />
            </li>
          ))}
        </ul>

        <DeleteCheckButton checkId={check.checkId} className='float-right' />
      </div>
    </main>
  )
}
export default CheckPage
