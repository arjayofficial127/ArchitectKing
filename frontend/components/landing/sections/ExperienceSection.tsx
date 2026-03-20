export function ExperienceSection() {
  return (
    <section className="relative bg-slate-50/60 border-y border-slate-200/70">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
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
  );
}
