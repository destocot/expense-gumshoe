import { auth } from '@/auth.config'
import { db } from '@/drizzle'
import { checks, SelectCheck } from '@/drizzle/schema'
import { and, desc, eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export const findChecks = async (
  limit?: number,
): Promise<Array<SelectCheck>> => {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const query = db
    .select()
    .from(checks)
    .where(eq(checks.userId, session.user.userId))
    .orderBy(desc(checks.createdAt))

  if (limit) query.limit(limit)

  return await query
}

export const findCheck = async (
  checkId: SelectCheck['checkId'],
): Promise<SelectCheck | null> => {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const check = await db
    .select()
    .from(checks)
    .where(
      and(eq(checks.checkId, checkId), eq(checks.userId, session.user.userId)),
    )
    .then((res) => res[0] ?? null)

  return check
}
