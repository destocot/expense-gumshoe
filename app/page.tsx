import Brand from '@/components/brand'
import CreateExpenseForm from '@/components/create-expense-form'
import ExpenseList from '@/components/expense-list'
import dbConnect from '@/lib/dbConnect'
import ExpenseModel, { type Expense } from '@/models/Expense'
import { revalidatePath } from 'next/cache'

const HomePage = async () => {
  await dbConnect()
  const expenses: Array<Expense> = await ExpenseModel.find({})

  const updateExpense = async (formData: FormData) => {
    'use server'
    const id = formData.get('id')
    const amount = Number(formData.get('amount'))
    await ExpenseModel.findByIdAndUpdate(id, { amount })
    revalidatePath('/')
  }

  return (
    <main>
      <div className='container flex max-w-lg flex-col gap-y-4 py-16'>
        <Brand />
        <CreateExpenseForm />
        <ExpenseList expenses={expenses} />
      </div>
    </main>
  )
}

export default HomePage
