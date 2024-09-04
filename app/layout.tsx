import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'

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
    <html lang='en' suppressHydrationWarning>
      <body className={cn('bg-body-texture', inter.className)}>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          disableTransitionOnChange
          themes={['light', 'dark', 'cobalt']}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
