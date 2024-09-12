import { BrandWithHomeLink } from '@/components/brand'
import { CheckCard } from '@/components/check-card'
import { ExpenseItem } from '@/components/expense-item'
import { validateRequest } from '@/lib/validate-request'
import { findCheckByCheckId } from '@/queries/check.queries'
import { findExpensesByCheckId } from '@/queries/expenses.queries'
import { notFound, redirect } from 'next/navigation'

type CheckPageProps = { params: { checkId: string } }

const CheckPage = async (props: CheckPageProps) => {
  const checkId = props.params.checkId
  if (!checkId) notFound()

  const { user: authUser } = await validateRequest()
  if (!authUser) redirect('/login')

  const check = await findCheckByCheckId(checkId)
  if (!check) notFound()

  const expenses = await findExpensesByCheckId(checkId)

  return (
    <main>
      <div className='flex flex-col gap-y-4 py-16'>
        <BrandWithHomeLink />
        <CheckCard check={check} name={authUser.username} />

        <ul className='flex flex-col gap-y-2'>
          {expenses.map((expense) => (
            <li key={expense._id}>
              <ExpenseItem key={expense._id} expense={expense} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
export default CheckPage
