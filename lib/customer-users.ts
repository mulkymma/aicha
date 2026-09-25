import { randomBytes, scryptSync, timingSafeEqual } from 'crypto'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

type CustomerUser = { email: string; name: string; phone: string; salt: string; passwordHash: string }
const usersPath = path.join(process.cwd(), 'data', 'customer-users.json')

async function readUsers(): Promise<CustomerUser[]> {
  try { return JSON.parse(await readFile(usersPath, 'utf8')) as CustomerUser[] } catch { return [] }
}

export async function findCustomer(email: string, password: string) {
  const user = (await readUsers()).find((item) => item.email === email)
  if (!user) return null
  const hash = scryptSync(password, Buffer.from(user.salt, 'hex'), 64)
  return timingSafeEqual(hash, Buffer.from(user.passwordHash, 'hex')) ? user : null
}

export async function getCustomer(email: string) { return (await readUsers()).find((user) => user.email === email) || null }

export async function createCustomer(email: string, name: string, phone: string, password: string) {
  const users = await readUsers()
  if (users.some((user) => user.email === email)) return false
  const salt = randomBytes(16)
  users.push({ email, name, phone, salt: salt.toString('hex'), passwordHash: scryptSync(password, salt, 64).toString('hex') })
  await writeFile(usersPath, JSON.stringify(users, null, 2))
  return true
}