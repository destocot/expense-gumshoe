import { ExpenseItem } from './expense-item'
import { SelectExpense } from '@/drizzle/schema'

type ExpenseListProps = { expenses: Array<SelectExpense> }

const ExpenseList = ({ expenses }: ExpenseListProps) => {
  return (
    <ul className='flex flex-col gap-y-2.5'>
      {expenses.map((expense) => {
        return <ExpenseItem key={expense.expenseId} expense={expense} />
      })}
    </ul>
  )
}
export default ExpenseList
