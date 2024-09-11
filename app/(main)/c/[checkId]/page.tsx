import { BrandWithHomeLink } from '@/components/brand'
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

        <div className='mt-4 flex flex-col gap-y-8 rounded bg-background/80 px-3 py-6 shadow'>
          <div className='flex justify-between text-sm opacity-50'>
            <span>{authUser.username}</span>
            <span>#{check._id}</span>
          </div>
          <div className='flex items-end justify-between'>
            <span className='rounded bg-success px-0.5 font-medium'>
              {formatMoney(check.amount)}
            </span>
            <span className='text-sm opacity-50'>
              {new Date(check.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}
export default CheckPage
