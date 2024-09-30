import { auth } from '@/auth.config'
import { db } from '@/drizzle'
import { type SelectUser, users } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export const findOneUser = async (
  userId: SelectUser['userId'],
): Promise<SelectUser> => {
  const session = await auth()
  if (session?.user?.userId !== userId) {
    throw new Error('Unauthorized')
  }

  return await db
    .select()
    .from(users)
    .where(eq(users.userId, userId))
    .then((res) => res[0])
}
