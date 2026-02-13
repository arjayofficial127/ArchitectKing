export function AuthorityStrip() {
  return (
    <section className="relative border-y border-slate-200 bg-slate-50/30">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-700">15+</div>
            <div className="mt-1 text-sm font-medium text-slate-600">Years Experience</div>
          </div>
          <div className="hidden h-12 w-px bg-slate-300 md:block" />
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-700">Multi-Tenant</div>
            <div className="mt-1 text-sm font-medium text-slate-600">SaaS Systems</div>
          </div>
          <div className="hidden h-12 w-px bg-slate-300 md:block" />
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-700">Production</div>
            <div className="mt-1 text-sm font-medium text-slate-600">Deployments</div>
          </div>
          <div className="hidden h-12 w-px bg-slate-300 md:block" />
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-700">Fullstack</div>
            <div className="mt-1 text-sm font-medium text-slate-600">Architect</div>
          </div>
        </div>
      </div>
    </section>
  );
}
