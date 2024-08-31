import { buttonVariants } from '@/components/ui/button'
import { validateRequest } from '@/lib/validate-request'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { HomeIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user } = await validateRequest()
  if (user) redirect('/')

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
