"use client";

import Link from 'next/link';
import { DittoBlob } from "@/components/ui/DittoBlob";
import { ContactOptions } from "@/components/ui/ContactOptions";

export function CloseFoldFinal() {
  return (
    <section className="min-h-screen flex flex-col justify-center">
      <div className="mx-auto max-w-4xl text-center px-6">

         
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Need systems that scale and hold under pressure?</h2>
        <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">I design and deliver systems built for real-world production.</p>

        <div className="mt-8">
          <Link href="/contact-me">
            <button
              type="button"
              aria-label="Discuss Your System"
              className="bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-3 shadow-md hover:shadow-lg transition hover:scale-[1.02]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#F4C430]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span>Discuss Your System</span>
            </button>
          </Link>
          <div className="flex items-center justify-center gap-3 text-xs sm:text-sm text-slate-500 mt-2">
            <a href="mailto:arvinjaysoncastro@gmail.com" className="hover:text-slate-800 transition">arvinjaysoncastro@gmail.com</a>
            <span className="text-slate-300">•</span>
            <a href="https://linkedin.com/in/arvinjaysoncastro" target="_blank" rel="noopener noreferrer" className="hover:text-slate-800 transition">linkedin.com/in/arvinjaysoncastro</a>
            <span className="text-slate-300">•</span>
            <a href="tel:+639627675114" className="hover:text-slate-800 transition">+63 962 767 5114</a>
          </div>

          <div className="mt-4 opacity-90 scale-[0.9]">
            <DittoBlob />
          </div>
        </div>
      </div>
    </section>
  );
}
