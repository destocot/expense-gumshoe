import { Card, CardContent } from '@ui/card'
import { authGuard } from '@/lib/server-utils'
import { CreateCheckForm } from '@checks/components/create-check-form'

export default async function Page() {
  await authGuard()

  return (
    <div className='container space-y-16 py-16'>
      <div className='mx-auto space-y-4 text-center'>
        <h1 className='text-4xl font-bold tracking-tight'>Deposit Check</h1>

        <p className='text-muted-foreground text-lg'>
          Fill out the details below to deposit check.
        </p>
      </div>

      <Card className='mx-auto w-full max-w-md'>
        <CardContent>
          <CreateCheckForm />
        </CardContent>
      </Card>
    </div>
  )
}
