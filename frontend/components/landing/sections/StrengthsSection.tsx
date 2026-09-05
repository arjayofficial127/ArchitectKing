import Link from 'next/link';

interface Strength {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  icon: 'layers' | 'code' | 'people';
}

/**
 * Three complementary strengths of one engineer - deliberately equal weight,
 * not a menu of packages to choose between. Each link points at a destination
 * that genuinely exists in this app.
 */
const strengths: readonly Strength[] = [
  {
    title: 'Architecture & judgment',
    description:
      'Clarifying requirements, defining boundaries and interfaces, and making trade-offs understandable.',
    href: '/case-studies',
    linkLabel: 'Read a case study',
    icon: 'layers',
  },
  {
    title: 'Hands-on engineering',
    description:
      'Working across frontend, backend, integrations, debugging, testing, and production delivery.',
    href: '#selected-systems',
    linkLabel: "See what I've built",
    icon: 'code',
  },
  {
    title: 'Team & delivery',
    description:
      'Working with engineers and product stakeholders to clarify scope, resolve blockers, and maintain shared understanding.',
    href: '#experience',
    linkLabel: 'Explore my experience',
    icon: 'people',
  },
] as const;

function StrengthIcon({ name }: { name: Strength['icon'] }) {
  const paths = {
    layers: (
      <>
        <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3Z" />
        <path d="m3 12.5 9 4.5 9-4.5M3 17l9 4.5L21 17" />
      </>
    ),
    code: <path d="m8.5 8-4.5 4 4.5 4M15.5 8l4.5 4-4.5 4M13.5 5l-3 14" />,
    people: (
      <>
        <circle cx="9" cy="8" r="3.2" />
        <path d="M2.8 20a6.2 6.2 0 0 1 12.4 0M16.5 5.4a3.2 3.2 0 0 1 0 5.2M18.5 20a6 6 0 0 0-3-5.2" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

export function StrengthsSection() {
  return (
    <section
      id="how-i-work"
      className="scroll-mt-28 border-y border-slate-200 bg-slate-50/70 px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9A7400]">
            What I bring to your team
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Architecture. Engineering. People.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            Three areas I focus on to help teams ship and sustain good software.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {strengths.map((strength) => (
            <article
              key={strength.title}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#E4C766] bg-[#FDF6E3] text-[#9A7400]">
                <StrengthIcon name={strength.icon} />
              </span>
              <h3 className="mt-5 text-lg font-bold tracking-tight text-slate-950">
                {strength.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                {strength.description}
              </p>
              <Link
                href={strength.href}
                className="mt-4 inline-flex min-h-[44px] w-fit items-center gap-2 text-sm font-semibold text-slate-800 transition hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
              >
                {strength.linkLabel} <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
