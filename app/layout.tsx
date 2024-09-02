import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

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
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          disableTransitionOnChange
          themes={['light', 'dark', 'cyberpunk']}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
