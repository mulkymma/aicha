import { NextResponse } from 'next/server'
import { findCustomer } from '@/lib/customer-users'

export async function POST(request: Request) {
  const details = await request.json().catch(() => ({}))
  const email = String(details.email || '').trim().toLowerCase()
  const customer = await findCustomer(email, String(details.password || ''))
  if (!customer) return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 })
  const response = NextResponse.json({ ok: true, customer: { email: customer.email, name: customer.name, phone: customer.phone } })
  response.cookies.set('customer_session', customer.email, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 24 * 30 })
  return response
}