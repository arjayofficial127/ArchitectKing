'use client';

import Link from 'next/link';
import { SiteNavbar } from '@/components/shared/SiteNavbar';
import { AmbientBackground } from '@/components/ui/AmbientBackground';

interface CaseStudyCard {
  title: string;
  slug: string;
  summary: string;
  techStack: string[];
}

const caseStudies: CaseStudyCard[] = [
  {
    title: 'Oyeroyee',
    slug: 'oyeroyee',
    summary: 'Production job & applicant tracking platform. Designed, built, and deployed end-to-end with funnel-based analytics and real user deployment.',
    techStack: ['React', 'TypeScript', 'Next.js', 'PostgreSQL', 'Node.js']
  },
  {
    title: 'Enterprise Learning & Certification Platform',
    slug: 'learning-platform',
    summary: 'Scalable learning management system with certification workflows, progress tracking, and enterprise-grade user management.',
    techStack: ['React', '.NET Core', 'SQL Server', 'Azure', 'Docker']
  },
  {
    title: 'Dynamic Form & Identity Engine',
    slug: 'dynamic-form-engine',
    summary: 'Flexible form builder with identity verification, dynamic validation, and secure data handling for enterprise applications.',
    techStack: ['Angular', 'C#', '.NET', 'PostgreSQL', 'REST API']
  },
  {
    title: 'Organization & Role Management + Billing System',
    slug: 'org-role-billing',
    summary: 'Multi-tenant organization management with role-based access control, subscription billing, and automated payment processing.',
    techStack: ['.NET Core', 'SQL', 'React', 'Azure']
  }
];

export default function CaseStudiesPage() {
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
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              Case Studies
            </h1>
            <p className="mt-6 text-lg text-slate-600 sm:text-xl">
              Production systems built and deployed in real-world environments.
            </p>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="relative mx-auto max-w-7xl px-6 pb-16 md:pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {caseStudies.map((study) => (
                <div
                  key={study.slug}
                  className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">
                    {study.title}
                  </h2>
                  <p className="text-slate-700 mb-4 leading-relaxed">
                    {study.summary}
                  </p>
                  
                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {study.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="inline-flex items-center justify-center rounded-lg bg-[#F4C430] px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-sm transition-all hover:bg-[#F4C430]/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#F4C430] focus:ring-offset-2"
                  >
                    View Case Study
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
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
                  href="mailto:arvinjaysontamayocastro@gmail.com" 
                  className="block text-xs text-slate-500 hover:text-[#F4C430] transition-colors"
                >
                  Email
                </a>
                <a 
                  href="https://www.linkedin.com/in/arvin-jayson-castro-7458199a/" 
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
