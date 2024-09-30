import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { HomeIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='container max-w-lg'>
      <Link
        href='/'
        className={cn(
          buttonVariants({ variant: 'outline', size: 'icon' }),
          'absolute right-2 top-2',
        )}
      >
        <HomeIcon />
      </Link>

      {children}
    </div>
  )
}
