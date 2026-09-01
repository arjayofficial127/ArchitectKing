"use client";

import Link from 'next/link';

import { DittoBlob } from '@/components/ui/DittoBlob';

export function CloseFoldFinal() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl shadow-slate-950/20">
        <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-[1fr_240px] lg:p-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F4C430]">If I can help</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">Have something difficult that needs to get done?</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">Tell me what you&apos;re working through. I&apos;ll ask a few questions, be honest about whether I can help, and if it makes sense, we&apos;ll take it from there.</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/schedule" className="inline-flex items-center justify-center rounded-lg bg-[#F4C430] px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-[#FFD84D]">
                Tell Me About It
              </Link>
              <Link href="/contact-me" className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-slate-500 hover:bg-white/5">
                Send a Message
              </Link>
            </div>

            <p className="mt-6 text-sm font-semibold text-slate-300">You&apos;ll speak and work directly with me.</p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-10 py-5">
              <DittoBlob />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-800 px-8 py-6 text-sm text-slate-400 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-12 lg:px-16">
          <a href="mailto:arvinjaysoncastro@gmail.com" className="transition hover:text-white">arvinjaysoncastro@gmail.com</a>
          <a href="https://linkedin.com/in/arvinjaysoncastro" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">linkedin.com/in/arvinjaysoncastro</a>
          <a href="tel:+639627675114" className="transition hover:text-white">+63 962 767 5114</a>
        </div>
      </div>
    </section>
  );
}
