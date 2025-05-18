import { authGuard } from '@/lib/server-utils'
import ClientPage from './client-page'

export default async function Page() {
  await authGuard()

  return <ClientPage />
}
