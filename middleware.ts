import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/admin/login' || request.nextUrl.pathname === '/admin/register') return NextResponse.next()

  const sessionToken = process.env.ADMIN_SESSION_TOKEN || 'local-admin-session'
  const sessionCookie = request.cookies.get('admin_session')?.value

  if (sessionToken && sessionCookie === sessionToken) return NextResponse.next()

  return NextResponse.redirect(new URL('/admin/login', request.url))
}

export const config = {
  matcher: ['/admin/:path*'],
}