import { NextRequest, NextResponse } from 'next/server'
import { createOrder } from '@/lib/orders'
import { getCustomer } from '@/lib/customer-users'

export async function POST(request: NextRequest) {
  const order = await request.json().catch(() => null)
  const email = request.cookies.get('customer_session')?.value || ''
  const customer = await getCustomer(email)
  if (!customer || !order?.branch || !order?.items || !order?.total || !order?.mpesaCode) {
    return NextResponse.json({ error: 'Log in and complete your order and M-Pesa details.' }, { status: 401 })
  }

  const created = await createOrder({
    customer: customer.name,
    customerEmail: customer.email,
    phone: customer.phone,
    address: String(order.address || '').trim(),
    branch: String(order.branch),
    type: String(order.type),
    items: String(order.items),
    total: Number(order.total),
    mpesaCode: String(order.mpesaCode).trim(),
  })
  return NextResponse.json({ ok: true, order: created })
}