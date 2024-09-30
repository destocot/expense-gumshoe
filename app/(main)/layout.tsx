import { Header } from '@/components/header'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className='container max-w-lg'>{children}</main>
    </>
  )
}
