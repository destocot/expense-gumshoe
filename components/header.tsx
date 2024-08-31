import { validateRequest } from '@/lib/validate-request'
import { LogoutButton } from './logout-button'
import Link from 'next/link'

export const Header = async () => {
  const { user } = await validateRequest()

  return (
    <header className='bg-primary'>
      <nav className='container max-w-lg'>
        <div className='rounded-b bg-primary px-2 text-right text-primary-foreground'>
          {user ? <SignedIn username={user.username} /> : <SignedOut />}
        </div>
      </nav>
    </header>
  )
}

type SignedInProps = { username: string }

const SignedIn = ({ username }: SignedInProps) => {
  return (
    <div className='flex justify-end gap-x-4 text-sm'>
      <span>{username}</span>
      <LogoutButton />
    </div>
  )
}

const SignedOut = () => {
  return (
    <Link href='/login' className='text-sm hover:text-primary-foreground/80'>
      Login / Register
    </Link>
  )
}
