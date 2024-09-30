import { auth } from '@/auth.config'
import { Brand } from '@/components/brand'
import CreateExpenseForm from '@/components/create-expense-form'
import { DepositCheckButton } from '@/components/deposit-check-form'
import ExpenseList from '@/components/expense-list'
import { TimeSelector } from '@/components/time-selector'
import { Button } from '@/components/ui/button'
import { type SelectExpense } from '@/drizzle/schema'
import { cn, formatMoney } from '@/lib/utils'
import { findAllExpenses, getExpenseBalance } from '@/queries/expenses.queries'
import exp from 'constants'
import { redirect } from 'next/navigation'

type HomePageProps = {
  searchParams: { t?: 'day' | 'week' | 'month' }
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const time = searchParams?.t ?? 'week'

  const expenses = await findAllExpenses(session.user.userId, { time })

  return (
    <main>
      <div className='flex flex-col gap-y-4 py-16'>
        <Brand />
        {!!session ? (
          <SignedIn time={time} expenses={expenses} />
        ) : (
          <SignedOut />
        )}
      </div>
    </main>
  )
}

const SignedIn = async ({
  time,
  expenses,
}: {
  time: 'day' | 'week' | 'month'
  expenses: Array<SelectExpense>
}) => {
  const total = await getExpenseBalance()
  const slicedExpenses = expenses.slice(0, 8)

  return (
    <>
      <h1
        className={cn('text-3xl font-bold tabular-nums', {
          'text-success': total > 0,
          'text-destructive': total < 0,
        })}
      >
        {formatMoney(total)}
      </h1>

      <CreateExpenseForm />

      {/* <DepositCheckButton /> */}

      <TimeSelector time={time} />

      <ExpenseList expenses={slicedExpenses} />
    </>
  )
}

const SignedOut = () => {
  return (
    <>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet voluptas
        blanditiis quaerat non illum velit maxime, impedit tempore sint
        provident laborum magnam dolorum, nemo harum! Quos amet itaque nostrum
        assumenda.
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, iusto
        aspernatur. Quae fugiat fuga voluptas iusto ad, id vero quasi ratione
        culpa est quibusdam maiores? Repudiandae tempora veniam amet? Sunt.
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde excepturi
        magni pariatur architecto sit illum fuga ut dicta ab veritatis amet,
        minima officia cupiditate facere impedit suscipit sed quod. Aperiam!
      </p>
    </>
  )
}

export default HomePage
