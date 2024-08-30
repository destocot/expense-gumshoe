import Brand from '@/components/brand'
import CreateExpenseForm from '@/components/create-expense-form'
import ExpenseList from '@/components/expense-list'
import dbConnect from '@/lib/dbConnect'
import ExpenseModel from '@/models/Expense'

const findAllExpenses = async () => {
  await dbConnect()
  const expenses = await ExpenseModel.find({})
  return expenses
}

const HomePage = async () => {
  const expenses = await findAllExpenses()

  return (
    <main>
      <div className='flex flex-col gap-y-4 py-16'>
        <Brand />
        <CreateExpenseForm />
        <ExpenseList expenses={expenses} />
      </div>
    </main>
  )
}

export default HomePage
