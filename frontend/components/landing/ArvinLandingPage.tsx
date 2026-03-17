'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { DiagramCreator } from '@/components/case-studies/DiagramCreator';
import { CaseStudy } from './CaseStudy';
import { CTASection } from './CTASection';
import { AuthorityStrip } from './AuthorityStrip';
import { TechnicalDepth } from './TechnicalDepth';
import { SystemsArchitecture } from './SystemsArchitecture';
import { BookAuthorityStrip } from './BookAuthorityStrip';
import { SiteNavbar } from '@/components/shared/SiteNavbar';
import { selectedProductionWorkDiagrams } from './selectedProductionWorkDiagrams';
import classes from './arvinLandingPage.module.css';

export function ArvinLandingPage() {
  // Fast conversion mode - show conversion-focused sections, hide architecture content
  const isFastConversionMode = true;

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

      {/* Header - Reusable navbar */}
      <SiteNavbar />

      <main className="relative">
        {/* ============================================
            CONVERSION MODE FOLDS (NEW - ABOVE EXISTING)
            ============================================ */}
        
        {isFastConversionMode && (
          <>
            {/* FOLD 1 — EXECUTION HERO */}
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
                  15+ years building and fixing production SaaS systems used in real operations.
                  <br />
                  I focus on removing bottlenecks, stabilizing systems, and creating architecture teams can actually build on.
                </p>
                <p className="mt-2 text-sm text-slate-500 max-w-3xl mx-auto">
                  {/* moved below CTA buttons as requested */}
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
                    className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition-all hover:border-[#F4C430] hover:text-slate-900 hover:bg-[#FFFDF4] focus:outline-none focus:ring-2 focus:ring-[#F4C430] focus:ring-offset-2"
                  >
                    View My Work
                  </Link>
                </div>
                <p className="mt-4 text-sm text-slate-500 max-w-3xl mx-auto">
                  Teams I’ve worked with typically see faster deployments, fewer production issues, and systems that scale without constant firefighting.
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
              <div className="w-full px-6" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
                <div className="mx-auto" style={{ maxWidth: '1200px' }}>
                  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm md:text-base font-medium" style={{ letterSpacing: '0.5px', color: '#e2e8f0' }}>
                    <span>15+ Years Experience</span>
                    <span style={{ color: '#94a3b8' }}>•</span>
                    <span>20+ Production Systems</span>
                    <span style={{ color: '#94a3b8' }}>•</span>
                    <span>Enterprise &amp; Startup Experience</span>
                    <span style={{ color: '#94a3b8' }}>•</span>
                    <span>React • .NET • Node • SQL • Cloud</span>
                  </div>
                </div>
              </div>
            </section>





            {/* ARCHITECTURE IMPROVEMENTS IN PRACTICE */}
            <section className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
              <div className="mx-auto max-w-6xl">
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4 text-center">
                  Architecture Improvements in Practice
                </h2>
                <p className="text-sm text-slate-500 mb-14 text-center max-w-3xl mx-auto">
                  Examples of common SaaS architecture problems and how they are solved.
                </p>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
                  <div>
                    <div className="h-full bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                      <div className="mb-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Before</p>
                        <ul className="space-y-2 text-sm text-slate-700">
                          <li>Dashboards slow down as the database grows</li>
                          <li>Every page runs heavy queries</li>
                          <li>Performance degrades with more users</li>
                        </ul>
                      </div>
                      <div className="rounded-lg border border-[#F4C430]/40 bg-[#FFFDF4] p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-3">After</p>
                        <ul className="space-y-2 text-sm text-slate-700">
                          <li>Query aggregation layer added</li>
                          <li>Caching strategy introduced</li>
                          <li>API response time reduced dramatically</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="h-full bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                      <div className="mb-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Before</p>
                        <ul className="space-y-2 text-sm text-slate-700">
                          <li>Backend changes are risky</li>
                          <li>Developers afraid to touch core modules</li>
                          <li>Deployments break unexpectedly</li>
                        </ul>
                      </div>
                      <div className="rounded-lg border border-[#F4C430]/40 bg-[#FFFDF4] p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-3">After</p>
                        <ul className="space-y-2 text-sm text-slate-700">
                          <li>Clean service boundaries introduced</li>
                          <li>Clear architecture layers defined</li>
                          <li>Safe deployments and faster iteration</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="h-full bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                      <div className="mb-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Before</p>
                        <ul className="space-y-2 text-sm text-slate-700">
                          <li>APIs built quickly during MVP</li>
                          <li>Endpoints tightly coupled</li>
                          <li>Scaling becomes difficult</li>
                        </ul>
                      </div>
                      <div className="rounded-lg border border-[#F4C430]/40 bg-[#FFFDF4] p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-3">After</p>
                        <ul className="space-y-2 text-sm text-slate-700">
                          <li>API design standardized</li>
                          <li>Domain separation introduced</li>
                          <li>Scalable service architecture implemented</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* RED FLAGS YOUR SAAS ARCHITECTURE NEEDS REVIEW */}
            <section className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4 text-center">
                  Common SaaS Problems & How I Fix Them
                </h2>
                <p className="text-sm text-slate-500 mb-12 text-center">
                  If any of these sound familiar, it might be time for an architecture review.
                </p>

                <div className="space-y-3 mb-10">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-sm text-slate-700 flex items-start">
                      <span className="text-[#F4C430] mr-3 font-semibold">•</span>
                      <span>Dashboard becomes slower as users grow</span>
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-sm text-slate-700 flex items-start">
                      <span className="text-[#F4C430] mr-3 font-semibold">•</span>
                      <span>Backend changes are risky and hard to deploy</span>
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-sm text-slate-700 flex items-start">
                      <span className="text-[#F4C430] mr-3 font-semibold">•</span>
                      <span>APIs were designed quickly and now cause bottlenecks</span>
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-sm text-slate-700 flex items-start">
                      <span className="text-[#F4C430] mr-3 font-semibold">•</span>
                      <span>Database queries are becoming slow or complex</span>
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-sm text-slate-700 flex items-start">
                      <span className="text-[#F4C430] mr-3 font-semibold">•</span>
                      <span>Engineers are afraid to touch certain parts of the system</span>
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  {/* Book Architecture Review button removed as requested */}
                </div>
              </div>
            </section>

            {/* FEATURED PROJECT */}
            <section id="featured-project" className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
              <div className="mx-auto max-w-6xl">
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4 text-center">
                  Featured Project
                </h2>
                <p className="text-sm text-slate-500 mb-14 text-center">
                  AiruNote
                </p>
                
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">AiruNote</h3>
                    <p className="text-sm text-slate-600 mb-6">
                      AI-assisted knowledge management platform designed with modular architecture and installable apps.
                    </p>

                    <div className="mb-6 text-sm text-slate-700">
                      <div><span className="font-semibold">Problem:</span><br/>Slow, unstructured knowledge retrieval</div>
                      <div className="mt-3"><span className="font-semibold">Solution:</span><br/>Modular SaaS architecture with AI pipeline</div>
                      <div className="mt-3"><span className="font-semibold">Result:</span><br/>
                        <span className="flex items-start"><span className="text-[#F4C430] mr-2">•</span>Faster data retrieval</span>
                        <span className="flex items-start"><span className="text-[#F4C430] mr-2">•</span>Scalable system foundation</span>
                        <span className="flex items-start"><span className="text-[#F4C430] mr-2">•</span>Extensible via installable apps</span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm mb-5">
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                        Project Screenshot
                      </p>
                      <Image
                        src="/architectking/airunote-preview.png"
                        alt="AiruNote project screenshot"
                        width={1365}
                        height={768}
                        className="h-48 w-full rounded border border-slate-200 object-cover"
                      />
                    </div>

                    <Link
                      href="/case-studies/airunote"
                      className="inline-flex items-center justify-center rounded-lg bg-[#F4C430] px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-sm transition-all hover:bg-[#F4C430]/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#F4C430] focus:ring-offset-2"
                    >
                      View Case Study
                    </Link>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4">
                      Architecture Diagram
                    </p>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden shadow-sm">
                      <DiagramCreator data={selectedProductionWorkDiagrams.airunote} className="p-2" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* EXPERIENCE */}
            {/* EXPERIENCE & SYSTEMS BUILT (MERGED) */}
            <section className="relative bg-slate-50/60 border-y border-slate-200/70">
              <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
                <div className="mx-auto max-w-4xl">
                  <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-8 text-center">
                    Experience & Systems Built
                  </h2>
                  <div className="space-y-4 mb-16">
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-sm text-slate-700">
                        Senior full-stack engineer and architecture lead across enterprise and startup teams, delivering SaaS platforms, operational dashboards, and workflow systems.
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-sm text-slate-700">
                        Built and maintained production systems using React, .NET, Node, and SQL, with focus on reliability, maintainability, and clean system boundaries.
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-sm text-slate-700">
                        Partnered with product and engineering teams to scope, design, and deliver business-critical features from architecture through production rollout.
                      </p>
                    </div>
                  </div>
                </div>
                {/* System cards from 'Systems I've Architected' */}
                <div className="mx-auto max-w-6xl">
                  <p className="text-sm text-slate-500 mb-14 text-center max-w-3xl mx-auto">
                    Production systems built across enterprise and startup environments. Focused on reliability, scalability, and long-term maintainability.
                  </p>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-8">
                    <div>
                      <div className="h-full bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">
                          SaaS Platforms
                        </h3>
                        <p className="text-sm text-slate-600">
                          Multi-tenant SaaS platforms with authentication systems, APIs, and scalable backend services.
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="h-full bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">
                          Admin &amp; Operations Dashboards
                        </h3>
                        <p className="text-sm text-slate-600">
                          Operational dashboards with analytics, reporting tools, and role-based access systems.
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="h-full bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">
                          Internal Workflow Systems
                        </h3>
                        <p className="text-sm text-slate-600">
                          Internal business tools supporting daily operations, integrations, and automation pipelines.
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="h-full bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">
                          AI Knowledge Platforms
                        </h3>
                        <p className="text-sm text-slate-600">
                          AI-enabled knowledge systems with modular architecture and extensible capabilities.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SYSTEMS I'VE ARCHITECTED */}
            {/* ...section merged above, this section removed... */}

            {/* FREE 15-MINUTE ARCHITECTURE DIAGNOSIS */}
            {/* ARCHITECTURE REVIEW & SYSTEM FEEDBACK (MERGED) */}
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

            {/* CONSULTING OFFER */}
            {/* ...section merged above, this section removed... */}

            {/* FINAL PUNCHLINE SECTION */}
            <section className={classes.finalClose}>
              <div className={classes.finalCloseInner}>
                <h2 className={classes.finalCloseTitle}>
                  Let’s Fix Your System Before It Becomes a Bigger Problem
                </h2>
                {/* Final punchline CTA removed as requested */}
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
                <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl md:text-7xl leading-[1.1] pb-3">
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
                    Get Expert Feedback on Your System
                  </a>
                  <a
                    href="/pdf/ARVIN_JAYSON_CASTRO_Senior_Full-Stack_Engineer.pdf"
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
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
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
                  <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
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
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
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
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <p className="text-xs font-medium text-slate-700">Arvin Jayson Castro</p>
              <p className="mt-1 text-xs text-slate-500">SaaS Systems Architect</p>
              <p className="text-xs text-slate-500">Open to Senior Full-Stack Engineer and Systems Architect roles.</p>
              <p className="mt-1 text-xs text-slate-600">Architecture Reviews • SaaS Platforms • Admin Dashboards</p>
              <p className="mt-2 text-xs text-slate-400">BS Computer Science, University of Santo Tomas</p>
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
