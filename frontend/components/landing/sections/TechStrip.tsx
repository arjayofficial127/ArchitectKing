const credibilityAreas = [
  { icon: '◇', title: 'Understand it first', description: 'Learn how the product, team, and existing system actually work.' },
  { icon: '</>', title: 'Keep the answer practical', description: 'Choose the smallest sound change that moves the work forward.' },
  { icon: '▣', title: 'Help make it happen', description: 'Work through the code, testing, release, and production details.' },
] as const;

export function TechStrip() {
  return (
    <section className="relative w-full bg-slate-950 text-white" aria-label="Core credibility areas">
      <div className="mx-auto grid max-w-7xl px-6 py-6 md:grid-cols-3 md:py-7">
        {credibilityAreas.map((area, index) => (
          <article key={area.title} className={`flex gap-4 py-4 md:px-7 md:py-1 ${index > 0 ? 'border-t border-slate-700/80 md:border-l md:border-t-0' : ''}`}>
            <span aria-hidden="true" className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#F4C430]/60 font-mono text-sm font-bold text-[#F4C430]">{area.icon}</span>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-white">{area.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">{area.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
