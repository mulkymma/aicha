import Link from 'next/link'
import Image from 'next/image'
import { PageFrame } from '@/components/site-shell'

const groups = [
  ['Best Sellers', ['Ai-Squash Lemonade — KSh 200', 'Ai-CHA Lemon Oolong — KSh 200', 'Ai-Mango Shake — KSh 200', 'Ai-Blueberry Shake — KSh 250', 'Ai-Strawberry Shake — KSh 250', 'Ai-Grape Shake — KSh 250']],
  ['Milk Tea', ['Brown Sugar Pearl — KSh 250', 'Taro Milk Tea — KSh 250', 'Matcha Milk Tea — KSh 250', 'Strawberry Milk Tea — KSh 250']],
  ['Real Fruit Tea', ['Passion Fruit Tea — KSh 250', 'Peach Fruit Tea — KSh 300', 'Grape Fruit Tea — KSh 300']],
  ['Coffee', ['Signature Latte — KSh 250', 'Iced Latte — KSh 300', 'Caramel Latte — KSh 300', 'Mocha — KSh 300']],
  ['Fresh Ice Cream', ['Strawberry, Vanilla or Chocolate — KSh 300', 'Ice Cream Cone — KSh 300', 'Blueberry Smoothie — KSh 300']],
  ['Ai-Scream Series', ['Sea Salt Cone — KSh 90', 'Vanilla Cone — KSh 90', 'Sea Salt & Vanilla Mix Cone — KSh 90', 'Cup upgrade — add KSh 10']],
]

export default function MenuPage() { return <PageFrame><section className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24"><p className="text-xs font-bold uppercase tracking-[.24em] text-[#f5a623]">The good stuff</p><h1 className="mt-3 max-w-2xl font-serif text-6xl leading-none tracking-[-.05em] sm:text-8xl">Find your <span className="italic text-[#f5a623]">happy.</span></h1><p className="mt-6 max-w-xl text-base leading-7 text-[#6e776f]">Explore every Ai-CHA favourite, from fresh fruit teas and milk tea to coffee, soft serve and the Ai-Scream series.</p><div className="mt-12 grid gap-5 md:grid-cols-2">{groups.map(([title, items]) => <section key={title} className="rounded-[1.5rem] border border-[#eadfd2] bg-[#fffdf8] p-6"><h2 className="font-serif text-3xl text-[#e9002b]">{title}</h2><div className="mt-5 flex flex-col gap-3">{(items as string[]).map((item) => { const [name, price] = item.split(' — '); return <div key={item} className="flex items-center justify-between gap-4 border-b border-[#eee5da] pb-3 text-sm text-[#5f6a62]"><div className="flex min-w-0 items-center gap-3"><Image src="/aicha%20drink.png" alt="" width={48} height={64} className="h-16 w-12 shrink-0 object-contain" /><span>{name}</span></div><strong className="whitespace-nowrap text-[#e9002b]">{price}</strong></div> })}</div></section>)}</div><div className="mt-12 rounded-[1.5rem] bg-[#e9002b] p-7 text-[#fff5f1]"><h2 className="font-serif text-3xl">Ready to order?</h2><p className="mt-2 text-sm text-[#fff5f1]/80">Choose your branch, customize your drink and select pickup or delivery.</p><Link href="/#menu" className="mt-5 inline-flex rounded-full bg-[#f5a623] px-5 py-3 text-sm font-bold text-white">Start an order</Link></div></section></PageFrame> }
