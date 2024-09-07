import type { Expense } from '@/models/Expense'
import { ExpenseItem } from './expense-item'

type ExpenseListProps = { expenses: Array<Expense> }

const ExpenseList = ({ expenses }: ExpenseListProps) => {
  return (
    <ul className='flex flex-col gap-y-2.5'>
      {expenses.map((expense) => {
        return <ExpenseItem key={expense._id.toString()} expense={expense} />
      })}
    </ul>
  )
}
export default ExpenseList
