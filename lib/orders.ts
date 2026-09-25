import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { sendOrderEmail } from '@/lib/order-email'

export type OrderRecord = {
  id: string
  customer: string
  customerEmail: string
  phone: string
  address: string
  branch: string
  type: string
  items: string
  total: number
  mpesaCode: string
  paymentStatus: 'Pending verification' | 'Verified' | 'Rejected'
  status: 'New' | 'Preparing' | 'Ready' | 'Completed'
  seen: boolean
  deliveryPerson?: string
  time: string
}

const ordersPath = path.join(process.cwd(), 'data', 'orders.json')

async function readOrders(): Promise<OrderRecord[]> {
  try {
    return JSON.parse(await readFile(ordersPath, 'utf8')) as OrderRecord[]
  } catch {
    return []
  }
}

export async function listOrders(branch?: string) {
  const orders = await readOrders()
  return branch ? orders.filter((order) => order.branch === branch) : orders
}

export async function createOrder(order: Omit<OrderRecord, 'id' | 'paymentStatus' | 'status' | 'time'>) {
  const orders = await readOrders()
  const newOrder: OrderRecord = { ...order, id: `#AIC-${Date.now().toString().slice(-6)}`, paymentStatus: 'Pending verification', status: 'New', seen: false, time: 'just now' }
  orders.unshift(newOrder)
  await writeFile(ordersPath, JSON.stringify(orders, null, 2))
  return newOrder
}

export async function updateOrder(orderId: string, changes: Partial<Pick<OrderRecord, 'paymentStatus' | 'status' | 'seen' | 'deliveryPerson'>>) {
  const orders = await readOrders()
  const index = orders.findIndex((order) => order.id === orderId)
  if (index === -1) return null
  orders[index] = { ...orders[index], ...changes }
  await writeFile(ordersPath, JSON.stringify(orders, null, 2))
  if (changes.status === 'Preparing') await sendOrderEmail(orders[index].customerEmail, orders[index].id, 'Your order has been seen and is being prepared.', orders[index])
  if (changes.status === 'Completed') await sendOrderEmail(orders[index].customerEmail, orders[index].id, 'Your order is completed and ready for delivery.', orders[index])
  return orders[index]
}

export async function markOrderSeen(orderId: string, deliveryPerson?: string) {
  const orders = await readOrders()
  const index = orders.findIndex((order) => order.id === orderId)
  if (index === -1) return null
  orders[index] = { ...orders[index], seen: true, deliveryPerson }
  await writeFile(ordersPath, JSON.stringify(orders, null, 2))
  await sendOrderEmail(orders[index].customerEmail, orders[index].id, deliveryPerson ? `Your order has been seen and assigned to ${deliveryPerson} for delivery.` : 'Your order has been seen by the branch team.', orders[index])
  return orders[index]
}