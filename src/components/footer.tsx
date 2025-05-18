export const Footer = () => {
  return (
    <footer className='h-16'>
      <div className='container flex h-full flex-col items-center justify-center gap-1 sm:flex-row sm:justify-between'>
        <span className='text-muted-foreground text-sm font-bold tracking-tight'>
          Expense Gumshoe
        </span>

        <span className='text-muted-foreground text-sm'>
          &copy; {new Date().getFullYear()} Khurram Ali. All rights reserved.
        </span>
      </div>
    </footer>
  )
}
