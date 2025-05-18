import 'server-only'
import { Prisma } from '@/generated/prisma'
import { prisma } from '@/lib/prisma'
import { authGuard } from '@/lib/server-utils'
import { Profile } from '@profiles/types'

export async function createProfile(payload: Prisma.ProfileCreateInput) {
  await prisma.profile.create({ data: payload })
}

export async function findOneProfile(where?: Prisma.ProfileWhereUniqueInput) {
  const loggedInUser = await authGuard()

  const profileId = where?.id ? where.id : +loggedInUser.id

  let profile = await prisma.profile.findUnique({
    where: { id: profileId, ...(where ? { where } : {}) },
  })

  if (!profile) {
    profile = await prisma.profile.create({
      data: {
        id: profileId,
        checkBreakdown: { income: 0.34, savings: 0.33, other: 0.33 },
      },
    })
  }

  return profile as Profile
}
