import Brand from '@/components/brand'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createUser } from '@/lib/actions'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <main>
      <div className='flex flex-col gap-y-4 py-16'>
        <Brand />

        <form action={createUser} className='flex flex-col gap-y-2'>
          <Input placeholder='Username' name='username' />
          <Input placeholder='Password' name='password' />
          <Input placeholder='Confirm Password' name='confirmPassword' />
          <Button className='w-full'>Register</Button>
        </form>

        <span className='text-sm'>
          Already have an account? Click{' '}
          <Link
            href='/login'
            className={cn(
              buttonVariants({ variant: 'link' }),
              'px-0 font-semibold',
            )}
          >
            here
          </Link>{' '}
          to login.
        </span>
      </div>
    </main>
  )
}
