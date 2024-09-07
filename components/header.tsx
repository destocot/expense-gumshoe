import { validateRequest } from '@/lib/validate-request'
import { LogoutButton } from './logout-button'
import Link from 'next/link'
import { ModeToggle } from './mode-toggle'
import { buttonVariants } from './ui/button'

export const Header = async () => {
  const { user } = await validateRequest()
  // tsret

  return (
    <header className='bg-primary'>
      <nav className='container max-w-lg'>
        <div className='h-6 bg-primary px-2 text-right text-primary-foreground'>
          {user ? <SignedIn username={user.username} /> : <SignedOut />}
        </div>
      </nav>
    </header>
  )
}

type SignedInProps = { username: string }

const SignedIn = ({ username }: SignedInProps) => {
  return (
    <div className='flex h-full items-center justify-end gap-x-2.5 text-sm'>
      <span className='whitespace-nowrap'>{username}</span>
      <ModeToggle />
      <Link
        href='/dashboard'
        className={buttonVariants({
          size: 'sm',
          variant: 'ghost',
          className: 'h-full rounded-none',
        })}
      >
        Dashboard
      </Link>
      <LogoutButton />
    </div>
  )
}

const SignedOut = () => {
  return (
    <div className='flex h-full items-center justify-end gap-x-2'>
      <Link href='/login' className='text-sm hover:text-primary-foreground/80'>
        Login / Register
      </Link>
      <ModeToggle />
    </div>
  )
}
