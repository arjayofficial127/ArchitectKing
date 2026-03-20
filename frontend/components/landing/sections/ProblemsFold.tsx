'use client';

export function ProblemsFold() {
  return (
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
  );
}
