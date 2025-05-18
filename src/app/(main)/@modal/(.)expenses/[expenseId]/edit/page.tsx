import { authGuard } from '@/lib/server-utils'
import ClientPage from './client-page'
import { findOneExpense } from '@/resources/expenses/queries'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ expenseId: string }>
}

export default async function Page({ params }: PageProps) {
  await authGuard()

  const expenseId = (await params).expenseId

  const { data: expense } = await findOneExpense({ id: +expenseId })

  if (!expense) notFound()

  return <ClientPage expense={expense} />
}
