export function RedFlagsSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4 text-center">
          Common SaaS Problems & How I Fix Them
        </h2>
        <p className="text-sm text-slate-500 mb-12 text-center">
          If any of these sound familiar, it might be time for an architecture review.
        </p>

        <div className="space-y-3 mb-10">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-700 flex items-start">
              <span className="text-[#F4C430] mr-3 font-semibold">•</span>
              <span>Dashboard becomes slower as users grow</span>
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-700 flex items-start">
              <span className="text-[#F4C430] mr-3 font-semibold">•</span>
              <span>Backend changes are risky and hard to deploy</span>
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-700 flex items-start">
              <span className="text-[#F4C430] mr-3 font-semibold">•</span>
              <span>APIs were designed quickly and now cause bottlenecks</span>
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-700 flex items-start">
              <span className="text-[#F4C430] mr-3 font-semibold">•</span>
              <span>Database queries are becoming slow or complex</span>
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-700 flex items-start">
              <span className="text-[#F4C430] mr-3 font-semibold">•</span>
              <span>Engineers are afraid to touch certain parts of the system</span>
            </p>
          </div>
        </div>

        <div className="text-center">
          {/* Book Architecture Review button removed as requested */}
        </div>
      </div>
    </section>
  );
}
