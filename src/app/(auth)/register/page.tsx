import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { RegisterForm } from '@/resources/auth/components/register-form'
import Link from 'next/link'

export default async function Page() {
  return (
    <div className='grid h-full place-items-center'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>Register and get started in a few easy steps.</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter>
          <p className='text-muted-foreground text-sm'>
            Already have an account? Click{' '}
            <Link href='/login' className='hover:text-foreground transition'>
              here
            </Link>{' '}
            to login.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
