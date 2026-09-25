import { NextRequest, NextResponse } from 'next/server'
import { listOrders, updateOrder } from '@/lib/orders'

function getStaffBranch(request: NextRequest) {
  if (request.cookies.get('admin_role')?.value === 'superadmin') return ''
  return request.cookies.get('admin_branch')?.value || process.env.ADMIN_BRANCH || ''
}

export async function GET(request: NextRequest) {
  const branch = getStaffBranch(request)
  if (!branch && request.cookies.get('admin_role')?.value !== 'superadmin') return NextResponse.json({ error: 'Staff branch is not configured.' }, { status: 403 })
  return NextResponse.json({ orders: await listOrders(branch), branch })
}

export async function PATCH(request: NextRequest) {
  const branch = getStaffBranch(request)
  const { id, paymentStatus, status, seen, deliveryPerson } = await request.json().catch(() => ({}))
  const order = (await listOrders(branch)).find((item) => item.id === id)
  if (!order) return NextResponse.json({ error: 'Order not found for this branch.' }, { status: 404 })
  const updated = await updateOrder(id, { paymentStatus, status, seen, deliveryPerson })
  return NextResponse.json({ ok: true, order: updated })
}