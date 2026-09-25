import type { OrderRecord } from '@/lib/orders'

export async function sendOrderEmail(to: string, orderId: string, subject: string, order: OrderRecord) {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM || !to) return
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: process.env.EMAIL_FROM, to, subject: `Ai-CHA ${orderId}: ${subject}`, html: `<p>${subject}</p><p>Branch: ${order.branch}</p><p>Delivery address: ${order.address || 'Pickup at branch'}</p><p>Total: KSh ${order.total}</p>` }),
  }).catch(() => undefined)
}