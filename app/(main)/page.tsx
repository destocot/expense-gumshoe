import { Brand } from '@/components/brand'
import CreateExpenseForm from '@/components/create-expense-form'
import { DepositCheckButton } from '@/components/deposit-check-form'
import ExpenseList from '@/components/expense-list'
import { cn, formatMoney } from '@/lib/utils'
import { validateRequest } from '@/lib/validate-request'
import {
  findAllExpensesByUserId,
  findIncomeAndExpenseByUserId,
} from '@/queries/expenses.queries'

const HomePage = async () => {
  const { user } = await validateRequest()

  return (
    <main>
      <div className='flex flex-col gap-y-4 py-16'>
        <Brand />
        {user ? <SignedIn userId={user.id} /> : <SignedOut />}
      </div>
    </main>
  )
}

type SignedInProps = { userId: string }

const SignedIn = async ({ userId }: SignedInProps) => {
  const expenses = await findIncomeAndExpenseByUserId(userId)
  const total = expenses.reduce((acc, expense) => {
    if (expense.type === 'income') return acc + expense.amount
    else if (expense.type === 'expense') return acc - expense.amount
    else return acc
  }, 0)

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
