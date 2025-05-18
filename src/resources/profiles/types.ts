import { Profile as PrismaProfile } from '@/generated/prisma'

export interface Profile extends Omit<PrismaProfile, 'checkBreakdown'> {
  checkBreakdown: {
    income: number
    savings: number
    other: number
  }
}
