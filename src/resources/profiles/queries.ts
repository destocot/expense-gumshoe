import 'server-only'
import { Prisma } from '@/generated/prisma'
import { prisma } from '@/lib/prisma'
import { authGuard } from '@/lib/server-utils'
import { Profile } from './types'

export async function createProfile(payload: Prisma.ProfileCreateInput) {
  await prisma.profile.create({ data: payload })
}

export async function findOneProfile<T extends Prisma.ProfileFindUniqueArgs>(
  opts: Prisma.SelectSubset<T, Prisma.ProfileFindUniqueArgs>,
) {
  await authGuard()

  const profile = await prisma.profile.findUnique(opts)

  if (!profile) throw new Error('Profile not found')

  const { checkBreakdown, ...rest } = profile

  return { ...rest, checkBreakdown: checkBreakdown as Profile['checkBreakdown'] }
}
