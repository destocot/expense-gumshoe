import Brand from '@/components/brand'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <main>
      <div className='flex flex-col gap-y-4 py-16'>
        <Brand />

        <form className='flex flex-col gap-y-2'>
          <Input placeholder='Username' />
          <Input placeholder='Password' />
          <Button className='w-full'>Login</Button>
        </form>

        <span className='text-sm'>
          Don't have an account? Click{' '}
          <Link
            href='/register'
            className={cn(
              buttonVariants({ variant: 'link' }),
              'px-0 font-semibold',
            )}
          >
            here
          </Link>{' '}
          to register.
        </span>
      </div>
    </main>
  )
}
