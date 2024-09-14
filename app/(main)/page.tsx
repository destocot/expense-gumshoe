import { Brand } from '@/components/brand'
import CreateExpenseForm from '@/components/create-expense-form'
import { DepositCheckButton } from '@/components/deposit-check-form'
import ExpenseList from '@/components/expense-list'
import { TimeSelector } from '@/components/time-selector'
import { Button } from '@/components/ui/button'
import { cn, formatMoney } from '@/lib/utils'
import { validateRequest } from '@/lib/validate-request'
import { calcExpenseBalance, findExpenses } from '@/queries/expenses.queries'

type HomePageProps = {
  searchParams: { t?: 'day' | 'week' | 'month' }
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const time = searchParams?.t ?? 'week'

  const { user: authUser } = await validateRequest()

  return (
    <main>
      <div className='flex flex-col gap-y-4 py-16'>
        <Brand />
        {!!authUser ? <SignedIn time={time} /> : <SignedOut />}
      </div>
    </main>
  )
}

const SignedIn = async ({ time }: { time: 'day' | 'week' | 'month' }) => {
  const expenses = await findExpenses({ time })
  const total = await calcExpenseBalance()

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

      <DepositCheckButton />

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
