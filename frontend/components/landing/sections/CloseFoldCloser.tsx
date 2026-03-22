'use client';
import Link from 'next/link';

export function CloseFoldCloser() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">I Fix Slow, Fragile Systems — So You Can Scale Without Breaking</h2>

        <div className="mt-4 flex flex-col sm:flex-row items-stretch justify-center gap-6">
          <div className="p-4 border rounded-md w-48 text-center flex flex-col">
            <h4 className="font-semibold text-slate-900">Full-Stack</h4>
            <p className="text-sm text-slate-600 mt-2">Deliver end-to-end features</p>
          </div>
          <div className="p-4 border rounded-md w-48 text-center flex flex-col">
            <h4 className="font-semibold text-slate-900">Architect</h4>
            <p className="text-sm text-slate-600 mt-2">Design scalable systems</p>
          </div>
          <div className="p-4 border rounded-md w-48 text-center flex flex-col">
            <h4 className="font-semibold text-slate-900">UI/UX</h4>
            <p className="text-sm text-slate-600 mt-2">Improve product experience</p>
          </div>
        </div>

        <div className="mt-6 max-w-md mx-auto text-center">
          <p className="text-sm text-slate-600">Production-ready systems. Multi-tenant. Payments. Built to hold under real-world pressure.</p>
          <div className="mt-4">
            <Link href="/contact-me">
              <button
                type="button"
                aria-label="Contact Me"
                className="bg-yellow-400 px-8 py-3 rounded font-semibold inline-block text-center"
              >
                Start a Project
              </button>
            </Link>
            <p className="text-xs text-slate-400 mt-3 text-center">15+ years • 20+ systems delivered • Trusted across startups & enterprise</p>
          </div>
        </div>
      </div>
    </section>
  );
}
