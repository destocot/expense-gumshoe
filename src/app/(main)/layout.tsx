import { Footer } from '@/components/footer'
import Link from 'next/link'
import { ThemeToggler } from '@/components/theme-toggler'
import { Button } from '@ui/button'
import { UserIcon } from 'lucide-react'

export default function MainLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className='min-h-[calc(100dvh-9rem)]'>
        {children}
        {modal}
      </main>
      <Footer />
    </>
  )
}

const Header = () => {
  return (
    <header className='h-20'>
      <div className='container flex h-full items-center justify-between'>
        <Link
          href='/'
          className='bg-primary text-primary-foreground -rotate-3 rounded-sm px-1 py-0.5 text-lg font-bold tracking-tight sm:text-xl'
        >
          Expense Gumshoe
        </Link>

        <div className='flex items-center gap-4'>
          <Button variant='outline' size='sm' asChild>
            <Link href='/profile'>
              <UserIcon />
              <span className='hidden sm:inline'>Profile</span>
            </Link>
          </Button>

          <ThemeToggler />
        </div>
      </div>
    </header>
  )
}
