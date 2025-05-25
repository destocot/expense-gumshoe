'use client'

import { Label } from '@ui/label'
import { Input } from '@ui/input'
import { Button } from '@ui/button'
import { signUp } from '@/lib/auth-client'
import { useState } from 'react'
import { toast } from 'sonner'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { flatten, safeParse } from 'valibot'
import { RegisterSchema, type RegisterSchemaErrors } from '@auth/validators'
import { FormError } from '@/components/form-error'

export const RegisterForm = () => {
  const [isPending, setIsPending] = useState(false)
  const [errors, setErrors] = useState<RegisterSchemaErrors>(undefined)
  const router = useRouter()

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    setErrors(undefined)
    const formData = new FormData(evt.target as HTMLFormElement)

    const values = safeParse(RegisterSchema, Object.fromEntries(formData.entries()))

    if (!values.success) {
      setErrors(flatten<typeof RegisterSchema>(values.issues).nested)
      return
    }

    await signUp.email(
      {
        name: values.output.name,
        username: values.output.username,
        email: values.output.email,
        password: values.output.password,
      },
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
          toast.success("Account created! You're all set to go.")
          router.push('/login')
        },
      },
    )
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='space-y-2'>
        <Label htmlFor='username'>Username</Label>
        <Input
          type='text'
          id='username'
          name='username'
          defaultValue='naruto'
          aria-describedby='username'
        />
        <FormError id='username-error' message={errors?.username?.[0]} />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          type='email'
          id='email'
          name='email'
          defaultValue='naruto@example.com'
          aria-describedby='email'
        />
        <FormError id='email-error' message={errors?.email?.[0]} />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='password'>Password</Label>
        <Input type='password' id='password' name='password' aria-describedby='password' />
        <FormError id='password-error' message={errors?.password?.[0]} />
      </div>

      <Button type='submit' className='w-full' disabled={isPending}>
        {isPending ? <Loader2Icon className='animate-spin' /> : 'Register'}
      </Button>
    </form>
  )
}
