import { Brand } from '@/components/brand'
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
import { RegisterForm } from './_components/register-form'

export default function RegisterPage() {
  return (
    <main>
      <div className='flex flex-col gap-y-4 py-16'>
        <Brand />
        <Card className='border-0 sm:border'>
          <CardHeader>
            <CardTitle>Register</CardTitle>
          </CardHeader>

          <CardContent>
            <RegisterForm />
          </CardContent>

          <CardFooter>
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
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
