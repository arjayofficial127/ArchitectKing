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
    title: 'AiruNote',
    slug: 'airunote',
    summary: 'AI-powered note capture, structured knowledge management, and document organization system. Built with privacy-first architecture and modular extensibility.',
    techStack: ['React', 'TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Prisma', 'AI Integration APIs']
  },
  {
    title: 'Enterprise Resource Assessment & Monitoring Platform',
    slug: 'resource-monitoring-system',
    summary: 'Enterprise-grade resource assessment and monitoring platform enabling real-time visibility into organizational resources, capacity planning, and operational metrics across distributed teams.',
    techStack: ['React', 'TypeScript', '.NET Core', 'SQL Server', 'Azure', 'REST APIs', 'Chart.js']
  },
  {
    title: 'Manufacturing Inventory & Operations Platform',
    slug: 'thread-inventory-system',
    summary: 'Production-grade inventory tracking and management system for manufacturing operations, enabling real-time stock monitoring, automated reordering, and comprehensive reporting for supply chain optimization.',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'REST APIs', 'Express.js', 'Material-UI']
  },
  {
    title: 'Government Equipment Registration Platform',
    slug: 'denr-chainsaw-registration',
    summary: 'Secure government compliance system for equipment registration and permit processing, enabling citizens to register equipment, track permit status, and maintain compliance with regulatory requirements.',
    techStack: ['React', 'TypeScript', '.NET Core', 'SQL Server', 'Azure', 'Government APIs', 'PDF Generation']
  },
  {
    title: 'Enterprise Workflow & Forms Management System',
    slug: 'custom-forms-management',
    summary: 'Enterprise-grade dynamic forms platform enabling organizations to create, configure, and manage complex form workflows with conditional logic, validation rules, and seamless backend integration.',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'REST APIs', 'Formik', 'Yup']
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
