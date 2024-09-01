import Brand from '@/components/brand'
import CreateExpenseForm from '@/components/create-expense-form'
import ExpenseList from '@/components/expense-list'
import dbConnect from '@/lib/dbConnect'
import { cn, formatMoney } from '@/lib/utils'
import { validateRequest } from '@/lib/validate-request'
import ExpenseModel from '@/models/Expense'

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

const findAllExpenses = async (userId: string) => {
  await dbConnect()
  const expenses = await ExpenseModel.find({
    userId,
  })
  return expenses
}

type SignedInProps = { userId: string }

const SignedIn = async ({ userId }: SignedInProps) => {
  const expenses = await findAllExpenses(userId)
  const total = expenses.reduce((acc, expense) => {
    if (expense.type === 'income') return acc + expense.amount
    if (expense.type === 'expense') return acc - expense.amount
  }, 0)

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
      <ExpenseList expenses={expenses} />
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
