'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const logoUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-19%20at%2021.29.19-ciXqdzl2ccIT4atbuxjk6AC0ZZ9gT3.jpeg'

export function SiteHeader({ cartCount = 0, onCart }: { cartCount?: number; onCart?: () => void }) {
  return <><div className="bg-[#e9002b] px-5 py-2 text-center text-[11px] font-medium tracking-[0.18em] text-[#fff5f1]">FREE PICKUP ON ORDERS OVER KSH 1,000 · OPEN DAILY 8AM — 9PM</div><header className="sticky top-0 z-30 border-b border-[#ded8c9] bg-[#fff5f1]/95 backdrop-blur-md"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10"><Link href="/" className="flex items-center gap-3"><img src={logoUrl} alt="Ai-CHA Ice Cream & Tea" className="size-11 rounded-full object-cover" /><div><p className="font-serif text-xl font-semibold leading-none tracking-tight">Ai-CHA</p><p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.27em] text-[#8a7d68]">Ice cream & tea</p></div></Link><nav className="hidden items-center gap-8 text-sm font-medium text-[#556258] md:flex"><Link href="/menu" className="hover:text-[#e9002b]">Our menu</Link><Link href="/story" className="hover:text-[#e9002b]">Our story</Link><Link href="/visit" className="hover:text-[#e9002b]">Visit us</Link><Link href="/contact" className="hover:text-[#e9002b]">Contact</Link></nav>{onCart ? <Button onClick={onCart} className="rounded-full bg-[#e9002b] px-5 text-sm text-white hover:bg-[#b80022]"><ShoppingBag data-icon="inline-start" /> Cart {cartCount > 0 && <span className="ml-1">{cartCount}</span>}</Button> : <Link href="/menu"><Button className="rounded-full bg-[#e9002b] px-5 text-sm text-white hover:bg-[#b80022]">Order now</Button></Link>}</div></header></>
}

export function SiteFooter() {
  return <footer className="bg-[#e9002b] px-5 py-8 text-[#fff5f1] lg:px-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm sm:flex-row sm:items-center"><Link href="/" className="font-serif text-xl">Ai-CHA.</Link><p className="text-xs text-[#fff5f1]/75">Made with warmth in Mombasa</p></div></footer>
}

export function PageFrame({ children }: { children: React.ReactNode }) { return <main className="min-h-screen bg-[#fff5f1] text-[#e9002b]"><SiteHeader />{children}<SiteFooter /></main> }

