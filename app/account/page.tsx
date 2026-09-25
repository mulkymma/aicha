'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'

export default function AccountPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  async function submit(event: FormEvent) {
    event.preventDefault(); setError(''); setMessage('')
    const endpoint = mode === 'login' ? '/api/customer/login' : '/api/customer/register'
    const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, name, phone, password }) })
    const result = await response.json()
    if (!response.ok) return setError(result.error)
    if (mode === 'register') { setMode('login'); setMessage('Account created. Log in to continue.'); return }
    window.location.href = '/'
  }
  return <main className="flex min-h-screen items-center justify-center bg-[#fff5f1] px-5 text-[#38221d]"><form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-[#eadbd1] bg-[#fffdf8] p-7 sm:p-9"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#f5a623]">Ai-CHA account</p><h1 className="mt-2 font-serif text-4xl">{mode === 'login' ? 'Welcome back.' : 'Create account.'}</h1><p className="mt-2 text-sm text-[#8f7167]">Log in to place orders and follow their progress.</p><div className="mt-7 flex flex-col gap-4">{mode === 'register' && <><label className="text-sm font-semibold">Full name<input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#d9d0c0] px-4" required /></label><label className="text-sm font-semibold">Phone number<input value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#d9d0c0] px-4" required /></label></>}<label className="text-sm font-semibold">Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#d9d0c0] px-4" required /></label><label className="text-sm font-semibold">Password<input type="password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#d9d0c0] px-4" required /></label></div>{error && <p className="mt-3 text-sm font-semibold text-[#b0443b]">{error}</p>}{message && <p className="mt-3 text-sm font-semibold text-[#4d754d]">{message}</p>}<button className="mt-6 h-11 w-full rounded-full bg-[#e9002b] font-semibold text-white">{mode === 'login' ? 'Log in' : 'Register'}</button><button type="button" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); setMessage('') }} className="mt-4 w-full text-sm font-semibold text-[#e9002b]">{mode === 'login' ? 'Create a customer account' : 'Already have an account? Log in'}</button><Link href="/" className="mt-2 block text-center text-sm text-[#8f7167]">Back to menu</Link></form></main>
} 