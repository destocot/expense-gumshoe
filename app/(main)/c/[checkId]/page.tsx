import { auth } from '@/auth.config'
import { BrandWithHomeLink } from '@/components/brand'
import { CheckCard } from '@/components/check-card'
import { ExpenseItem } from '@/components/expense-item'
// import { findCheck } from '@/queries/check.queries'
import { notFound, redirect } from 'next/navigation'

type CheckPageProps = { params: { checkId: string } }

const CheckPage = async (props: CheckPageProps) => {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const checkId = props.params.checkId
  if (!checkId) notFound()

  return <p>under construction</p>

  // const check = await findCheck(checkId)
  // if (!check) notFound()

  // const expenses = await findExpensesByCheckId(checkId)

  return (
    <main>
      <div className='flex flex-col gap-y-4 py-16'>
        <BrandWithHomeLink />
        {/* <CheckCard check={check} name={authUser.username} /> */}

        <ul className='flex flex-col gap-y-2'>
          {/* {expenses.map((expense) => (
            <li key={expense._id} className='flex flex-col gap-y-2'>
              <span className='w-fit rounded bg-primary px-0.5 text-sm text-primary-foreground'>
                {expense.type}
              </span>
              <ExpenseItem key={expense._id} expense={expense} />
            </li>
          ))} */}
        </ul>
      </div>
    </main>
  )
}
export default CheckPage
