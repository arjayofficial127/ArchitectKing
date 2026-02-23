'use client';

import Link from 'next/link';
import { SiteNavbar } from '@/components/shared/SiteNavbar';
import { AmbientBackground } from '@/components/ui/AmbientBackground';

export default function DynamicFormEngineCaseStudy() {
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
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              Dynamic Form & Identity Engine
            </h1>
          </div>
        </section>

        {/* Content Sections */}
        <section className="relative mx-auto max-w-7xl px-6 pb-16 md:pb-24">
          <div className="mx-auto max-w-4xl space-y-12">
            {/* Overview */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
              <p className="text-slate-700 leading-relaxed">
                Designed and built a configurable dynamic form engine supporting complex validation logic, identity-based workflows, and intelligent rule-based processing.
              </p>
            </div>

            {/* Key Capabilities */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Capabilities</h2>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start">
                  <span className="text-[#F4C430] mr-2 mt-1">•</span>
                  <span>Configurable field templates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#F4C430] mr-2 mt-1">•</span>
                  <span>Conditional logic</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#F4C430] mr-2 mt-1">•</span>
                  <span>Validation rules engine</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#F4C430] mr-2 mt-1">•</span>
                  <span>Dynamic form rendering</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#F4C430] mr-2 mt-1">•</span>
                  <span>Reporting dashboards</span>
                </li>
              </ul>
            </div>

            {/* Architecture */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Architecture</h2>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start">
                  <span className="text-[#F4C430] mr-2 mt-1">•</span>
                  <span>Rule engine backend</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#F4C430] mr-2 mt-1">•</span>
                  <span>Metadata-driven UI rendering</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#F4C430] mr-2 mt-1">•</span>
                  <span>CQRS-style processing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#F4C430] mr-2 mt-1">•</span>
                  <span>Secure identity handling</span>
                </li>
              </ul>
            </div>

            {/* Impact */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Impact</h2>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start">
                  <span className="text-[#F4C430] mr-2 mt-1">•</span>
                  <span>Reduced hard-coded forms</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#F4C430] mr-2 mt-1">•</span>
                  <span>Increased configuration flexibility</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#F4C430] mr-2 mt-1">•</span>
                  <span>Enabled faster feature rollout</span>
                </li>
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {['NodeJS', '.NET', 'SQL', 'React', 'TypeScript'].map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700"
                  >
                    {tech}
                  </span>
                ))}
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
