import { LogoutButton } from '@/resources/auth/components/logout-button'

export default function Page() {
  return (
    <div className='container space-y-16 py-16'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>Profile</h1>

        <LogoutButton />
      </div>
    </div>
  )
}
