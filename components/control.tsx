import { auth } from '@/auth.config'

export const SignedIn = async (props: React.PropsWithChildren) => {
  const session = await auth()

  if (!session?.user) return null

  return <>{props.children}</>
}

export const SignedOut = async (props: React.PropsWithChildren) => {
  const session = await auth()

  if (!session?.user) {
    return <>{props.children}</>
  }

  return null
}
