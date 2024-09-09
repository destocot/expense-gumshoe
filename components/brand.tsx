import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HomeIcon } from 'lucide-react'

type BrandProps = { className?: string }

export const Brand = ({ className }: BrandProps) => {
  return (
    <Link
      href='/'
      className={cn(
        'w-fit rounded bg-primary px-1 text-2xl font-bold tracking-tight text-primary-foreground',
        className,
      )}
    >
      Expense Gumshoe
    </Link>
  )
}

export const BrandWithHomeLink = ({
  children,
}: {
  children?: React.ReactNode
}) => (
  <div className='flex w-full items-center justify-between'>
    <Brand />
    <div className='flex gap-x-2'>
      <Button size='icon' className='size-8' asChild>
        <Link href='/'>
          <HomeIcon />
        </Link>
      </Button>
      {children}
    </div>
  </div>
)
