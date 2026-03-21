'use client';

export function ProofFoldCloser() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16 md:py-24 bg-slate-50/50">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Systems I’ve Designed and Stabilized</h2>
        <p className="mt-2 text-sm text-slate-600 max-w-3xl">Real production systems handling scale, complexity, and critical workflows</p>

        {/* 2x2 capability grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 border rounded-md text-center text-slate-700 flex flex-col h-full">
            <h4 className="text-lg font-semibold text-slate-900">Multi-Tenant SaaS Platform</h4>
            <p className="text-sm text-slate-600 mt-3">Designed and maintained scalable RBAC systems across multi-tenant environments</p>
          </div>

          <div className="p-6 border rounded-md text-center text-slate-700 flex flex-col h-full">
            <h4 className="text-lg font-semibold text-slate-900">Multi-App Platform Architecture</h4>
            <p className="text-sm text-slate-600 mt-3">Architected connected systems across client, admin, and internal applications</p>
          </div>

          <div className="p-6 border rounded-md text-center text-slate-700 flex flex-col h-full">
            <h4 className="text-lg font-semibold text-slate-900">Workflow & Reporting Systems</h4>
            <p className="text-sm text-slate-600 mt-3">Built and evolved workflow systems with real-time reporting for business operations</p>
          </div>

          <div className="p-6 border rounded-md text-center text-slate-700 flex flex-col h-full">
            <h4 className="text-lg font-semibold text-slate-900">Authentication & Identity Systems</h4>
            <p className="text-sm text-slate-600 mt-3">Implemented and managed secure identity systems (B2C, Entra, OAuth, JWT)</p>
          </div>
        </div>

        <p className="mt-6 text-sm text-slate-600 text-center">Designed for real-world scale, performance, and reliability</p>

        <p className="mt-8 mb-6 text-sm text-slate-500 text-center">Focused on scalable systems, clean architecture, and long-term maintainability</p>
      </div>

      {/* Dark proof strip */}
      <div className="w-full bg-slate-900 text-white mt-12">
        <div className="mx-auto max-w-7xl px-6 py-8">
          {/* Row 1 */}
          <p className="text-sm text-white/70 text-center mb-4">Worked across startups and enterprise teams, contributing to production systems at scale</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center items-center">
            <div>
              <div className="font-semibold">TerraBarn</div>
              <div className="text-sm text-white/70 mt-1">2025–Present</div>
            </div>
            <div>
              <div className="font-semibold">Willis Towers Watson</div>
              <div className="text-sm text-white/70 mt-1">2024–2025</div>
            </div>
            <div>
              <div className="font-semibold">AOTech</div>
              <div className="text-sm text-white/70 mt-1">2020–2024</div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-center items-center border-t border-slate-800 pt-6">
            <div>
              <div className="font-semibold">Kinetic Staffing</div>
              <div className="text-sm text-white/70 mt-1">2016–2020</div>
            </div>
            <div>
              <div className="font-semibold">Coffey International</div>
              <div className="text-sm text-white/70 mt-1">2013–2016</div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-6 text-center items-center">
            <div>
              <div className="font-semibold text-[#F4C430]">Pointwest</div>
              <div className="text-sm text-white/70 mt-1">2010–2011</div>
            </div>
            <div>
              <div className="font-semibold">Optimum Innovatus</div>
              <div className="text-sm text-white/70 mt-1">2011–2012</div>
            </div>
            <div>
              <div className="font-semibold">DBSoft</div>
              <div className="text-sm text-white/70 mt-1">2011</div>
            </div>
            <div>
              <div className="font-semibold">Trinko Inc</div>
              <div className="text-sm text-white/70 mt-1">2012–2013</div>
            </div>
          </div>

          {/* Icon placeholders row */}
          <div className="mt-6 pt-6">
            <div className="flex flex-wrap justify-center items-center gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-white/5 opacity-30 flex items-center justify-center" aria-hidden="true" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
