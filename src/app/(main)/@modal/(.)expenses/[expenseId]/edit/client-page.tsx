'use client'

import { ResponsiveModal } from '@/components/responsive-modal'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card'
import { Expense } from '@/generated/prisma'
import { EditExpenseForm } from '@expenses/components/edit-expense-form'
import { useRouter } from 'next/navigation'

interface ClientPageProps {
  expense: Expense
}

export default function ClientPage({ expense }: ClientPageProps) {
  const router = useRouter()
  const handleOpenChange = () => void router.back()

  return (
    <ResponsiveModal open={true} onOpenChange={handleOpenChange}>
      <Card className='sm:bg-card border-0 bg-transparent shadow-none'>
        <CardHeader>
          <CardTitle>Edit Expense</CardTitle>
          <CardDescription>Modify the details below to update this expense.</CardDescription>
        </CardHeader>

        <CardContent>
          <EditExpenseForm onSuccess={handleOpenChange} defaultValues={expense} />
        </CardContent>
      </Card>
    </ResponsiveModal>
  )
}
