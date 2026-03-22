'use client';
import { LogoStripFinalBoss } from '../../LogoStripFinalBoss';

export function ProofFoldCloser() {
  return (
    <>
      <div className="h-px bg-slate-200/60 my-16" />
      <section className="relative mx-auto max-w-7xl px-6 py-16 md:py-24 bg-slate-50/50 overflow-x-hidden">
      <div className="mx-auto max-w-4xl text-left">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl mb-4">Systems I’ve Designed and Stabilized</h2>
        <p className="text-base text-slate-600 max-w-2xl">Built and shipped resilient production systems that hold under pressure.</p>

        {/* 2x2 capability grid (outcome-driven) */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-7 border border-slate-300/80 rounded-md bg-white text-center text-slate-700 flex flex-col h-full shadow-sm hover:shadow-xl hover:-translate-y-[2px] transition-all duration-200">
            <div className="flex items-center justify-center gap-3">
              <span className="text-[#F4C430] mr-3">✔</span>
              <h4 className="text-xl font-bold text-slate-900">RBAC & Multi-Tenant Access</h4>
            </div>
            <p className="text-sm text-slate-700 mt-3 leading-relaxed">Designed RBAC systems supporting secure multi-tenant access at scale, reducing permission risk and operational overhead.</p>
          </div>

          <div className="p-7 border border-slate-300/80 rounded-md bg-white text-center text-slate-700 flex flex-col h-full shadow-sm hover:shadow-xl hover:-translate-y-[2px] transition-all duration-200">
            <div className="flex items-center justify-center gap-3">
              <span className="text-[#F4C430] mr-3">✔</span>
              <h4 className="text-xl font-bold text-slate-900">Platform Integration & Architecture</h4>
            </div>
            <p className="text-sm text-slate-700 mt-3 leading-relaxed">Architected connected platforms across customer, admin, and internal apps to enable coherent product growth and lower integration costs.</p>
          </div>

          <div className="p-7 border border-slate-300/80 rounded-md bg-white text-center text-slate-700 flex flex-col h-full shadow-sm hover:shadow-xl hover:-translate-y-[2px] transition-all duration-200">
            <div className="flex items-center justify-center gap-3">
              <span className="text-[#F4C430] mr-3">✔</span>
              <h4 className="text-xl font-bold text-slate-900">Workflows & Real-time Reporting</h4>
            </div>
            <p className="text-sm text-slate-700 mt-3 leading-relaxed">Built workflow and reporting systems handling complex business logic and real-time data to improve operational decision-making.</p>
          </div>

          <div className="p-7 border border-slate-300/80 rounded-md bg-white text-center text-slate-700 flex flex-col h-full shadow-sm hover:shadow-xl hover:-translate-y-[2px] transition-all duration-200">
            <div className="flex items-center justify-center gap-3">
              <span className="text-[#F4C430] mr-3">✔</span>
              <h4 className="text-xl font-bold text-slate-900">Authentication & Identity</h4>
            </div>
            <p className="text-sm text-slate-700 mt-3 leading-relaxed">Implemented secure identity solutions (B2C, OAuth, JWT, Entra) that reduce account risk and simplify user lifecycle management.</p>
          </div>
        </div>

        {/* Strong single proof line (replace weak repetitive text) */}
        <div className="h-px bg-slate-200/60 my-12" />
        <p className="mt-10 text-sm text-slate-500 text-left">Built and stabilized systems across startups and enterprise environments.</p>
      </div>

      {/* Logo strip (pure CSS marquee) */}
      <LogoStripFinalBoss />
    </section>
    </>
  );
}
