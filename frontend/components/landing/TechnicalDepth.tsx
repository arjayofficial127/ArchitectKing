export function TechnicalDepth() {
  const technologies = [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
    { category: 'Backend', items: ['Node.js', '.NET', 'TypeScript', 'REST APIs'] },
    { category: 'Architecture', items: ['Multi-tenant Systems', 'Microservices', 'Event-Driven', 'Domain-Driven Design'] },
    { category: 'Infrastructure', items: ['Vercel', 'Render', 'Docker', 'CI/CD'] },
    { category: 'Data', items: ['PostgreSQL', 'Drizzle ORM', 'Transaction Management', 'Data Modeling'] },
    { category: 'Patterns', items: ['Registry Pattern', 'Mapper Pattern', 'Orchestration', 'Repository Pattern'] },
  ];

  return (
    <section className="relative bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Technical Depth
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Production experience across the full stack, with deep focus on system design and architecture.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {technologies.map((tech) => (
              <div
                key={tech.category}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">{tech.category}</h3>
                <ul className="mt-3 space-y-2">
                  {tech.items.map((item) => (
                    <li key={item} className="text-sm text-slate-600">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">What This Means</h3>
            <p className="mt-4 text-slate-700">
              I don&apos;t just write code—I design systems. Every technology choice is made with 
              scalability, maintainability, and business outcomes in mind. I understand how 
              frontend state management affects backend API design, how database schemas impact 
              application architecture, and how infrastructure decisions shape development velocity.
            </p>
            <p className="mt-4 text-slate-700">
              This depth means I can see around corners. I anticipate problems before they become 
              blockers. I build foundations that support growth, not just features that work today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
