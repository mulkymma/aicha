import { NextResponse } from 'next/server'
import { createCustomer } from '@/lib/customer-users'

export async function POST(request: Request) {
  const details = await request.json().catch(() => ({}))
  const email = String(details.email || '').trim().toLowerCase()
  const name = String(details.name || '').trim()
  const phone = String(details.phone || '').trim()
  const password = String(details.password || '')
  if (!email || !name || !phone || password.length < 8) return NextResponse.json({ error: 'Complete all fields. Password must be at least 8 characters.' }, { status: 400 })
  if (!await createCustomer(email, name, phone, password)) return NextResponse.json({ error: 'An account with that email already exists.' }, { status: 409 })
  return NextResponse.json({ ok: true })
}