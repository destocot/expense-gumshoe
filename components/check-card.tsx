import { cn, formatMoney } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Check } from '@/models/Check'
import type { User } from '@/models/User'

type CardProps = React.ComponentProps<typeof Card> & {
  check: Check
  name?: User['username']
}

export const CheckCard = ({ className, check, name, ...props }: CardProps) => {
  return (
    <Card className={cn('', className)} {...props}>
      <CardHeader>
        <CardTitle className='self-end text-base opacity-50'>
          {new Date(check.createdAt).toDateString()}
        </CardTitle>
      </CardHeader>
      <CardContent className='flex justify-between gap-x-4'>
        <div className='flex flex-1 flex-col'>
          {name ? <span>{name}</span> : <span className='h-full' />}
          <div className='h-0.5 bg-muted' />
        </div>
        <div className='flex w-[calc(20%-1rem)] items-center gap-x-0.5'>
          <span>$</span>
          <span className='rounded bg-success p-0.5 text-success-foreground'>
            {formatMoney(check.amount).slice(1)}
          </span>
        </div>
      </CardContent>
      <CardFooter className='flex-col items-start'>
        <span className='text-sm opacity-50'># {check._id}</span>
        <div className='h-0.5 w-4/5 bg-muted' />
      </CardFooter>
    </Card>
  )
}
