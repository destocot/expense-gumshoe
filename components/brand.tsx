import { cn } from '@/lib/utils'
import Link from 'next/link'

type BrandProps = { className?: string }

const Brand = ({ className }: BrandProps) => {
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
export default Brand
