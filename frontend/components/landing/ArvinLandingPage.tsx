'use client';

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
              <Link href="/working-fundamentals" className="text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors">
                Working Fundamentals
              </Link>
              <a href="#case-studies" className="text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors">
                Case Studies
              </a>
              <a href="#systems" className="text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors">
                Systems
              </a>
              <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors">
                Contact
              </a>
            </nav>
            <a
              href="https://m.me/arjayofficial127"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center rounded-md border border-blue-600 bg-transparent px-4 py-1.5 text-sm font-medium text-blue-600 transition-all hover:bg-blue-50 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1"
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
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-tight">
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
                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                  >
                    Message Me Now
                  </a>
                </div>

                {/* Power line - placed immediately after CTA for psychological reinforcement */}
                <p className="mt-4 text-lg font-medium text-slate-700">
                  &quot;I solve problems. I ship.&quot;
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
                  <a href="https://www.linkedin.com/in/arvinjaysoncastro" target="_blank" rel="noopener noreferrer" className="hover:text-teal-700 transition-colors">
                    LinkedIn
                  </a>
                  <span>•</span>
                  <a href="mailto:arvinjaysontamayocastro@gmail.com" className="hover:text-teal-700 transition-colors">
                    Email
                  </a>
                  <span>•</span>
                  <a href="tel:+1234567890" className="hover:text-teal-700 transition-colors">
                    Phone
                  </a>
                </div>
              </div>
            </section>

            {/* FOLD 2 — TWO LANES */}
            <section className="relative bg-slate-50/50">
              <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
                <div className="mx-auto max-w-6xl">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
                    {/* LEFT COLUMN */}
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-6">
                        Full Lifecycle Engineering
                      </h2>
                      <ul className="space-y-3 text-slate-700">
                        <li className="flex items-start">
                          <span className="text-teal-600 mr-2">•</span>
                          <span>Azure / Render / Vercel</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-600 mr-2">•</span>
                          <span>Neon / PostgreSQL / SQL Server</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-600 mr-2">•</span>
                          <span>API Architecture</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-600 mr-2">•</span>
                          <span>System Integration</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-600 mr-2">•</span>
                          <span>Deployment Automation</span>
                        </li>
                      </ul>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-6">
                        UI/UX Edge
                      </h2>
                      <ul className="space-y-3 text-slate-700">
                        <li className="flex items-start">
                          <span className="text-teal-600 mr-2">•</span>
                          <span>UX thinking</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-600 mr-2">•</span>
                          <span>Conversion-focused design</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-600 mr-2">•</span>
                          <span>Product feel &amp; usability</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-600 mr-2">•</span>
                          <span>Engineering + design balance</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FOLD 3 — ARCHITECTURE POSITIONING */}
            <section className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-6">
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
                    className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-teal-700/30 transition-all hover:bg-teal-800 hover:shadow-xl hover:shadow-teal-700/40 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
                  >
                    Book a 20-Min Architecture Call
                  </a>
                  <a
                    href="/pdf/ArJay_Castro_Skills.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg border-2 border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition-all hover:border-teal-600 hover:bg-slate-50 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
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
                  className="mt-1 block text-sm text-teal-700 hover:text-teal-800"
                >
                  arvinjaysontamayocastro@gmail.com
                </a>
                <a 
                  href="https://www.linkedin.com/in/arvinjaysoncastro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-1 block text-sm text-teal-700 hover:text-teal-800"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://www.github.com/arvinjaysoncastro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-1 block text-sm text-teal-700 hover:text-teal-800"
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
