import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Expense Gumshoe',
    default: 'Expense Gumshoe',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='container max-w-lg'>
          <div className='rounded-b bg-primary px-2 text-right text-primary-foreground'>
            <Link
              href='/login'
              className='text-sm hover:text-primary-foreground/80'
            >
              Login/Register
            </Link>
          </div>

          {children}
        </div>
      </body>
    </html>
  )
}
