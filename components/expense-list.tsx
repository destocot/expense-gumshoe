import type { Expense } from '@/models/Expense'
import { ExpenseItem } from './expense-item'
import { Document } from 'mongoose'

type ExpenseListProps = { expenses: Array<Expense> }

const toObjects = <T extends Document>(
  documents: T[],
): Array<Omit<T, keyof Document> & { _id: string }> =>
  documents.map((document) => {
    return document.toObject({ flattenObjectIds: true })
  })

const ExpenseList = ({ expenses }: ExpenseListProps) => {
  const expensesObjects = toObjects(expenses)

  return (
    <ul className='flex flex-col gap-y-2'>
      {expensesObjects.map((expense) => {
        return <ExpenseItem key={expense._id} expense={expense} />
      })}
    </ul>
  )
}
export default ExpenseList
