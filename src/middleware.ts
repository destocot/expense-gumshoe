import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'

const publicAuthRoutes = new Set(['/login', '/register'])

export async function middleware(request: NextRequest) {
  const { nextUrl } = request
  const session = getSessionCookie(request)

  const isPublicAuthRoute = publicAuthRoutes.has(nextUrl.pathname)

  if (!session && !isPublicAuthRoute) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  if (session && isPublicAuthRoute) {
    return NextResponse.redirect(new URL('/', nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}
