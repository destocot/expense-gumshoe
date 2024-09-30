import { cn, formatMoney } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import { SelectCheck } from '@/drizzle/schema'

type CardProps = React.ComponentProps<typeof Card> & {
  check: SelectCheck
  name?: string
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
        <div className='flex items-center gap-x-0.5'>
          <span>$</span>
          <span className='rounded bg-success p-0.5 text-success-foreground'>
            {formatMoney(check.amount).slice(1)}
          </span>
        </div>
      </CardContent>
      <CardFooter className='flex-col items-start'>
        <Link
          className='text-sm opacity-50 transition hover:underline'
          href={`/c/${check.checkId}`}
        >
          # {check.checkId}
        </Link>
        <div className='h-0.5 bg-muted' />
      </CardFooter>
    </Card>
  )
}
