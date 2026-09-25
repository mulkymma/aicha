import { NextResponse } from 'next/server'
import { findAdminUser, getAdminUser, getAdminUserBranch } from '@/lib/admin-users'

export async function POST(request: Request) {
  const details = await request.json().catch(() => ({ email: '', phone: '', password: '' }))
  const email = String(details.email ?? '').trim().toLowerCase()
  const phone = String(details.phone ?? '').trim()
  const password = String(details.password ?? '')
  const configuredEmail = process.env.ADMIN_EMAIL
  const configuredPhone = process.env.ADMIN_PHONE
  const configuredPassword = process.env.ADMIN_PASSWORD
  const sessionToken = process.env.ADMIN_SESSION_TOKEN || 'local-admin-session'

  const validEnvUser = configuredEmail && configuredPhone && configuredPassword && email === configuredEmail && phone === configuredPhone && password === configuredPassword
  const validRegisteredUser = await findAdminUser(email, phone, password)

  if (!validEnvUser && !validRegisteredUser) {
    return NextResponse.json({ error: 'Invalid login details' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  const registeredUser = validRegisteredUser ? await getAdminUser(email, phone) : null
  const branch = validRegisteredUser ? await getAdminUserBranch(email, phone) : process.env.ADMIN_BRANCH || 'Nyali Branch'
  const role = validRegisteredUser ? registeredUser?.role || 'staff' : process.env.ADMIN_ROLE || 'staff'
  const name = validRegisteredUser ? registeredUser?.name || email : process.env.ADMIN_NAME || configuredEmail || email
  response.cookies.set('admin_session', sessionToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  })
  response.cookies.set('admin_branch', branch || 'Nyali Branch', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  })
  response.cookies.set('admin_role', role, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 8 })
  response.cookies.set('admin_name', name, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 8 })

  return response
}