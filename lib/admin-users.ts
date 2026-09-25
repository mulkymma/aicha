import { randomBytes, scryptSync, timingSafeEqual } from 'crypto'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

type AdminUser = { name?: string; email: string; phone: string; branch?: string; role?: 'staff' | 'superadmin'; salt: string; passwordHash: string }

const usersPath = path.join(process.cwd(), 'data', 'admin-users.json')

async function readUsers(): Promise<AdminUser[]> {
  try {
    return JSON.parse(await readFile(usersPath, 'utf8')) as AdminUser[]
  } catch {
    return []
  }
}

export async function findAdminUser(email: string, phone: string, password: string) {
  const user = (await readUsers()).find((item) => item.email === email && item.phone === phone)
  if (!user) return false

  const hash = scryptSync(password, Buffer.from(user.salt, 'hex'), 64)
  return timingSafeEqual(hash, Buffer.from(user.passwordHash, 'hex'))
}

export async function getAdminUserBranch(email: string, phone: string) {
  const user = (await readUsers()).find((item) => item.email === email && item.phone === phone)
  return user?.branch || ''
}

export async function getAdminUser(email: string, phone: string) {
  return (await readUsers()).find((item) => item.email === email && item.phone === phone) || null
}

export async function createAdminUser(name: string, email: string, phone: string, password: string, branch: string) {
  const users = await readUsers()
  if (users.some((user) => user.email === email || user.phone === phone)) return false

  const salt = randomBytes(16)
  const passwordHash = scryptSync(password, salt, 64)
  users.push({ name, email, phone, branch, role: 'staff', salt: salt.toString('hex'), passwordHash: passwordHash.toString('hex') })
  await writeFile(usersPath, JSON.stringify(users, null, 2))
  return true
}