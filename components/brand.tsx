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

export const BrandWithHomeLink = () => (
  <div className='flex items-center justify-between'>
    <Brand />
    <Button size='icon' className='size-8' asChild>
      <Link href='/'>
        <HomeIcon />
      </Link>
    </Button>
  </div>
)
