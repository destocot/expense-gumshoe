'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signIn } from '@/lib/auth-client'
import { useState } from 'react'
import { toast } from 'sonner'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { EmailSchema, LoginSchema, type LoginSchemaErrors } from '@/resources/auth/validators'
import { flatten, safeParse } from 'valibot'
import { FormError } from '@/components/form-error'

export const LoginForm = () => {
  const [isPending, setIsPending] = useState(false)
  const [errors, setErrors] = useState<LoginSchemaErrors>(undefined)
  const router = useRouter()

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    setErrors(undefined)
    const formData = new FormData(evt.target as HTMLFormElement)

    const values = safeParse(LoginSchema, Object.fromEntries(formData.entries()))

    if (!values.success) {
      setErrors(flatten<typeof LoginSchema>(values.issues).nested)
      return
    }

    const { usernameOrEmail, password } = values.output

    const { success: isEmail } = safeParse(EmailSchema, usernameOrEmail)

    if (isEmail) {
      await signIn.email(
        { email: usernameOrEmail, password },
        {
          onRequest: () => {
            setIsPending(true)
          },
          onResponse: () => {
            setIsPending(false)
          },
          onError: (ctx) => {
            toast.error(ctx.error.message)
          },
          onSuccess: () => {
            toast.success("Welcome back! You've logged in successfully.")
            router.push('/')
          },
        },
      )
    } else {
      await signIn.username(
        { username: usernameOrEmail, password },
        {
          onRequest: () => {
            setIsPending(true)
          },
          onResponse: () => {
            setIsPending(false)
          },
          onError: (ctx) => {
            toast.error(ctx.error.message)
          },
          onSuccess: () => {
            toast.success("Welcome back! You've logged in successfully.")
            router.push('/')
          },
        },
      )
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='space-y-2'>
        <Label htmlFor='usernameOrEmail'>Username or Email</Label>
        <Input
          type='text'
          id='usernameOrEmail'
          name='usernameOrEmail'
          defaultValue='naruto'
          aria-describedby='usernameOrEmail-error'
        />
        <FormError id='usernameOrEmail-error' message={errors?.usernameOrEmail?.[0]} />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='password'>Password</Label>
        <Input type='password' id='password' name='password' aria-describedby='password-error' />
        <FormError id='password-error' message={errors?.password?.[0]} />
      </div>

      <Button type='submit' className='w-full' disabled={isPending}>
        {isPending ? <Loader2Icon className='animate-spin' /> : 'Login'}
      </Button>
    </form>
  )
}
