import type { Expense } from '@/models/Expense'
import { ExpenseItem } from './expense-item'
import { toObjects } from '@/lib/utils'

type ExpenseListProps = { expenses: Array<Expense> }

const ExpenseList = ({ expenses }: ExpenseListProps) => {
  const expensesObjects = toObjects(expenses)

  return (
    <ul className='flex flex-col gap-y-2.5'>
      {expensesObjects.map((expense) => {
        return <ExpenseItem key={expense._id} expense={expense} />
      })}
    </ul>
  )
}
export default ExpenseList
