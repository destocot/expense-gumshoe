import { formatMoney } from '@/lib/utils'
import type { Expense } from '@/models/Expense'
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react'
import { DeleteExpenseButton } from '@/components/delete-expense-button'

type ExpenseListProps = { expenses: Array<Expense> }

const ExpenseList = ({ expenses }: ExpenseListProps) => {
  return (
    <ul className='flex flex-col gap-y-0.5'>
      {expenses.map((expense) => (
        <li key={expense.id} className='flex items-center gap-x-2'>
          {expense.type === 'income' && (
            <PlusCircleIcon size={16} className='stroke-success' />
          )}
          {expense.type === 'expense' && (
            <MinusCircleIcon size={16} className='stroke-destructive' />
          )}
          <span className='tabular-nums'>{formatMoney(expense.amount)}</span>

          <DeleteExpenseButton id={expense.id} className='ml-auto' />
        </li>
      ))}
    </ul>
  )
}
export default ExpenseList
