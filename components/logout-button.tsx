'use client'

import { logout } from '@/actions/logout.action'
import { Button } from './ui/button'

export const LogoutButton = () => {
  const handleClick = async () => {
    await logout()
  }

  return (
    <Button
      variant='destructive'
      size='sm'
      className='h-full rounded-none'
      onClick={handleClick}
    >
      Logout
    </Button>
  )
}
