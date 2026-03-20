'use client';

import Link from 'next/link';

export function HeroFold() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 md:pt-28 md:pb-24">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.05]">
          I Help Teams Fix Slow, Fragile SaaS Systems — So They Can Scale Without Breaking Production
          <span className="block mt-5 text-slate-700 font-normal text-lg sm:text-xl md:text-2xl leading-relaxed">
            I fix slow, fragile SaaS systems so teams can ship faster and scale without breaking production.
          </span>
        </h1>
        
        {/* Subline */}
        <p className="mt-8 text-base text-slate-600 sm:text-lg leading-relaxed max-w-3xl mx-auto">
          15+ years building and fixing SaaS systems.<br />
          I remove bottlenecks and stabilize production for growth.
        </p>
        <p className="mt-2 text-sm text-slate-500 max-w-3xl mx-auto">
          {/* removed for clarity, no extra supporting paragraph */}
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div className="flex flex-col items-center">
            <Link
              href="/contact-me"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#F4C430] px-8 py-4 text-base font-semibold text-[#0F172A] shadow-xl shadow-[#F4C430]/40 ring-1 ring-[#F4C430]/30 transition-all hover:-translate-y-0.5 hover:bg-[#F4C430]/90 hover:shadow-2xl hover:shadow-[#F4C430]/50 focus:outline-none focus:ring-2 focus:ring-[#F4C430] focus:ring-offset-2"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Get Expert Feedback on Your System
            </Link>
            <p className="mt-2 text-center text-xs text-slate-500">
              Quick architecture discussion — no preparation needed.
            </p>
            <p className="text-center text-xs text-slate-500">
              ⚠️ Limited availability — I only take 2–3 architecture reviews per week.
            </p>
          </div>
          <Link
            href="#featured-project"
            className="text-slate-500 underline text-base font-medium hover:text-slate-700 transition-colors"
            style={{ background: 'none', boxShadow: 'none', border: 'none', padding: 0 }}
          >
            View My Work
          </Link>
        </div>
        <p className="mt-4 text-sm text-slate-500 max-w-3xl mx-auto">
          Teams I’ve worked with typically see faster deployments, fewer production issues, and systems that scale without constant firefighting.
        </p>
        <p className="text-xs text-slate-500 mt-2">
          Trusted by SaaS teams for 15+ years.
        </p>

        {/* Contact info at bottom */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
          <a href="https://linkedin.com/in/arvinjaysoncastro" target="_blank" rel="noopener noreferrer" className="hover:text-[#F4C430] transition-colors">
            LinkedIn
          </a>
          <span>•</span>
          <a href="mailto:arvinjaysoncastro@gmail.com" className="hover:text-[#F4C430] transition-colors">
            Email
          </a>
          <span>•</span>
          <a href="tel:+639627675114" className="hover:text-[#F4C430] transition-colors">
            Phone
          </a>
        </div>
      </div>
    </section>
  );
}
