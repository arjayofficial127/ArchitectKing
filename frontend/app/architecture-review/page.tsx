import type { Metadata } from 'next';
import Link from 'next/link';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { SiteNavbar } from '@/components/shared/SiteNavbar';

export const metadata: Metadata = {
  title: 'Architecture Review for SaaS Systems | Arvin Jayson Castro',
  description: 'A practical second look at your architecture, codebase, and current risks, with clear priorities and next steps.',
  keywords: [
    'Architecture Review',
    'SaaS Architecture',
    'System Design Review',
    'Codebase Review',
    'Technical Consulting',
    'Software Architecture',
    'System Scalability',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://arvinjaysoncastro.com/architecture-review',
    siteName: 'Arvin Jayson Castro',
    title: 'Architecture Review for SaaS Systems',
    description: 'A practical second look at your architecture, codebase, and current risks, with clear priorities and next steps.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Architecture Review for SaaS Systems',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Architecture Review for SaaS Systems',
    description: 'A practical architecture review with clear priorities and next steps.',
  },
  alternates: {
    canonical: 'https://arvinjaysoncastro.com/architecture-review',
  },
};

export default function ArchitectureReviewPage() {
  const audiences = [
    'Founders making an important technical decision',
    'Teams whose product has become harder to change or operate',
    'Engineers taking responsibility for an unfamiliar or older system',
    'Companies that want another set of eyes before a major piece of work',
  ];

  const commonProblems = [
    'Slow APIs or bottlenecks affecting the product',
    'Code that has become difficult to change safely',
    'Old decisions that now slow delivery or create risk',
    'Unclear boundaries, ownership, or responsibilities',
  ];

  const deliverables = [
    'A plain-language view of the system and its main risks',
    'A closer look at boundaries, performance, reliability, and maintainability',
    'Priorities for what to address now and what can wait',
    'Practical next steps that fit the team and current constraints',
  ];

  return (
    <div className="relative min-h-screen bg-white text-slate-800">
      <AmbientBackground
        gridSize={64}
        lightCount={6}
        enableGradient={true}
        gradientOpacity={0.05}
        enableGrain={true}
        grainOpacity={0.03}
      />

      <SiteNavbar />

      <main className="relative">
        <section className="mx-auto max-w-7xl px-6 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="mx-auto max-w-4xl text-center">
            <Link
              href="/"
              className="mb-10 inline-flex items-center text-sm text-slate-500 transition-colors hover:text-[#F4C430]"
            >
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.05]">
              A Practical Architecture Review
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
              I take a careful look at the system, explain what I see, and help you decide what is worth doing next.
            </p>

            <div className="mt-10">
              <Link
                href="/schedule"
                className="inline-flex items-center justify-center rounded-lg bg-[#F4C430] px-8 py-4 text-base font-semibold text-[#0F172A] shadow-lg shadow-[#F4C430]/30 transition-all hover:bg-[#F4C430]/90 hover:shadow-xl hover:shadow-[#F4C430]/40 focus:outline-none focus:ring-2 focus:ring-[#F4C430] focus:ring-offset-2"
              >
                Talk Through the System
              </Link>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200/70 bg-slate-50/60">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-3xl font-bold text-slate-900 sm:text-4xl">When a Review Can Help</h2>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <ul className="space-y-3 text-sm text-slate-700 md:text-base">
                  {audiences.map((item) => (
                    <li key={item} className="flex items-start">
                      <span className="mr-2 text-[#F4C430]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-slate-900 sm:text-4xl">Things We Can Look At</h2>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <ul className="space-y-3 text-sm text-slate-700 md:text-base">
                {commonProblems.map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="mr-2 text-[#F4C430]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200/70 bg-slate-50/60">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-3xl font-bold text-slate-900 sm:text-4xl">What You Will Leave With</h2>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <ul className="space-y-3 text-sm text-slate-700 md:text-base">
                  {deliverables.map((item) => (
                    <li key={item} className="flex items-start">
                      <span className="mr-2 text-[#F4C430]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-slate-900 sm:text-4xl">Pricing</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Starter</p>
                {/* <p className="mt-3 text-2xl font-bold text-slate-900">From $350</p> */}
                <p className="mt-3 text-sm text-slate-600">A focused look at one system or an early-stage product.</p>
              </div>

              <div className="rounded-xl border-2 border-[#F4C430] bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Core Review</p>
                {/* <p className="mt-3 text-2xl font-bold text-slate-900">From $750</p> */}
                <p className="mt-3 text-sm text-slate-600">A closer assessment with findings and a clear order of work.</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Deep Dive</p>
                {/* <p className="mt-3 text-2xl font-bold text-slate-900">From $1,500</p> */}
                <p className="mt-3 text-sm text-slate-600">A deeper review that includes planning how to make the changes.</p>
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-slate-500">Final pricing depends on system size, codebase scope, and review depth.</p>
          </div>
        </section>

        <section className="border-y border-slate-200/70 bg-slate-50/60">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <div className="mx-auto max-w-4xl rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm md:p-10">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Not Sure What the System Needs Next?</h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
                Tell me what is happening. I&apos;ll ask a few questions and we can decide whether a review would actually help.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/schedule"
                  className="inline-flex items-center justify-center rounded-lg bg-[#F4C430] px-8 py-4 text-base font-semibold text-[#0F172A] shadow-lg shadow-[#F4C430]/30 transition-all hover:bg-[#F4C430]/90 hover:shadow-xl hover:shadow-[#F4C430]/40 focus:outline-none focus:ring-2 focus:ring-[#F4C430] focus:ring-offset-2"
                >
                  Find a Time
                </Link>
                <Link
                  href="/contact-me"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition-all hover:border-[#F4C430] hover:bg-[#FFFDF4] hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F4C430] focus:ring-offset-2"
                >
                  Send Me the Context
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative mt-24 border-t border-slate-200 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <p className="text-xs font-medium text-slate-700">Arvin Jayson Castro</p>
              <p className="mt-1 text-xs text-slate-500">Software Architect &amp; Product Builder</p>
              <p className="mt-1 text-xs text-slate-600">Architecture • Product Building • Production Support</p>
              <p className="mt-2 text-xs text-slate-400">BS Computer Science, University of Santo Tomas</p>
            </div>
            <div className="flex flex-col items-center gap-3 md:flex-row md:items-start">
              <div className="text-center md:text-right">
                <a href="mailto:arvinjaysoncastro@gmail.com" className="block text-xs text-slate-500 transition-colors hover:text-[#F4C430]">
                  Email
                </a>
                <a
                  href="https://linkedin.com/in/arvinjaysoncastro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-xs text-slate-500 transition-colors hover:text-[#F4C430]"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.github.com/arvinjaysoncastro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-xs text-slate-500 transition-colors hover:text-[#F4C430]"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
