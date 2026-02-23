'use client';

import Link from 'next/link';
import { SiteNavbar } from '@/components/shared/SiteNavbar';
import { AmbientBackground } from '@/components/ui/AmbientBackground';

interface CaseStudyLayoutProps {
  title: string;
  subtitle: string;
  summary: string;
  problemContext: React.ReactNode;
  systemArchitecture: React.ReactNode;
  technicalStack: string[];
  myContributions: React.ReactNode;
  implementationHighlights: React.ReactNode;
  outcomeImpact: React.ReactNode;
  highLevelArchitectureDiagram?: React.ReactNode;
  moduleBreakdownDiagram?: React.ReactNode;
}

export function CaseStudyLayout({
  title,
  subtitle,
  summary,
  problemContext,
  systemArchitecture,
  technicalStack,
  myContributions,
  implementationHighlights,
  outcomeImpact,
  highLevelArchitectureDiagram,
  moduleBreakdownDiagram,
}: CaseStudyLayoutProps) {
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
        {/* Hero Section */}
        <section className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/case-studies"
              className="inline-flex items-center text-sm text-slate-600 hover:text-[#F4C430] transition-colors mb-6"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Case Studies
            </Link>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl mb-4">
              {title}
            </h1>
            <p className="text-xl text-slate-600 mb-4">
              {subtitle}
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              {summary}
            </p>
          </div>
        </section>

        {/* Content Sections */}
        <section className="relative mx-auto max-w-7xl px-6 pb-16 md:pb-24">
          <div className="mx-auto max-w-4xl space-y-16">
            {/* Section 1: Problem Context */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Problem Context</h2>
              <div className="text-slate-700 leading-relaxed">
                {problemContext}
              </div>
            </div>

            {/* Section 2: System Architecture */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">System Architecture</h2>
              <div className="text-slate-700 leading-relaxed mb-6">
                {systemArchitecture}
              </div>
              
              {/* High-Level Architecture Diagram */}
              <div className="mb-8 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden shadow-sm">
                {highLevelArchitectureDiagram ? (
                  <div className="relative w-full">
                    {highLevelArchitectureDiagram}
                  </div>
                ) : (
                  <div className="relative aspect-video w-full flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm font-medium text-slate-500 mb-2">High-Level Architecture</p>
                      <p className="text-xs text-slate-400">System Architecture Preview</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Section 3: Technical Stack */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Technical Stack</h2>
              <div className="flex flex-wrap gap-2">
                {technicalStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Section 4: My Contributions */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">My Contributions</h2>
              <div className="text-slate-700 leading-relaxed">
                {myContributions}
              </div>
            </div>

            {/* Section 5: Implementation Highlights */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Implementation Highlights</h2>
              <div className="text-slate-700 leading-relaxed">
                {implementationHighlights}
              </div>
            </div>

            {/* Section 6: Outcome / Impact */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Outcome & Impact</h2>
              <div className="text-slate-700 leading-relaxed">
                {outcomeImpact}
              </div>
            </div>

            {/* Section 7: Module Breakdown Diagram */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Module Breakdown</h2>
              <div className="rounded-lg border border-slate-200 bg-slate-50 overflow-hidden shadow-sm">
                {moduleBreakdownDiagram ? (
                  <div className="relative w-full">
                    {moduleBreakdownDiagram}
                  </div>
                ) : (
                  <div className="relative aspect-video w-full flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm font-medium text-slate-500 mb-2">Module Breakdown</p>
                      <p className="text-xs text-slate-400">System Architecture Preview</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Back to Case Studies CTA */}
            <div className="pt-8 border-t border-slate-200">
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center rounded-lg bg-[#F4C430] px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-sm transition-all hover:bg-[#F4C430]/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#F4C430] focus:ring-offset-2"
              >
                View All Case Studies
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <p className="mt-6 text-xs text-slate-400 text-center">
                Client identity anonymized due to confidentiality agreements.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-slate-200 bg-slate-50/50">
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
