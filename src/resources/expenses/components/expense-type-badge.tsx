import { Badge } from '@ui/badge'
import { cn } from '@/lib/utils'
import type { ExpenseType } from '@/generated/prisma'

interface ExpenseTypeBadgeProps {
  type: ExpenseType
}

export const ExpenseTypeBadge = ({ type }: ExpenseTypeBadgeProps) => {
  return (
    <Badge
      className={cn('rounded-full', {
        'bg-red-500 hover:bg-red-500': type === 'EXPENSE',
        'bg-green-500 hover:bg-green-500': type === 'INCOME',
        'bg-blue-500 hover:bg-blue-500': type === 'SAVINGS',
        'bg-yellow-500 hover:bg-yellow-500': type === 'OTHER',
      })}
    >
      <span className='w-14 text-center'>{type}</span>
    </Badge>
  )
}
