import { NextResponse } from 'next/server'
import { createAdminUser } from '@/lib/admin-users'

export async function POST(request: Request) {
  const { name, email, phone, password, branch } = await request.json().catch(() => ({ name: '', email: '', phone: '', password: '', branch: '' }))

  if (!name || !email || !phone || !password || password.length < 8 || !['Nyali Branch', 'Fontanella Branch'].includes(branch)) {
    return NextResponse.json({ error: 'Complete all fields and choose a branch. Passwords need at least 8 characters.' }, { status: 400 })
  }

  const created = await createAdminUser(name.trim(), email.trim().toLowerCase(), phone.trim(), password, branch)
  if (!created) return NextResponse.json({ error: 'An account with that email or phone already exists.' }, { status: 409 })

  return NextResponse.json({ ok: true })
}