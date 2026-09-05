import Link from 'next/link';

import { earlierRoles, education, roles, RESUME_ROUTE } from '@/lib/experience';

/**
 * Selected professional experience. Every value comes from lib/experience.ts,
 * which is transcribed from the résumé served at /resume - nothing here is
 * inferred or filled in to balance the layout.
 */
export function CareerTimelineSection() {
  return (
    <section id="experience" className="scroll-mt-28 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9A7400]">
              Selected experience
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              A track record of building and leading.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Some of the teams and systems I&apos;ve worked with.
            </p>
          </div>

          <Link
            href={RESUME_ROUTE}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
          >
            View full experience <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ol className="mt-12 border-t border-slate-200">
          {roles.map((role) => (
            <li
              key={`${role.organisation}-${role.period}`}
              className="grid gap-x-8 gap-y-3 border-b border-slate-200 py-7 md:grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)] lg:grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)_minmax(0,14rem)]"
            >
              <p className="text-sm font-semibold text-slate-500 md:pt-0.5">{role.period}</p>

              <div className="min-w-0">
                <h3 className="text-lg font-bold tracking-tight text-slate-950">{role.title}</h3>
                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {role.organisation}
                  {role.client ? (
                    <span className="font-medium text-slate-500"> · client: {role.client}</span>
                  ) : null}
                  {role.arrangement ? (
                    <span className="font-medium text-slate-500"> · {role.arrangement}</span>
                  ) : null}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{role.summary}</p>
                <ul className="mt-3 space-y-2">
                  {role.contributions.map((contribution) => (
                    <li
                      key={contribution}
                      className="relative pl-5 text-sm leading-relaxed text-slate-600"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-full bg-[#D8A800]"
                      />
                      {contribution}
                    </li>
                  ))}
                </ul>
              </div>

              <ul
                className="flex flex-wrap content-start gap-2 lg:justify-end"
                aria-label={`${role.title} focus areas`}
              >
                {role.tags.map((tag) => (
                  <li
                    key={tag}
                    className="h-fit rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-col gap-3 text-sm text-slate-600 lg:flex-row lg:items-start lg:justify-between">
          <p className="min-w-0">
            <span className="font-semibold text-slate-800">Earlier: </span>
            {earlierRoles.map((role, index) => (
              <span key={role.organisation}>
                {index > 0 ? ' · ' : ''}
                {role.organisation} ({role.period})
              </span>
            ))}
          </p>
          <p className="shrink-0">
            {education.qualification}, {education.institution} ({education.period})
          </p>
        </div>
      </div>
    </section>
  );
}
