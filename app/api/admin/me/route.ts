import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const name = request.cookies.get('admin_name')?.value
  if (!name) return NextResponse.json({ error: 'Admin login required.' }, { status: 401 })
  return NextResponse.json({ name, role: request.cookies.get('admin_role')?.value || 'staff', branch: request.cookies.get('admin_branch')?.value || 'Nyali Branch' })
}