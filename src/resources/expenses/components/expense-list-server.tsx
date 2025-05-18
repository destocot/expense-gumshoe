import { ScrollArea } from '@/components/ui/scroll-area'
import { prisma } from '@/lib/prisma'
import { ExpenseList } from '@expenses/components/expense-list'

export const ExpenseListServer = async () => {
  const expenses = await prisma.expense.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <ScrollArea className='h-[calc(100dvh-24rem)] w-[calc(100%+1rem)] pr-4'>
      <ExpenseList expenses={expenses} />
    </ScrollArea>
  )
}
