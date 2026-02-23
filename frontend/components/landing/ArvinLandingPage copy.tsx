'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { CaseStudy } from './CaseStudy';
import { CTASection } from './CTASection';
import { AuthorityStrip } from './AuthorityStrip';
import { TechnicalDepth } from './TechnicalDepth';
import { SystemsArchitecture } from './SystemsArchitecture';
import { BookAuthorityStrip } from './BookAuthorityStrip';
import { SiteNavbar } from '@/components/shared/SiteNavbar';
import classes from './arvinLandingPage.module.css';

export function ArvinLandingPage2() {
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

      {/* Header - Reusable navbar */}
      <SiteNavbar />

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
                  I build systems that don’t collapse under pressure.                  </span>
                </h1>
                
                {/* Availability line - under subheadline */}
                <div className="mt-6 text-sm text-slate-500">
                  <span>Available for:</span>
                  <span className="mx-2">•</span>
                  <span>System stabilization</span>
                  <span className="mx-2">•</span>
                  <span>Feature delivery</span>
                  <span className="mx-2">•</span>
                  <span>Contract or full-time collaboration</span>
                </div>
                
                {/* Skills list - horizontal with bullets */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-lg text-slate-600">
                  <span>React / TypeScript</span>
                  <span className="text-slate-400">•</span>
                  <span>APIs</span>
                  <span className="text-slate-400">•</span>
                  <span>SQL</span>
                  <span className="text-slate-400">•</span>
                  <span>Cloud</span>
                  <span className="text-slate-400">•</span>
                  <span>System Implementation</span>
                </div>

                <div className="mt-10">
                  <a
                    href="mailto:arvinjaysoncastro@gmail.com"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#F4C430] px-8 py-4 text-base font-semibold text-[#0F172A] shadow-lg shadow-[#F4C430]/30 transition-all hover:bg-[#F4C430]/90 hover:shadow-xl hover:shadow-[#F4C430]/40 focus:outline-none focus:ring-2 focus:ring-[#F4C430] focus:ring-offset-2"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    Message Me Now
                  </a>
                </div>

                {/* Microcopy below CTA */}
                <p className="mt-3 text-sm text-slate-500">
                  Direct access. Clear communication. Production-ready outcomes.
                </p>

                {/* Motto below CTA */}
                <p className="mt-6 text-lg font-medium text-slate-700">
                  &quot;I build what teams can rely on.&quot;
                </p>

                {/* Contact info at bottom */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
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
              <div className="w-full px-6" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
                <div className="mx-auto text-center" style={{ maxWidth: '1200px' }}>
                  {/* METRICS STRIP */}
                  <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-sm md:text-base font-medium mb-8" style={{ letterSpacing: '0.75px', color: '#e2e8f0' }}>
                    <span>16+ Years Experience</span>
                    <span className="hidden md:inline" style={{ color: '#94a3b8' }}>•</span>
                    <span className="md:hidden" style={{ color: '#94a3b8' }}>•</span>
                    <span>20+ Production Systems</span>
                    <span className="hidden md:inline" style={{ color: '#94a3b8' }}>•</span>
                    <span className="md:hidden" style={{ color: '#94a3b8' }}>•</span>
                    <span>Multi-tenant SaaS Architect</span>
                    <span className="hidden md:inline" style={{ color: '#94a3b8' }}>•</span>
                    <span className="md:hidden" style={{ color: '#94a3b8' }}>•</span>
                    <span>Enterprise + Startup Exposure</span>
                  </div>

                  <h2 
                    className="text-2xl font-semibold mb-2 text-center transition-colors duration-300 ease-in-out" 
                    style={{ 
                      letterSpacing: '0.5px',
                      color: '#f1f5f9'
                    }}
                  >
                    Technologies I Use to Deliver Stable Production Systems                  </h2>
                  <p className="text-sm mb-8 text-center" style={{ color: '#94a3b8' }}>
                    Stack I actively use in live systems.
                  </p>
                  
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
                          <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.185-0.047-0.268,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.193,0.139,0.242l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-1.384-0.224l-2.444-1.412c-0.616-0.36-1.001-1.01-1.001-1.734V6.921 c0-0.724,0.385-1.377,1.001-1.737l8.795-5.082c0.618-0.361,1.433-0.361,2.049,0l8.794,5.082c0.619,0.361,1.007,1.014,1.007,1.737 v10.15c0,0.723-0.387,1.374-1.004,1.734l-8.795,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-3.277c-1.697-0.556-2.027-0.984-2.027-1.792c0-0.897,0.592-1.5,1.593-1.5c1.038,0,1.643,0.474,2.041,1.488 c0.082,0.196,0.24,0.318,0.45,0.318h1.133c0.184,0,0.343-0.08,0.461-0.22c0.119-0.14,0.18-0.33,0.12-0.513 c-0.38-1.455-1.407-2.443-3.129-2.976V4.84c0-0.142-0.115-0.255-0.256-0.255h-1.114c-0.143,0-0.256,0.113-0.256,0.255v1.443 c-1.792,0.415-3.183,1.612-3.183,3.513c0,1.896,1.24,2.415,3.95,3.286c1.787,0.582,2.008,1.02,2.008,1.8c0,0.962-0.717,1.602-1.87,1.602 c-1.407,0-2.188-0.688-2.531-1.528c-0.062-0.152-0.215-0.255-0.386-0.255H9.423c-0.192,0-0.353,0.098-0.448,0.255 c-0.099,0.164-0.12,0.362-0.062,0.543c0.515,1.602,1.976,2.789,4.151,3.158v1.549c0,0.142,0.114,0.257,0.256,0.257h1.116 c0.141,0,0.255-0.115,0.255-0.257v-1.555c1.864-0.361,3.231-1.525,3.231-3.514H19.099z"/>
                        </svg>
                      )},
                      { name: 'React', icon: (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="12" cy="12" r="2" fill="currentColor"/>
                          <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="currentColor" strokeWidth="1"/>
                          <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(60 12 12)"/>
                          <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(120 12 12)"/>
                        </svg>
                      )},
                      { name: 'TypeScript' },
                      { name: 'Angular', icon: (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9.96 11.31l1.09-1.9L12 6.25l.95 3.16 1.09 1.9-2.04-.01L12 11.3l-2.04-.01zm-2.04 1.5h4.16l-2.08 3.61-2.08-3.61zM12 2L2 7l2 14 8 1 8-1 2-14L12 2zm0 2.18l7.39 2.12L18.3 19.5 12 20.5l-6.3-1L4.61 6.3L12 4.18z"/>
                        </svg>
                      )},
                      { name: 'PostgreSQL', icon: (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.559 4.684c-.338-1.19-1.428-2.043-2.634-2.043-.338 0-.676.084-1.012.17-.338-.085-.676-.17-1.012-.17-1.206 0-2.296.853-2.634 2.043-.338 1.19.084 2.38.676 3.313L12 9.93l-3.925-1.933c.592-.933 1.014-2.123.676-3.313C8.413 3.494 7.323 2.64 6.117 2.64c-.338 0-.676.085-1.012.17-.338-.085-.676-.17-1.012-.17C3.897 2.64 2.807 3.494 2.47 4.684c-.338 1.19.084 2.38.676 3.313L1.014 9.93c-.338.17-.338.593 0 .763l2.132 1.014c-.592.933-1.014 2.123-.676 3.313.338 1.19 1.428 2.043 2.634 2.043.338 0 .676-.084 1.012-.17.338.085.676.17 1.012.17 1.206 0 2.296-.853 2.634-2.043.338-1.19-.084-2.38-.676-3.313L12 14.07l3.925 1.933c-.592.933-1.014 2.123-.676 3.313.338 1.19 1.428 2.043 2.634 2.043.338 0 .676-.084 1.012-.17.338.085.676.17 1.012.17 1.206 0 2.296-.853 2.634-2.043.338-1.19-.084-2.38-.676-3.313L22.986 14.07c.338-.17.338-.593 0-.763l-2.132-1.014c.592-.933 1.014-2.123.676-3.313z"/>
                        </svg>
                      )},
                      { name: 'SQL Server' },
                      { name: 'Neon' },
                      { name: 'REST' },
                      { name: 'CI/CD' },
                      { name: 'Docker', icon: (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M13.983 6.21c.12-.008.235-.014.343-.014.084 0 .168.006.25.01a5.24 5.24 0 0 1 4.19 2.05h.004a5.28 5.28 0 0 1 .95 3.02v.05a5.28 5.28 0 0 1-.3 1.72 5.26 5.26 0 0 1-4.88 3.38h-.05a5.24 5.24 0 0 1-3.72-1.55 5.2 5.2 0 0 1-1.5-3.5v-.05c0-.07.01-.14.01-.2a5.28 5.28 0 0 1 5.24-4.98zm.02 1.99c-.08 0-.15.01-.23.02a3.2 3.2 0 0 0-2.57 1.25 3.18 3.18 0 0 0-.58 1.8 3.22 3.22 0 0 0 .92 2.28 3.2 3.2 0 0 0 2.28.95h.05a3.19 3.19 0 0 0 2.96-2.05 3.23 3.23 0 0 0 .19-1.05v-.05a3.2 3.2 0 0 0-3.18-3.05zM4.74 2.26h2.12v2.13H4.74zm0 3.18h2.12v2.13H4.74zm0 3.18h2.12v2.13H4.74zm-3.15 0h2.12v2.13H1.59zm3.15-6.37h2.12v2.14H4.74zm-3.15 0h2.12v2.14H1.59zm3.15-3.19h2.12v2.13H4.74zm-3.15 0h2.12v2.13H1.59zm16.5 12.75h-1.6v1.61h-1.6v-1.61h-1.6v-1.6h1.6v-1.6h1.6v1.6h1.6zm-3.2-1.6h-1.6v1.6h1.6zm3.2-3.2h-1.6v1.6h1.6zm0-3.2h-1.6v1.6h1.6zm-3.2 0h-1.6v1.6h1.6z"/>
                        </svg>
                      )},
                      { name: 'Tailwind' },
                      { name: 'CSS' },
                      { name: 'Git', icon: (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M21.62 11.108l-8.731-8.729a1.487 1.487 0 0 0-2.104 0L9.617 3.492l2.299 2.281a1.784 1.784 0 0 1 2.242 2.27l2.214 2.188a1.785 1.785 0 0 1 .599 2.953c-.442.258-.958.365-1.477.365a2.557 2.557 0 0 1-1.825-.755l-2.131-2.108v5.577a1.8 1.8 0 0 1 .488 3.523 1.8 1.8 0 0 1-1.976-1.976V9.849a1.785 1.785 0 0 1-.98-2.323L6.983 4.93 1.108 10.804a1.488 1.488 0 0 0 0 2.104l8.731 8.729a1.487 1.487 0 0 0 2.104 0l8.731-8.729a1.488 1.488 0 0 0 0-2.104"/>
                        </svg>
                      )},
                      { name: 'Prisma' },
                      { name: 'EF Core' },
                      { name: 'Next.js', icon: (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.5725 0c-.1763 0-.3109.0007-.3109.0007L4.5078 5.9939l-.0007.0007 6.1682 6.1682.0007-.0007 6.2558-6.2558L11.5725 0zM5.3108 7.1336l-.0007.0007 4.6847 4.6847-1.7827 1.7827-4.6847-4.6847L2.727 12.0007 11.5725 20.8462l.0007-.0007 1.7827-1.7827-4.6847-4.6847 4.6847-4.6847-1.7827-1.7827-4.6847 4.6847zm6.2558 1.7827l1.7827-1.7827 6.2558 6.2558-6.2558 6.2558-1.7827-1.7827 4.4731-4.4731-4.4731-4.4731z"/>
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

            {/* TWO COLUMN SECTION: URGENCY + PORTFOLIO */}
            <section className="relative bg-slate-50/50">
              <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
                <div className="mx-auto max-w-6xl">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
                    {/* LEFT COLUMN — Urgency Block */}
                    <div>
                      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">
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
                          Senior-level production troubleshooting. Calm execution under pressure.
                        </p>

                        <a
                          href="mailto:arvinjaysoncastro@gmail.com"
                          className="inline-flex items-center justify-center w-full rounded-lg bg-[#F4C430] px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-sm transition-all hover:bg-[#F4C430]/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#F4C430] focus:ring-offset-2"
                        >
                          Get Help Now
                        </a>

                        <p className="mt-3 text-xs text-slate-500 text-center">
                          Direct message. No layers. No delays.
                        </p>
                      </div>
                    </div>

                    {/* RIGHT COLUMN — CV Card */}
                    <div>
                      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">
                          Professional Résumé
                        </h3>
                        
                        <ul className="space-y-2 mb-4 text-sm text-slate-700">
                          <li className="flex items-start">
                            <span className="text-[#F4C430] mr-2">•</span>
                            <span>Detailed work history (16 Years)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#F4C430] mr-2">•</span>
                            <span>Production impact across enterprise and startup environments.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#F4C430] mr-2">•</span>
                            <span>Skill Matrix</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#F4C430] mr-2">•</span>
                            <span>Architecture decisions documented with real-world context.</span>
                          </li>
                        </ul>

                        <p className="text-sm text-slate-600 mb-4">
                          Comprehensive experience documentation. Clear technical depth.
                        </p>

                        <a
                          href="/pdf/ARVIN_JAYSON_CASTRO_Senior_Full-Stack_Engineer.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-full rounded-lg bg-[#F4C430] px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-sm transition-all hover:bg-[#F4C430]/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#F4C430] focus:ring-offset-2"
                        >
                          Download Résumé (PDF)
                        </a>

                        <p className="mt-3 text-xs text-slate-500 text-center">
                          Structured experience. Real production impact.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* BOOK STRIP */} 
            <section 
              className="relative border-y border-slate-900/20"
              style={{
                background: `
                  radial-gradient(circle at 30% 20%, rgba(255,255,255,0.03), transparent 40%),
                  #111318
                `
              }}
            >
              <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
                <div className="mx-auto max-w-6xl">
                  <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    {/* LEFT: Book Image */}
                    <div className="flex-shrink-0 w-32 md:w-40">
                      <div className="relative aspect-[9/16] w-full">
                        <Image
                          src="/architectking/working_fundamentals_book.png"
                          alt="Working Fundamentals Book"
                          fill
                          className="object-contain drop-shadow-lg"
                          sizes="(max-width: 768px) 128px, 160px"
                        />
                      </div>
                    </div>
                    
                    {/* RIGHT: Content */}
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-xs font-medium text-[#9CA3AF] mb-4 uppercase tracking-[0.1em]">
                        HOW I THINK ABOUT SOFTWARE
                      </h3>
                      <p className="text-lg text-[#EAEAEA] mb-4 leading-relaxed">
                        &quot;Every program — regardless of language, framework, or scale — reduces to the same shape.&quot;
                      </p>
                      <p className="text-2xl font-bold text-[#EAEAEA] mb-5">
                        Input → Transform → Output
                      </p>
                      <p className="text-base text-[#9CA3AF] mb-6">
                        Most systems fail because engineers forget this shape.
                      </p>
                      <Link
                        href="/working-fundamentals"
                        className="group inline-flex items-center text-base font-semibold text-[#F4C430] hover:text-[#E6B82E] transition-colors"
                      >
                        <span className="border-b border-transparent group-hover:border-[#F4C430] transition-all duration-200">
                          Explore the System
                        </span>
                        <svg 
                          className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* PRODUCTION SYSTEMS I'VE BUILT */}
            <section className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
              <div className="mx-auto max-w-6xl">
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-12 text-center">
                  Production Systems I&apos;ve Built
                </h2>
                
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
                  {/* LEFT COLUMN — Featured System (Oyeroyee) */}
                  <div>
                    {/* UI Preview */}
                    <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden shadow-sm">
                      <div className="relative aspect-video w-full">
                        <Image
                          src="/architectking/oyeroyee.png"
                          alt="Oyeroyee Platform Preview"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Oyeroyee</h3>
                    <p className="text-sm text-slate-500 mb-4">Job & Applicant Tracking Platform</p>
                    <p className="text-slate-700 mb-6">
                      Production job & applicant tracking platform.
                      Designed, built, and deployed end-to-end.
                    </p>
                    <ul className="space-y-2 mb-6 text-sm text-slate-700">
                      <li className="flex items-start">
                        <span className="text-[#F4C430] mr-2 mt-1">•</span>
                        <span>Live production deployment</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F4C430] mr-2 mt-1">•</span>
                        <span>System architecture & deployment</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F4C430] mr-2 mt-1">•</span>
                        <span>Funnel-based analytics and insights</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F4C430] mr-2 mt-1">•</span>
                        <span>Product thinking applied to code</span>
                      </li>
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href="/case-studies"
                        className="inline-flex items-center justify-center rounded-lg bg-[#F4C430] px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-sm transition-all hover:bg-[#F4C430]/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#F4C430] focus:ring-offset-2"
                      >
                        View Case Study
                      </Link>
                      <a
                        href="https://www.oyeroyee.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-[#F4C430] hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#F4C430] focus:ring-offset-2"
                      >
                        See Live Site
                      </a>
                    </div>
                  </div>

                  {/* RIGHT COLUMN — Other Systems List */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Other Systems</h3>
                    <ul className="space-y-4">
                      <li>
                        <Link
                          href="/case-studies/learning-platform"
                          className="flex items-center justify-between group text-slate-700 hover:text-[#F4C430] transition-colors"
                        >
                          <span className="font-medium">Enterprise Learning & Certification Platform</span>
                          <svg className="w-4 h-4 text-slate-400 group-hover:text-[#F4C430] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/case-studies/dynamic-form-engine"
                          className="flex items-center justify-between group text-slate-700 hover:text-[#F4C430] transition-colors"
                        >
                          <span className="font-medium">Dynamic Form & Identity Engine</span>
                          <svg className="w-4 h-4 text-slate-400 group-hover:text-[#F4C430] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/case-studies/org-role-billing"
                          className="flex items-center justify-between group text-slate-700 hover:text-[#F4C430] transition-colors"
                        >
                          <span className="font-medium">Organization & Role Management + Billing System</span>
                          <svg className="w-4 h-4 text-slate-400 group-hover:text-[#F4C430] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* FINAL PUNCHLINE SECTION */}
            <section className={classes.finalClose}>
              <div className={classes.finalCloseInner}>
                <h2 className={classes.finalCloseTitle}>
                If your system must work - not just demo - let’s talk.
                </h2>
                <button
                  className={classes.primaryCTA}
                  onClick={() => {
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Start The Conversation
                </button>
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
                    Book a 20-Min Architecture Call
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
