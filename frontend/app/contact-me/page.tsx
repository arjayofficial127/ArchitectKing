'use client';


import Link from 'next/link';
import { SiteNavbar } from '@/components/shared/SiteNavbar';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { contactMethods } from '@/lib/contactMethods';

export default function ContactMePage() {

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
                Is your system becoming slow, fragile, or harder to scale?
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-2">
                {"If things are getting harder to maintain, slower under load, or difficult to extend — you're not alone."}
              </p>
            </div>

            {/* Problem Section */}
            <div className="bg-slate-50/60 border border-slate-200 rounded-xl p-4 md:p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-2 text-center">What might be happening:</h2>
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
                    href={method.href}
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
              These patterns tend to repeat across different systems.
            </div>

            {/* CTA Section */}
            <div className="text-center space-y-3 mt-2">
              <p className="text-lg font-semibold text-slate-900">
                {"Sometimes a second set of eyes is all it takes."}
              </p>
              <a
                href="mailto:arvinjaysoncastro@gmail.com?subject=Review%20Your%20System&body=Hi%20Arvin%2C%0A%0ACould%20you%20take%20a%20look%20at%20our%20system%3F%0A%0AThanks%2C"
                className="inline-flex w-full md:w-auto items-center justify-center rounded-lg bg-[#F4C430] px-8 py-4 text-lg font-semibold text-[#0F172A] shadow-lg transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#F4C430] focus:ring-offset-2"
              >
                Take a closer look at your system
              </a>
              <p className="text-sm text-slate-500">
                {"We’ll go through what’s happening, what might be causing it, and what options you have."}
              </p>
              <p className="text-sm text-slate-500">
                {"No pressure — just a quick look at what might be going on."}
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
              <p className="text-sm text-slate-500 mt-1">Architect of Scalable Systems</p>
              <p className="mt-1 text-xs text-slate-400">Architecture Reviews • SaaS Platforms • Admin Dashboards</p>
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

      <div className="text-xs text-slate-400 text-center mt-6">Built for systems that scale.</div>
    </div>
  );
}
