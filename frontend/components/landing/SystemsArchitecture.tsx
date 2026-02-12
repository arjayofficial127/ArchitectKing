export function SystemsArchitecture() {
  return (
    <section id="systems" className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Systems Architecture Thinking
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          How I approach complex systems and architectural decisions.
        </p>

        <div className="mt-12 space-y-8">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Boundaries & Contracts</h3>
            <p className="mt-3 text-slate-700">
              Clear boundaries between components prevent coupling. Explicit contracts enable 
              independent evolution. I design APIs and data models that communicate intent, 
              not just structure.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Scalability by Design</h3>
            <p className="mt-3 text-slate-700">
              Systems that work at 100 users should work at 100,000. I design for scale from 
              day one—not premature optimization, but patterns that grow gracefully. Database 
              indexes, caching strategies, and data partitioning are architectural decisions, 
              not afterthoughts.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Observability & Reliability</h3>
            <p className="mt-3 text-slate-700">
              Production systems need visibility. I build with logging, monitoring, and error 
              handling from the start. When something breaks, we know why—and we can fix it 
              before users notice.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Domain-Driven Design</h3>
            <p className="mt-3 text-slate-700">
              Code structure reflects business logic. I model domains, not just data. This 
              means systems that make sense to both engineers and stakeholders—systems that 
              evolve with business needs.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-xl border-l-4 border-teal-600 bg-teal-50/50 p-6">
          <h3 className="text-lg font-semibold text-teal-900">The Architect Mindset</h3>
          <p className="mt-3 text-teal-800">
            Architecture isn't about complexity—it's about clarity. The best systems are 
            simple to understand, easy to extend, and reliable in production. I build systems 
            that other engineers can reason about, modify, and scale.
          </p>
        </div>
      </div>
    </section>
  );
}
