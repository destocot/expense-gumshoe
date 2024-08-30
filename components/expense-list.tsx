import { formatMoney } from '@/lib/utils'
import type { Expense } from '@/models/Expense'

type ExpenseListProps = { expenses: Array<Expense> }

const ExpenseList = ({ expenses }: ExpenseListProps) => {
  return (
    <ul>
      {expenses.map((expense) => {
        return <li key={expense.id}>{formatMoney(expense.amount)}</li>
      })}
    </ul>
  )
}
export default ExpenseList
