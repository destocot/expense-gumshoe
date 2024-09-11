import { validateRequest } from '@/lib/validate-request'
import CheckModel, { Check } from '@/models/Check'
import { redirect } from 'next/navigation'

export const findCheckByCheckId = async (
  checkId: string,
): Promise<Check | null> => {
  const { user: authUser } = await validateRequest()
  if (!authUser) redirect('/login')

  const checkDoc = await CheckModel.findOne({
    _id: checkId,
    userId: authUser.id,
  })

  if (checkDoc) {
    const check: Check = checkDoc.toJSON()
    return check
  }

  return null
}
