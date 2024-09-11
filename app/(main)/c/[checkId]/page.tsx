import { BrandWithHomeLink } from '@/components/brand'
import { CheckCard } from '@/components/check-card'
import { formatMoney } from '@/lib/utils'
import { validateRequest } from '@/lib/validate-request'
import { findCheckByCheckId } from '@/queries/check.queries'
import { notFound, redirect } from 'next/navigation'

type CheckPageProps = { params: { checkId: string } }

const CheckPage = async (props: CheckPageProps) => {
  const checkId = props.params.checkId
  if (!checkId) notFound()

  const { user: authUser } = await validateRequest()
  if (!authUser) redirect('/login')

  const check = await findCheckByCheckId(checkId)
  if (!check) notFound()

  return (
    <main>
      <div className='flex flex-col gap-y-4 py-16'>
        <BrandWithHomeLink />
        <CheckCard check={check} name={authUser.username} />
      </div>
    </main>
  )
}
export default CheckPage
