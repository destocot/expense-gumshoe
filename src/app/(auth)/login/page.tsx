import { LoginForm } from '@auth/components/login-form'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/card'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='grid h-full place-items-center'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle>Welcome Back!</CardTitle>
          <CardDescription>Log in to continue where you left off.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <p className='text-muted-foreground text-sm'>
            Don&apos;t have an account? Click{' '}
            <Link href='/register' className='hover:text-foreground transition'>
              here
            </Link>{' '}
            to register.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
