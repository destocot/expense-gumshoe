import { Card, CardContent } from '@ui/card'
import { ScrollArea } from '@ui/scroll-area'
import { ExpenseList } from '@expenses/components/expense-list'
import { PiggyBankIcon, TrendingDownIcon } from 'lucide-react'
import { findAllExpenses } from '@expenses/queries'

interface ExpenseListServerProps {
  userId: number
}

export const ExpenseListServer = async ({ userId }: ExpenseListServerProps) => {
  const { data: expenses } = await findAllExpenses({
    where: {
      profileId: userId,
    },
  })

  if (expenses.length === 0) {
    return (
      <Card className='w-full border-2 border-dashed'>
        <CardContent className='flex flex-col items-center gap-6'>
          <div className='relative'>
            <div className='bg-primary/10 rounded-full p-4'>
              <PiggyBankIcon className='text-primary size-12' />
            </div>
            <div className='absolute -top-2 -right-2'>
              <div className='bg-background rounded-full border p-1 shadow-sm'>
                <TrendingDownIcon className='text-muted-foreground size-5' />
              </div>
            </div>
          </div>

          <div className='space-y-2 text-center'>
            <h3 className='text-xl font-semibold tracking-tight'>No expenses yet</h3>
            <p className='text-muted-foreground max-w-xs'>
              Start tracking your spending by creating your first expense.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <ScrollArea className='h-[calc(100dvh-24rem)] w-[calc(100%+1rem)] pr-4'>
      <ExpenseList expenses={expenses} />
    </ScrollArea>
  )
}
