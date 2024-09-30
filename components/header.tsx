import Link from 'next/link'
import { LogoutButton } from '@/components/logout-button'
import { ModeToggle } from '@/components/mode-toggle'
import { buttonVariants } from '@/components/ui/button'
import { auth } from '@/auth.config'
import { SignedIn, SignedOut } from '@/components/control'

export const Header = async () => {
  const session = await auth()

  return (
    <header className='bg-primary'>
      <nav className='container max-w-lg'>
        <div className='h-6 bg-primary px-2 text-right text-primary-foreground'>
          <SignedIn>
            <div className='flex h-full items-center justify-end gap-x-2.5 text-sm'>
              <span className='whitespace-nowrap'>
                {session?.user?.username}
              </span>
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
          </SignedIn>

          <SignedOut>
            <div className='flex h-full items-center justify-end gap-x-2'>
              <Link
                href='/login'
                className='text-sm hover:text-primary-foreground/80'
              >
                Login / Register
              </Link>
              <ModeToggle />
            </div>
          </SignedOut>
        </div>
      </nav>
    </header>
  )
}
