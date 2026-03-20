'use client';

import Link from 'next/link';

export function FeedbackFold() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">
          Architecture Review & System Feedback
        </h2>
        <p className="text-sm text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
          Not sure if your SaaS system architecture needs improvement? I can quickly review your system and point out the biggest risks. If your SaaS system, dashboard, or backend is becoming difficult to maintain or scale, I can review your architecture and provide a clear plan for improvement.
        </p>

        {/* Bullet points from diagnosis */}
        <ul className="space-y-3 text-sm text-slate-700 max-w-md mx-auto text-left mb-8">
          <li className="flex items-start">
            <span className="text-[#F4C430] mr-2">•</span>
            <span>Identify architecture bottlenecks</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#F4C430] mr-2">•</span>
            <span>Spot scalability risks early</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#F4C430] mr-2">•</span>
            <span>Get practical improvement suggestions</span>
          </li>
        </ul>

        {/* Detailed list from architecture review */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 md:p-8 mb-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-3">Architecture Review</h3>
          <p className="text-sm text-slate-700 mb-6">
            A structured review of your SaaS system, codebase, or architecture.
          </p>

          <p className="text-sm font-semibold text-slate-900 mb-3">Includes:</p>
          <ul className="space-y-2 mb-6 text-sm text-slate-700">
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2">•</span>
              <span>System architecture review</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2">•</span>
              <span>Performance and scalability risks</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2">•</span>
              <span>Codebase structure analysis</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2">•</span>
              <span>Data and API design feedback</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2">•</span>
              <span>Recommendations for improvement</span>
            </li>
          </ul>

          <p className="text-sm text-slate-700 mb-6">
            <span className="font-semibold text-slate-900">Outcome:</span>{' '}
            You receive a clear technical report outlining improvements and next steps.
          </p>
        </div>

        <Link
          href="/contact-me"
          className="inline-flex items-center justify-center rounded-lg bg-[#F4C430] px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-sm transition-all hover:bg-[#F4C430]/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#F4C430] focus:ring-offset-2"
        >
          Get Expert Feedback on Your System
        </Link>

        <p className="mt-3 text-xs text-slate-500">
          No preparation needed. Just bring your system problem. Typical reviews take 1–2 days depending on system size.
        </p>
      </div>
    </section>
  );
}
