import Brand from '@/components/brand'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LoginForm } from './_components/login-form'

export default function LoginPage() {
  return (
    <main>
      <div className='flex flex-col gap-y-4 py-16'>
        <Brand />

        <Card className='border-0 sm:border'>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>

          <CardContent>
            <LoginForm />
          </CardContent>

          <CardFooter>
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
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
