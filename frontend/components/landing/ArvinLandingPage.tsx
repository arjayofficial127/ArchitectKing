'use client';

import Image from 'next/image';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { CaseStudy } from './CaseStudy';
import { CTASection } from './CTASection';
import { AuthorityStrip } from './AuthorityStrip';
import { TechnicalDepth } from './TechnicalDepth';
import { SystemsArchitecture } from './SystemsArchitecture';
import { BookAuthorityStrip } from './BookAuthorityStrip';
import Link from 'next/link';

export function ArvinLandingPage() {
  // Fast conversion mode - show conversion-focused sections, hide architecture content
  const isFastConversionMode = true;
  
  // Theme state for tech strip - always blackboard
  const techStripTheme = 'black';

  return (
    <div className="relative min-h-screen bg-white text-slate-800">
      {/* Subtle background */}
      <AmbientBackground 
        gridSize={64} 
        lightCount={8} 
        enableGradient={true}
        gradientOpacity={0.08}
        enableGrain={true}
        grainOpacity={0.04}
      />

      {/* Header - Minimal, professional */}
      <header className="relative border-b border-slate-200/60 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold tracking-tight text-slate-900">
              Arvin Jayson Castro
            </span>
            <span className="text-sm text-slate-400">|</span>
            <span className="text-sm text-slate-500">Senior Full-Stack Engineer</span>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/working-fundamentals" className="text-sm font-medium text-slate-600 hover:text-[#F4C430] transition-colors">
                Working Fundamentals
              </Link>
              <a href="#case-studies" className="text-sm font-medium text-slate-600 hover:text-[#F4C430] transition-colors">
                Case Studies
              </a>
              <a href="#systems" className="text-sm font-medium text-slate-600 hover:text-[#F4C430] transition-colors">
                Systems
              </a>
              <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-[#F4C430] transition-colors">
                Contact
              </a>
            </nav>
            <a
              href="https://m.me/arjayofficial127"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center rounded-md border border-[#0F172A] bg-transparent px-4 py-1.5 text-sm font-medium text-[#0F172A] transition-all hover:bg-[#0F172A] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-offset-1"
            >
              Message Me
            </a>
          </div>
        </div>
      </header>

      <main className="relative">
        {/* ============================================
            CONVERSION MODE FOLDS (NEW - ABOVE EXISTING)
            ============================================ */}
        
        {isFastConversionMode && (
          <>
            {/* FOLD 1 — EXECUTION HERO */}
            <section className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
              <div className="mx-auto max-w-4xl text-center">
                <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-tight">
                  Senior Full-Stack Engineer
                  <span className="block mt-3 text-slate-700 font-normal text-3xl sm:text-4xl md:text-5xl">
                    Building production systems end-to-end.
                  </span>
                </h1>
                
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-lg text-slate-600">
                  <span>React / TypeScript</span>
                  <span className="text-slate-400">•</span>
                  <span>APIs</span>
                  <span className="text-slate-400">•</span>
                  <span>SQL</span>
                  <span className="text-slate-400">•</span>
                  <span>Cloud Deployments</span>
                  <span className="text-slate-400">•</span>
                  <span>Product Ownership</span>
                </div>

                <div className="mt-10">
                  <a
                    href="https://m.me/arjayofficial127"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-[#F4C430] px-8 py-4 text-base font-semibold text-[#0F172A] shadow-lg shadow-[#F4C430]/30 transition-all hover:bg-[#F4C430]/90 hover:shadow-xl hover:shadow-[#F4C430]/40 focus:outline-none focus:ring-2 focus:ring-[#F4C430] focus:ring-offset-2"
                  >
                    Message Me Now
                  </a>
                </div>

                {/* Power line - placed immediately after CTA for psychological reinforcement */}
                <p className="mt-4 text-lg font-medium text-slate-700">
                  &quot;I solve problems. I ship.&quot;
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
                  <a href="https://www.linkedin.com/in/arvinjaysoncastro" target="_blank" rel="noopener noreferrer" className="hover:text-[#F4C430] transition-colors">
                    LinkedIn
                  </a>
                  <span>•</span>
                  <a href="mailto:arvinjaysontamayocastro@gmail.com" className="hover:text-[#F4C430] transition-colors">
                    Email
                  </a>
                  <span>•</span>
                  <a href="tel:+1234567890" className="hover:text-[#F4C430] transition-colors">
                    Phone
                  </a>
                </div>
              </div>
            </section>

            {/* FULL-WIDTH TECH STRIP */}
            <section 
              className="relative w-full border-t border-b transition-all duration-400 ease-in-out" 
              style={{ 
                background: '#0f172a',
                borderTopColor: 'transparent',
                borderBottomColor: 'transparent',
                transition: 'background 0.4s ease, border-color 0.3s ease, color 0.3s ease'
              }}
            >
              <div className="w-full px-6" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
                <div className="mx-auto text-center" style={{ maxWidth: '1200px' }}>
                  <h2 
                    className="text-2xl font-semibold mb-8 text-center transition-colors duration-300 ease-in-out" 
                    style={{ 
                      letterSpacing: '0.5px',
                      color: '#f1f5f9'
                    }}
                  >
                    Technologies I Ship In Production
                  </h2>
                  
                  <div className="flex flex-wrap justify-center gap-3">
                    {[
                      { name: 'Vercel', icon: (
                        <svg className="w-4 h-4" viewBox="0 0 76 65" fill="currentColor">
                          <path d="M37.527 0L75.054 65H0L37.527 0Z"/>
                        </svg>
                      )},
                      { name: 'Render', icon: (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                        </svg>
                      )},
                      { name: 'Azure', icon: (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                      )},
                      { name: 'C#' },
                      { name: '.NET', icon: (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M2 2h20v20H2V2zm2 2v16h16V4H4zm2 2h12v12H6V6zm2 2v8h8V8H8z"/>
                        </svg>
                      )},
                      { name: 'Node', icon: (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      )},
                      { name: 'React', icon: (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="12" cy="12" r="2"/>
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                        </svg>
                      )},
                      { name: 'TypeScript' },
                      { name: 'Angular', icon: (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                      )},
                      { name: 'PostgreSQL', icon: (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                        </svg>
                      )},
                      { name: 'SQL Server' },
                      { name: 'Neon' },
                      { name: 'REST' },
                      { name: 'CI/CD' },
                      { name: 'Docker', icon: (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                        </svg>
                      )},
                      { name: 'Tailwind' },
                      { name: 'CSS' },
                      { name: 'Git', icon: (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                        </svg>
                      )},
                      { name: 'Prisma' },
                      { name: 'EF Core' },
                      { name: 'Next.js', icon: (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                      )},
                    ].map((tech) => {
                      // Blackboard theme chip styles (always)
                      const chipStyles = {
                        background: '#1e293b',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#e2e8f0',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)'
                      };

                      const hoverShadow = '0 6px 20px rgba(0, 0, 0, 0.4)';
                      
                      return (
                        <span
                          key={tech.name}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 ease-in-out"
                          style={chipStyles}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = hoverShadow;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = chipStyles.boxShadow;
                          }}
                        >
                          {tech.icon && <span className="flex-shrink-0">{tech.icon}</span>}
                          <span>{tech.name}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* FOLD 2 — TWO LANES */}
            <section className="relative bg-slate-50/50">
              <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
                <div className="mx-auto max-w-6xl">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
                    {/* LEFT COLUMN — Urgency Block */}
                    <div>
                      {/* URGENCY BLOCK */}
                      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                        <h3 className="font-display text-xl font-bold text-slate-900 mb-4">
                          Something Breaking Right Now?
                        </h3>
                        
                        <ul className="space-y-2 mb-4 text-sm text-slate-700">
                          <li className="flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            <span>Urgent bug?</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            <span>API down?</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            <span>Deployment stuck?</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            <span>System unstable?</span>
                          </li>
                        </ul>

                        <p className="text-sm text-slate-600 mb-4">
                          Senior-level troubleshooting. Immediate execution.
                        </p>

                        <a
                          href="https://m.me/arjayofficial127"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-full rounded-lg bg-[#F4C430] px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-sm transition-all hover:bg-[#F4C430]/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#F4C430] focus:ring-offset-2"
                        >
                          Get Help Now
                        </a>

                        <p className="mt-3 text-xs text-slate-500 text-center">
                          Direct message. No layers. No delays.
                        </p>
                      </div>
                    </div>

                    {/* RIGHT COLUMN — UI/UX in Production */}
                    <div>
                      <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">
                        UI/UX in Production
                      </h2>
                      
                      {/* Oyeroyee Preview Card */}
                      <a
                        href="https://www.oyeroyee.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mb-4 group"
                      >
                        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-[#9CAF88]">
                          <div className="aspect-video relative overflow-hidden bg-slate-100">
                            <Image
                              src="/architectking/oyeroyee.png"
                              alt="Oyeroyee - Production Platform"
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-slate-900">View Live Site</span>
                              <svg className="w-4 h-4 text-slate-400 group-hover:text-[#F4C430] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </a>
                      
                      <p className="text-sm text-slate-600 italic">
                        Oyeroyee — Production-ready platform built end-to-end.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* DESIGN GALLERY SECTION */}
            <section className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
              <div className="mx-auto max-w-6xl">
                <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl mb-8 text-center">
                  Selected Interface Work
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Oyeroyee Card */}
                  <a
                    href="https://www.oyeroyee.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-[#9CAF88]">
                      <div className="aspect-video relative overflow-hidden bg-slate-100">
                        <Image
                          src="/architectking/oyeroyee.png"
                          alt="Oyeroyee - Job Search Management Platform"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-sm font-medium text-slate-900 mb-1">Oyeroyee</p>
                        <p className="text-xs text-slate-500">Job search management platform</p>
                      </div>
                    </div>
                  </a>

                  {/* SaaS Dashboard Card */}
                  <div className="group">
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
                      <div className="aspect-video bg-gradient-to-br from-teal-100 to-teal-200 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold text-[#F4C430]">SaaS Dashboard</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm font-medium text-slate-900 mb-1">SaaS Dashboard</p>
                        <p className="text-xs text-slate-500">Multi-tenant admin system</p>
                      </div>
                    </div>
                  </div>

                  {/* Admin System Card */}
                  <div className="group">
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
                      <div className="aspect-video bg-gradient-to-br from-cyan-100 to-cyan-200 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold text-[#F4C430]">Admin System</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm font-medium text-slate-900 mb-1">Admin System</p>
                        <p className="text-xs text-slate-500">Enterprise control panel</p>
                      </div>
                    </div>
                  </div>

                  {/* Landing Page System Card */}
                  <div className="group">
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
                      <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold text-slate-700">Landing Page</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm font-medium text-slate-900 mb-1">Landing Page System</p>
                        <p className="text-xs text-slate-500">Conversion-focused design</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FOLD 3 — ARCHITECTURE POSITIONING */}
            <section className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
              <div className="mx-auto max-w-4xl">
                <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl mb-6">
                  Architectural Thinking Applied Through Code
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                  Architecture exists to support execution and shipping.
                </p>
                {/* Placeholder for existing books/architecture visuals */}
                <div className="mt-8 p-8 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-sm text-slate-500 text-center">
                    [Architecture content placeholder - existing books/visuals will appear here]
                  </p>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ============================================
            EXISTING CONTENT (HIDDEN IN CONVERSION MODE)
            ============================================ */}
        
        {!isFastConversionMode && (
          <>
            {/* Hero Section */}
            <section className="relative mx-auto max-w-7xl px-6 py-20 md:py-32">
              <div className="mx-auto max-w-4xl text-center">
                <h1 className="font-display text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl md:text-7xl leading-[1.1] pb-3">
                  Senior Fullstack Architect
                  <span className="block mt-3 bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600 bg-clip-text text-transparent pb-2">
                    Who Turns Complex Systems Into Scalable Revenue Engines
                  </span>
                </h1>
                
                <p className="mt-6 text-xl text-slate-600 sm:text-2xl">
                  15 years. React/Next.js/.NET/Node. Multi-tenant SaaS. Production-grade systems.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-lg bg-[#F4C430] px-8 py-4 text-base font-semibold text-[#0F172A] shadow-lg shadow-[#F4C430]/30 transition-all hover:bg-[#F4C430]/90 hover:shadow-xl hover:shadow-[#F4C430]/40 focus:outline-none focus:ring-2 focus:ring-[#F4C430] focus:ring-offset-2"
                  >
                    Book a 20-Min Architecture Call
                  </a>
                  <a
                    href="/pdf/ArJay_Castro_Skills.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg border-2 border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition-all hover:border-[#F4C430] hover:bg-[#FFF8E7] hover:text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#F4C430] focus:ring-offset-2"
                  >
                    Download Resume
                  </a>
                </div>
              </div>
            </section>

            {/* Authority Strip */}
            <AuthorityStrip />

            {/* Book Authority Strip */}
            <BookAuthorityStrip />

            {/* Problem Statement */}
            <section className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
              <div className="mx-auto max-w-4xl">
                <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
                  What Companies Struggle With
                </h2>
                <div className="mt-8 space-y-6 text-lg text-slate-600">
                  <p>
                    <strong className="text-slate-900">Technical debt compounds.</strong> Quick fixes become permanent. 
                    Systems that worked at 1,000 users break at 10,000. Architecture decisions made in isolation 
                    create integration nightmares later.
                  </p>
                  <p>
                    <strong className="text-slate-900">Velocity slows as complexity grows.</strong> New features take 
                    longer. Bugs multiply. The team spends more time fighting fires than building value. 
                    What should be a competitive advantage becomes a liability.
                  </p>
                  <p>
                    <strong className="text-slate-900">Business needs outpace technical capacity.</strong> The roadmap 
                    is clear, but the foundation can&apos;t support it. You need someone who thinks in systems, 
                    not just features—someone who builds for scale from day one.
                  </p>
                </div>
              </div>
            </section>

            {/* Solution Framework */}
            <section className="relative bg-slate-50/50">
              <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
                <div className="mx-auto max-w-4xl">
                  <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
                    How I Think: Architecture-First, Business-Aware
                  </h2>
                  <div className="mt-8 space-y-8">
                    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                      <h3 className="text-xl font-semibold text-slate-900">Systems Thinking</h3>
                      <p className="mt-2 text-slate-600">
                        Every component exists in a larger context. I design for the system, not just the feature. 
                        This means extensible APIs, clear boundaries, and patterns that scale.
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                      <h3 className="text-xl font-semibold text-slate-900">Production-Grade Discipline</h3>
                      <p className="mt-2 text-slate-600">
                        Code that ships is code that matters. I build with error handling, monitoring, and 
                        observability from day one. No &quot;we&apos;ll add that later.&quot;
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                      <h3 className="text-xl font-semibold text-slate-900">Business Leverage</h3>
                      <p className="mt-2 text-slate-600">
                        Technology serves business outcomes. I prioritize work that creates leverage—systems 
                        that enable faster feature delivery, reduce operational burden, and scale revenue.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Case Studies */}
            <section id="case-studies" className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
              <div className="mx-auto max-w-4xl">
                <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
                  Case Studies: Production Systems
                </h2>
                <p className="mt-4 text-lg text-slate-600">
                  Real systems, real constraints, real results.
                </p>
              </div>

              <div className="mx-auto mt-12 max-w-6xl space-y-16">
            <CaseStudy
              title="BaseOfUI: Multi-Tenant SaaS Builder"
              problem="Build a platform where organizations can install and customize apps, with each app having its own page builder and JSON-driven architecture."
              constraint="Must support unlimited tenants, each with isolated data and custom configurations. Apps must be registry-driven and installable without code changes."
              architecture="Multi-tenant architecture with org-scoped data isolation. Registry pattern for app discovery and installation. JSON-based page builder with block system. Installable app architecture with dynamic routing."
              result="Production deployment on Vercel/Render. Organizations can install apps, customize pages, and manage content independently. System scales to handle multiple tenants with isolated data."
              proof="Proves ability to design and implement complex multi-tenant systems with clean separation of concerns, extensible architecture, and production-grade deployment."
            />

            <CaseStudy
              title="Airunote: Installable App with Complex State"
              problem="Build a note-taking app that installs into organizations, with folder tree navigation, owner-scoped CRUD, and a save-before-edit workflow."
              constraint="Must handle nested folder structures, real-time state management, and prevent data loss during editing. RTF viewer strategy for rich content."
              architecture="Owner-scoped data model with hierarchical folder structure. Optimistic UI updates with rollback on failure. Save-before-edit pattern prevents data loss. RTF rendering strategy for rich text display."
              result="Smooth folder navigation, reliable save workflow, and rich text viewing. Users can organize notes in nested folders with confidence in data integrity."
              proof="Demonstrates expertise in complex state management, data modeling for hierarchical structures, and user experience patterns that prevent data loss."
            />

            <CaseStudy
              title="Oyeroyee: Job Search Management System"
              problem="Design a system to manage job search funnel—applications, interviews, offers—with income-leveraging product thinking."
              constraint="Must track multiple applications across stages, provide insights into conversion rates, and support strategic decision-making."
              architecture="Funnel-based data model tracking applications through stages. Analytics layer for conversion insights. Product thinking focused on income leverage and strategic positioning."
              result="Clear visibility into job search pipeline, conversion metrics, and strategic insights. System supports informed decision-making throughout the search process."
              proof="Shows product thinking beyond code—understanding business goals, designing for outcomes, and building systems that create leverage."
            />

            <CaseStudy
              title="At-Gov: Enterprise Authority Database"
              problem="Build an authority database with order orchestration, mapper patterns, and strict transaction integrity for government-scale data."
              constraint="Must handle complex relationships, maintain referential integrity, and support audit trails. Transaction boundaries must be explicit and reliable."
              architecture="Mapper pattern for data transformation. Order orchestration for complex workflows. Transaction integrity with rollback capabilities. Audit trail system for compliance."
              result="Reliable data management at enterprise scale. Complex workflows execute with guaranteed consistency. System supports audit requirements."
              proof="Proves ability to work with enterprise patterns, transaction management, and systems where data integrity is non-negotiable."
            />
              </div>
            </section>

            {/* Technical Depth */}
            <TechnicalDepth />

            {/* Systems Architecture */}
            <SystemsArchitecture />

            {/* CTA Section */}
            <CTASection />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="relative border-t border-slate-200 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <p className="text-sm font-semibold text-slate-900">Arvin Jayson Castro</p>
              <p className="mt-1 text-sm text-slate-600">Senior Fullstack Architect</p>
              <p className="mt-1 text-xs text-slate-500">BS Computer Science, University of Santo Tomas</p>
            </div>
            <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
              <div className="text-center md:text-right">
                <p className="text-sm font-medium text-slate-900">Contact</p>
                <a 
                  href="mailto:arvinjaysontamayocastro@gmail.com" 
                  className="mt-1 block text-sm text-[#F4C430] hover:text-[#F4C430]/80"
                >
                  arvinjaysontamayocastro@gmail.com
                </a>
                <a 
                  href="https://www.linkedin.com/in/arvinjaysoncastro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-1 block text-sm text-[#F4C430] hover:text-[#F4C430]/80"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://www.github.com/arvinjaysoncastro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-1 block text-sm text-[#F4C430] hover:text-[#F4C430]/80"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-200 pt-8 text-center">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Arvin Jayson Castro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
