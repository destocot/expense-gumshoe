'use client'

import { Button } from '@ui/button'
import { signOut } from '@/lib/auth-client'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export const LogoutButton = () => {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  async function handleClick() {
    await signOut({
      fetchOptions: {
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
          toast.success("You've been logged out. See you soon!")
          router.push('/login')
        },
      },
    })
  }

  return (
    <Button
      size='sm'
      variant='destructive'
      onClick={handleClick}
      disabled={isPending}
      className='min-w-[4.4rem]'
    >
      {isPending ? <Loader2Icon className='animate-spin' /> : 'Logout'}
    </Button>
  )
}
