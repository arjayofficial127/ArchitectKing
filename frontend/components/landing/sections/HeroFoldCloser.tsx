'use client';
import Link from 'next/link';

export function HeroFoldCloser() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-12 md:py-20 mt-8 md:mt-12 overflow-x-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-white/3 to-white/5 bg-float" />
      <div className="mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="mx-auto max-w-sm md:max-w-none text-center md:text-left">
            <p className="text-sm text-gray-500 mb-3 opacity-0 animate-fade-in-up delay-0">Solutions Architect — Scalable SaaS Systems</p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl md:text-7xl leading-[1.05] mt-0 opacity-0 animate-fade-in-up delay-100">
              <span className="block">Built to scale.</span>
              <span className="block">Not break.</span>
            </h1>

            <p className="mt-4 text-base md:text-xl text-slate-600 opacity-0 animate-fade-in-up delay-150 leading-relaxed text-center md:text-left">
                I architect and evolve scalable production systems that perform under pressure and scale with your business.
            </p>

              <ul className="mt-6 space-y-2 text-slate-700 text-center md:text-left">
                <li className="flex items-start justify-center md:justify-start opacity-0 animate-fade-in-up delay-250"><span className="text-[#F4C430] mr-3">✔</span><span className="font-semibold text-slate-800 text-sm">15+ Years in production systems</span></li>
                <li className="flex items-start justify-center md:justify-start opacity-0 animate-fade-in-up delay-350"><span className="text-[#F4C430] mr-3">✔</span><span className="font-semibold text-slate-800 text-sm">20+ systems designed and delivered</span></li>
                <li className="flex items-start justify-center md:justify-start opacity-0 animate-fade-in-up delay-450"><span className="text-[#F4C430] mr-3">✔</span><span className="font-semibold text-slate-800 text-sm">Multi-tenant platforms • RBAC • Fast and reliable</span></li>
              </ul>
              <p className="mt-4 text-base text-slate-700 font-medium text-center md:text-left opacity-0 animate-fade-in-up delay-550">Operating at Senior, Lead, and Architect levels</p>

              <div className="mt-4 md:mt-10 text-left">
<div className="flex flex-col items-center md:items-start gap-2 mt-4 max-w-sm md:max-w-none mx-auto md:mx-0 px-4 md:px-0">

  <button className="w-full md:w-auto px-6 py-3 rounded-md bg-[#0F172A] text-white font-medium text-center md:text-left">
    Discuss Your System
  </button>

  <p className="text-sm text-slate-500 text-center md:text-left max-w-xs md:max-w-none">
    Your system deserves focus every step of the way
  </p>

</div>
              </div>
          </div>

            <div className="flex justify-center md:justify-end">
              <div className="max-w-xs w-full mx-auto md:w-[440px] mt-6 mb-6 md:mt-0 rounded-2xl shadow-2xl overflow-hidden border border-slate-200/60">
                <img src="/architectking/profile_recent.png" alt="Arvin Jayson Castro" className="w-full h-full object-cover" />
              </div>
            </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 420ms cubic-bezier(.2,.9,.2,1) forwards; }
        .delay-0 { animation-delay: 0ms; }
        .delay-100 { animation-delay: 100ms; }
        .delay-150 { animation-delay: 150ms; }
        .delay-250 { animation-delay: 250ms; }
        .delay-350 { animation-delay: 350ms; }
        .delay-450 { animation-delay: 450ms; }
        .delay-550 { animation-delay: 550ms; }
        .delay-650 { animation-delay: 650ms; }
        .delay-750 { animation-delay: 750ms; }
        .delay-850 { animation-delay: 850ms; }
        .btn-hover-scale { transition: transform 220ms ease, box-shadow 220ms ease; }
        .btn-hover-scale:hover { transform: scale(1.02); }
        @keyframes floatY { 0%{transform:translateY(0)}50%{transform:translateY(-6px)}100%{transform:translateY(0)} }
        .bg-float { animation: floatY 6s ease-in-out infinite; will-change: transform; }
      `}</style>
    </section>
  );
}
