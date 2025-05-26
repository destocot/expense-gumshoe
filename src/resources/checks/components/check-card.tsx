import type { Check } from '@/generated/prisma'
import { formatCurrency } from '@/lib/utils'

interface CheckCardProps {
  check: Check
}

export const CheckCard = ({ check }: CheckCardProps) => {
  return (
    <div className='bg-muted mx-auto w-full max-w-md rounded-md border p-3 shadow-md'>
      <div className='text-muted-foreground mb-3 flex items-center justify-between text-xs'>
        <div className='font-medium'>Check #{check.id}</div>
        <div>{check.createdAt.toLocaleDateString()}</div>
      </div>

      <div className='mb-3'>
        <div className='text-right'>
          <span className='text-foreground text-xl font-bold'>{formatCurrency(check.amount)}</span>
        </div>
      </div>

      <div className='mb-3'>
        <div className='text-muted-foreground mb-1 text-xs'>Memo:</div>
        <div className='min-h-[20px] border-b pb-1'>
          <span className='text-foreground text-xs'>{check.description || '—'}</span>
        </div>
      </div>

      <div className='border-t pt-1'>
        <div className='text-muted-foreground text-center font-mono text-xs'>
          {String(check.id).padStart(4, '0')}
        </div>
      </div>
    </div>
  )
}
