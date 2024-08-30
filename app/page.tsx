import { Button } from '@/components/ui/button'
import dbConnect from '@/lib/dbConnect'
import ExpenseModel, { type Expense } from '@/models/Expense'
import { revalidatePath } from 'next/cache'

const HomePage = async () => {
  await dbConnect()
  const expenses: Array<Expense> = await ExpenseModel.find({})

  const total = expenses.reduce((accu, curr) => accu + curr.amount, 0)

  const createExpense = async (formData: FormData) => {
    'use server'
    const amount = Number(formData.get('amount'))
    await ExpenseModel.create({ amount })
    revalidatePath('/')
  }

  const deleteExpense = async (formData: FormData) => {
    'use server'
    const id = formData.get('id')
    await ExpenseModel.findByIdAndDelete(id)
    revalidatePath('/')
  }

  const updateExpense = async (formData: FormData) => {
    'use server'
    const id = formData.get('id')
    const amount = Number(formData.get('amount'))
    await ExpenseModel.findByIdAndUpdate(id, { amount })
    revalidatePath('/')
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='flex max-w-md flex-col gap-y-4 bg-muted px-2 py-4'>
        <h2 className='text-2xl font-bold tracking-tight'>Expense Gumshoe</h2>

        <h1 className='text-center text-3xl font-bold tracking-tight'>
          ${total}
        </h1>

        <form action={createExpense} className='flex gap-x-2'>
          <input
            type='number'
            name='amount'
            className='flex-1 rounded-md px-3'
          />
          <Button type='submit' size='sm'>
            Add Expense
          </Button>
        </form>

        <ul className='flex flex-col gap-y-2'>
          {expenses.map((expense) => (
            <div key={expense.id} className='flex gap-x-2'>
              <form action={updateExpense} className='flex gap-x-2'>
                <input type='hidden' name='id' value={expense.id} />
                <input
                  defaultValue={expense.amount}
                  type='number'
                  name='amount'
                  className='rounded-md px-3'
                />
                <Button type='submit' variant='outline' size='sm'>
                  Update
                </Button>
              </form>

              <form action={deleteExpense}>
                <input type='hidden' name='id' value={expense.id} />
                <Button type='submit' size='sm' variant='destructive'>
                  Delete
                </Button>
              </form>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default HomePage
