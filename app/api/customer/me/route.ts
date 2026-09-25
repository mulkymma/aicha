import { NextRequest, NextResponse } from 'next/server'
import { getCustomer } from '@/lib/customer-users'

export async function GET(request: NextRequest) {
  const email = request.cookies.get('customer_session')?.value
  const customer = email ? await getCustomer(email) : null
  if (!customer) return NextResponse.json({ error: 'Customer login required.' }, { status: 401 })
  return NextResponse.json({ customer: { name: customer.name, email: customer.email, phone: customer.phone } })
}