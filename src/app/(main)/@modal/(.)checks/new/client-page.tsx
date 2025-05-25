'use client'

import { ResponsiveModal } from '@/components/responsive-modal'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card'
import { CreateCheckForm } from '@checks/components/create-check-form'
import { useRouter } from 'next/navigation'

export default function ClientPage() {
  const router = useRouter()
  const handleOpenChange = () => void router.back()

  return (
    <ResponsiveModal open={true} onOpenChange={handleOpenChange}>
      <Card className='sm:bg-card border-0 bg-transparent shadow-none'>
        <CardHeader>
          <CardTitle>Deposit Check</CardTitle>
          <CardDescription>Fill out the details below to deposit check.</CardDescription>
        </CardHeader>

        <CardContent>
          <CreateCheckForm onSuccess={handleOpenChange} />
        </CardContent>
      </Card>
    </ResponsiveModal>
  )
}
