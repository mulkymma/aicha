'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, phone, password }),
    })

    if (response.ok) {
      window.location.href = '/admin'
      return
    }

    setError('Incorrect login details or admin access is not configured.')
    setLoading(false)
  }

  return <main className="flex min-h-screen items-center justify-center bg-[#fff5f1] px-5 text-[#38221d]"><form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl border border-[#eadbd1] bg-[#fffdf8] p-7 shadow-sm sm:p-9"><div className="mb-8"><div className="flex size-11 items-center justify-center rounded-full bg-[#e9002b] text-lg font-bold text-white">A</div><p className="mt-6 text-xs font-bold uppercase tracking-[.2em] text-[#f5a623]">Ai-CHA admin</p><h1 className="mt-2 font-serif text-4xl">Welcome back.</h1><p className="mt-2 text-sm text-[#8f7167]">Enter your login details to access the operations center.</p></div><div className="flex flex-col gap-4"><label className="text-sm font-semibold">Email address<input autoFocus type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#d9d0c0] bg-[#fff5f1] px-4 outline-none focus:border-[#f5a623]" required /></label><label className="text-sm font-semibold">Phone number<input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#d9d0c0] bg-[#fff5f1] px-4 outline-none focus:border-[#f5a623]" required /></label><label className="text-sm font-semibold">Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#d9d0c0] bg-[#fff5f1] px-4 outline-none focus:border-[#f5a623]" required /></label></div>{error && <p className="mt-3 text-sm font-semibold text-[#b0443b]">{error}</p>}<button type="submit" disabled={loading} className="mt-6 h-12 w-full rounded-full bg-[#e9002b] font-semibold text-white transition hover:bg-[#b80022] disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Verifying...' : 'Access admin'}</button><p className="mt-5 text-center text-sm text-[#8f7167]">Need an account? <Link href="/admin/register" className="font-semibold text-[#e9002b]">Register</Link></p></form></main>
}