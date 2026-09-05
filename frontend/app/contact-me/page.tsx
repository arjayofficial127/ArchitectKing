'use client';


import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SiteNavbar } from '@/components/shared/SiteNavbar';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { contactMethods } from '@/lib/contactMethods';
import { getJourneyContext } from '@/lib/helpJourney';

export default function ContactMePage() {
  return <Suspense fallback={<div className="p-10 text-center">Loading contact details…</div>}><ContactMeContent /></Suspense>;
}

function ContactMeContent() {
  const searchParams = useSearchParams();
  const context = getJourneyContext(searchParams.get('problem'), searchParams.get('help'));
  const hasContext = Boolean(context.problem || context.engagement);
  const initialNote = hasContext
    ? ['Hi Arvin,', '', context.problem ? `What we are running into: ${context.problem}.` : '', context.engagement ? `I would like to discuss ${context.engagement}.` : '', '', 'Here is a little more context:', ''].filter((line) => line !== undefined).join('\n')
    : '';
  const [note, setNote] = useState(initialNote);
  useEffect(() => { setNote(initialNote); }, [initialNote]);
  const emailHref = hasContext
    ? `mailto:arvinjaysoncastro@gmail.com?subject=${encodeURIComponent('A conversation about our software')}&body=${encodeURIComponent(note)}`
    : 'mailto:arvinjaysoncastro@gmail.com?subject=Let%27s%20talk&body=Hi%20Arvin%2C%0A%0A';
  return (
    <div className="relative min-h-screen bg-white text-slate-800">
      {/* Subtle background */}
      <AmbientBackground 
        gridSize={64} 
        lightCount={6} 
        enableGradient={true}
        gradientOpacity={0.05}
        enableGrain={true}
        grainOpacity={0.03}
      />

      {/* Header */}
      <SiteNavbar />

      <main className="relative">
        {/* Conversion-focused intro */}
        {/* <div className="max-w-2xl mx-auto w-full text-center space-y-2 mt-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Tell me what’s slowing or breaking your system.</h2>
          <p className="text-base text-slate-700">I’ll review it and reply with a clear fix plan + next steps.</p>
          <p className="text-base text-slate-600">Available to start immediately.<br />If I can’t help, I’ll tell you upfront.</p>
          <p className="text-base text-slate-600">Response within a few hours.</p>
        </div> */}
        <div className="px-6 py-10 md:py-16 overflow-x-hidden">
          <div className="max-w-2xl mx-auto w-full flex flex-col gap-4 md:gap-6">
            {/* Back link */}
            <div className="mb-4 text-left">
              <Link
                href="/"
                className="inline-flex items-center text-base text-slate-600 hover:underline transition-colors group"
              >
                <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </Link>
            </div>

            {/* Main Content */}
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-3">
                Tell me what&apos;s going on.
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-2">
                {"A short note is enough. Tell me about the role and your team, or what you're building and where it's getting difficult."}
              </p>
            </div>

            {hasContext && (
              <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5">
                <h2 className="text-lg font-semibold text-slate-900">Picking up where we left off</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {[context.problem, context.engagement].filter(Boolean).join(' · ')}
                </p>
                <label htmlFor="journey-note" className="mt-4 block text-sm font-medium text-slate-700">Your note - edit or add anything you like</label>
                <textarea id="journey-note" value={note} onChange={(event) => setNote(event.target.value)} rows={7} className="mt-2 w-full rounded-lg border border-slate-300 bg-white p-3 text-sm leading-relaxed text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500" />
                <p className="mt-2 text-xs text-slate-500">The email link includes this note. Nothing is sent until you send it from your email app.</p>
              </div>
            )}
            {/* Examples remain useful for visitors arriving without funnel context. */}
            {!hasContext && <div className="bg-slate-50/60 border border-slate-200 rounded-xl p-4 md:p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-2 text-center">It might be something like this:</h2>
              <ul className="grid grid-cols-1 gap-2 text-sm text-slate-700 mb-2">
                <li className="flex items-start"><span className="text-[#F4C430] mr-2">•</span><span>Pages are getting slower as usage grows</span></li>
                <li className="flex items-start"><span className="text-[#F4C430] mr-2">•</span><span>Small changes cause unexpected issues</span></li>
                <li className="flex items-start"><span className="text-[#F4C430] mr-2">•</span><span>Permissions and roles are harder to manage</span></li>
                <li className="flex items-start"><span className="text-[#F4C430] mr-2">•</span><span>Systems feel risky to extend</span></li>
                <li className="flex items-start"><span className="text-[#F4C430] mr-2">•</span><span>Costs increase without clear reasons</span></li>
              </ul>
              <div className="text-xs text-slate-500 text-center mt-1">
                This tends to show up once systems start growing or getting more complex.
              </div>
              <div className="text-xs text-slate-500 text-center mt-1">
                If any of this feels familiar, it might be worth taking a closer look.
              </div>
            </div>

            }
            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => {
                let subtext = '';
                if (method.label.toLowerCase().includes('email')) {
                  subtext = 'for a quick note';
                } else if (method.label.toLowerCase().includes('linkedin')) {
                  subtext = 'if you prefer messaging';
                } else if (method.label.toLowerCase().includes('phone')) {
                  subtext = 'for time-sensitive concerns';
                }
                return (
                  <a
                    key={method.label}
                    href={hasContext && method.href.startsWith('mailto:') ? emailHref : method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group relative block p-6 bg-white rounded-2xl border border-slate-200 hover:border-slate-400 transition-all duration-200 hover:shadow-md cursor-pointer active:scale-[0.98] w-full"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {/* Icon */}
                        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                          {method.icon}
                        </div>
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="text-xs uppercase text-slate-400 mb-1">{method.label}</div>
                          <div className="text-base font-medium text-slate-900 truncate group-hover:text-[#F4C430] transition-colors">{method.value}</div>
                          <p className="text-xs text-slate-500 mt-1">{subtext}</p>
                        </div>
                      </div>
                      {/* Arrow */}
                      <div className="flex-shrink-0 text-slate-300 group-hover:text-[#F4C430] transition-all duration-300 group-hover:translate-x-1 ml-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Pre-CTA context line */}
            <div className="text-sm text-slate-500 text-center mt-4">
              You do not need to have the technical diagnosis before getting in touch.
            </div>

            {/* CTA Section */}
            <div className="text-center space-y-3 mt-2">
              <p className="text-lg font-semibold text-slate-900">
                {"Sometimes a second set of eyes is all it takes."}
              </p>
              <Link
                href="/schedule"
                className="inline-flex w-full md:w-auto items-center justify-center rounded-lg bg-[#0F172A] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-offset-2"
              >
                Find a Time
              </Link>
              <a
                href={emailHref}
                className="inline-flex w-full md:w-auto items-center justify-center rounded-lg bg-[#F4C430] px-8 py-4 text-lg font-semibold text-[#0F172A] shadow-lg transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#F4C430] focus:ring-offset-2"
              >
                Send Me a Note
              </a>
              <p className="text-sm text-slate-500">
                {"We’ll talk through what is happening and what a sensible next step might be."}
              </p>
              <p className="text-sm text-slate-500">
                {"If I do not think I am the right person to help, I will say so."}
              </p>
              <p className="text-xs text-slate-500">
                {"I usually respond within a few hours."}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* CTA grouping divider above footer */}
      <div className="mt-8 pt-6 border-t border-slate-200" />

      {/* Footer */}
      <footer className="bg-slate-50 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-12 border-t border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="font-semibold text-base text-slate-700">Arvin Jayson Castro</p>
              <p className="text-sm text-slate-500 mt-1">Software Architect &amp; Technical Lead</p>
              <p className="mt-1 text-xs text-slate-400">Architecture • Product Building • Production Support</p>
              <p className="mt-2 text-xs text-slate-400">BS Computer Science, University of Santo Tomas</p>
            </div>

            <div className="flex gap-4 text-sm">
              <a href="mailto:arvinjaysoncastro@gmail.com" className="hover:underline cursor-pointer text-slate-600">Email</a>
              <a href="https://linkedin.com/in/arvinjaysoncastro" target="_blank" rel="noopener noreferrer" className="hover:underline cursor-pointer text-slate-600">LinkedIn</a>
              <a href="tel:+639627675114"  rel="noopener noreferrer" className="hover:underline cursor-pointer text-slate-600">Phone</a>
              {/* <a href="https://www.github.com/arvinjaysoncastro" target="_blank" rel="noopener noreferrer" className="hover:underline cursor-pointer text-slate-600">GitHub</a> */}
            </div>
          </div>
        </div>
      </footer>

      <div className="text-xs text-slate-400 text-center mt-6">You’ll speak and work directly with me.</div>
    </div>
  );
}
