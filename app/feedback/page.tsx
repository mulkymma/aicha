'use client'

import { ArrowLeft, Send } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function FeedbackPage() {
  const [sent, setSent] = useState(false)

  return (
    <main className="min-h-screen bg-[#fff5f1] px-5 py-8 text-[#e9002b] sm:px-8">
      <div className="mx-auto max-w-xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#7b8178] hover:text-[#e9002b]"><ArrowLeft data-icon="inline-start" /> Back to Ai-CHA</Link>
        <div className="mt-12 rounded-[2rem] border border-[#eadfd2] bg-[#fffdf8] p-6 shadow-sm sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-[#f5a623]">We&apos;d love to hear from you</p>
          <h1 className="mt-3 font-serif text-5xl leading-none tracking-[-.04em]">Share your feedback.</h1>
          <p className="mt-5 text-sm leading-6 text-[#6e776f]">Tell us about your Ai-CHA experience, your favourite drink, or how we can make your next visit even better.</p>
          {sent ? <div className="mt-8 rounded-2xl bg-[#f6e7d7] p-5 text-sm font-semibold text-[#8e4d2b]">Thank you for sharing. Your feedback means a lot to us.</div> : <form onSubmit={(event) => { event.preventDefault(); setSent(true) }} className="mt-8 flex flex-col gap-4"><label className="text-sm font-semibold">Your name<input required placeholder="Amina Mohamed" className="mt-2 h-11 w-full rounded-xl border border-[#d9d0c0] bg-[#fff5f1] px-4 text-sm font-normal outline-none focus:border-[#f5a623]" /></label><label className="text-sm font-semibold">Branch visited<select className="mt-2 h-11 w-full rounded-xl border border-[#d9d0c0] bg-[#fff5f1] px-4 text-sm font-normal outline-none focus:border-[#f5a623]" defaultValue="Nyali Branch"><option>Nyali Branch</option><option>Fontanella Branch</option></select></label><label className="text-sm font-semibold">Your feedback<textarea required rows={6} placeholder="What did you enjoy? What could we improve?" className="mt-2 w-full resize-none rounded-xl border border-[#d9d0c0] bg-[#fff5f1] px-4 py-3 text-sm font-normal outline-none focus:border-[#f5a623]" /></label><Button type="submit" className="mt-2 h-12 rounded-full bg-[#e9002b] text-white hover:bg-[#a90024]">Send feedback <Send data-icon="inline-end" /></Button></form>}
          <p className="mt-6 text-center text-xs text-[#8a7d68]">You can also email us at aichafontanella@gmail.com</p>
        </div>
      </div>
    </main>
  )
}
