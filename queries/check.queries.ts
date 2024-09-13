import dbConnect from '@/lib/dbConnect'
import { validateRequest } from '@/lib/validate-request'
import CheckModel, { Check } from '@/models/Check'
import { redirect } from 'next/navigation'

export const findCheck = async (checkId: string): Promise<Check | null> => {
  const { user: authUser } = await validateRequest()
  if (!authUser) redirect('/login')

  await dbConnect()

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

export const findChecks = async (): Promise<Array<Check>> => {
  const { user: authUser } = await validateRequest()
  if (!authUser) redirect('/login')

  await dbConnect()

  const checkDocs = await CheckModel.find({ userId: authUser.id })

  const checks: Array<Check> = checkDocs.map((doc) => doc.toJSON())

  return checks
}
