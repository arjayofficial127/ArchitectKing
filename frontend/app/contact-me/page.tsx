'use client';

import Link from 'next/link';
import { SiteNavbar } from '@/components/shared/SiteNavbar';
import { AmbientBackground } from '@/components/ui/AmbientBackground';

export default function ContactMePage() {
  const contactMethods = [
    {
      label: 'Email',
      value: 'arvinjaysoncastro@gmail.com',
      href: 'mailto:arvinjaysoncastro@gmail.com',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/arvinjaysoncastro',
      href: 'https://linkedin.com/in/arvinjaysoncastro',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      label: 'Phone',
      value: '+63 962 767 5114',
      href: 'tel:+639627675114',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
  ];

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
        <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center text-sm text-slate-500 hover:text-[#F4C430] transition-colors mb-12 group"
          >
            <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          {/* Main Content */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl md:text-7xl mb-6">
              Let&apos;s Connect
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Available immediately. Ready to discuss your project or role.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="space-y-6 max-w-2xl mx-auto">
            {contactMethods.map((method, index) => (
              <a
                key={method.label}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group relative block p-8 bg-white rounded-2xl border border-slate-200 hover:border-[#F4C430] transition-all duration-300 hover:shadow-lg hover:shadow-[#F4C430]/10"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-slate-50 group-hover:bg-[#F4C430]/10 flex items-center justify-center text-slate-600 group-hover:text-[#F4C430] transition-all duration-300">
                    {method.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      {method.label}
                    </div>
                    <div className="text-lg font-medium text-slate-900 group-hover:text-[#F4C430] transition-colors">
                      {method.value}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 text-slate-300 group-hover:text-[#F4C430] transition-all duration-300 group-hover:translate-x-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-20 text-center">
            <p className="text-sm text-slate-500 mb-4">
              Prefer to schedule a call?
            </p>
            <a
              href="mailto:arvinjaysoncastro@gmail.com?subject=Schedule%20a%20Call&body=Hi%20Arvin%2C%0A%0AI'd%20like%20to%20schedule%20a%20call%20to%20discuss%20[your%20project%2Frole].%0A%0ABest%2C"
              className="inline-flex items-center justify-center rounded-lg bg-[#F4C430] px-8 py-4 text-base font-semibold text-[#0F172A] shadow-lg shadow-[#F4C430]/30 transition-all hover:bg-[#F4C430]/90 hover:shadow-xl hover:shadow-[#F4C430]/40 focus:outline-none focus:ring-2 focus:ring-[#F4C430] focus:ring-offset-2"
            >
              Schedule a Call
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-slate-200 bg-slate-50/50 mt-24">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <p className="text-xs font-medium text-slate-700">Arvin Jayson Castro</p>
              <p className="mt-1 text-xs text-slate-500">Senior Full-Stack Engineer</p>
              <p className="mt-1 text-xs text-slate-400">BS Computer Science, University of Santo Tomas</p>
            </div>
            <div className="flex flex-col items-center gap-3 md:flex-row md:items-start">
              <div className="text-center md:text-right">
                <a 
                  href="mailto:arvinjaysoncastro@gmail.com" 
                  className="block text-xs text-slate-500 hover:text-[#F4C430] transition-colors"
                >
                  Email
                </a>
                <a 
                  href="https://linkedin.com/in/arvinjaysoncastro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-1 block text-xs text-slate-500 hover:text-[#F4C430] transition-colors"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://www.github.com/arvinjaysoncastro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-1 block text-xs text-slate-500 hover:text-[#F4C430] transition-colors"
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
