import { Footer } from '@/components/footer'
import { ThemeToggler } from '@/components/theme-toggler'
import Link from 'next/link'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className='h-[calc(100dvh-9rem)]'>{children}</main>
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

        <ThemeToggler />
      </div>
    </header>
  )
}
