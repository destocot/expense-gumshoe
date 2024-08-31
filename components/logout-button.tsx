'use client'

import { logoutUser } from '@/lib/actions'
import { Button } from './ui/button'

export const LogoutButton = () => {
  const handleClick = async () => {
    await logoutUser()
  }

  return (
    <Button
      variant='destructive'
      size='sm'
      className='h-fit rounded-none'
      onClick={handleClick}
    >
      Logout
    </Button>
  )
}
