'use client'

import { Button } from '@/components/ui/button'
import { deleteExpense } from '@/lib/actions'

type DeleteExpenseButtonProps = { id: string }

const DeleteExpenseButton = ({ id }: DeleteExpenseButtonProps) => {
  const clickHandler = async () => {
    await deleteExpense({ id })
  }

  return (
    <Button
      size='sm'
      variant='destructive'
      onClick={clickHandler}
      className='w-auto max-w-[120px]'
    >
      Delete
    </Button>
  )
}
export default DeleteExpenseButton
