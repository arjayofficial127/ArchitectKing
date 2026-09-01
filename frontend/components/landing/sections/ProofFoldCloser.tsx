import Link from 'next/link';

import { BookCoverSVG } from '../BookCoverSVG';
import { LogoStripFinalBoss } from '../../LogoStripFinalBoss';

const pressureSignals = [
  ['↗', 'Every feature touches unrelated parts'],
  ['⌾', 'Permissions are difficult to trust'],
  ['∞', 'The same rule lives in five places'],
  ['◷', 'Delivery slows as the product grows'],
  ['▤', 'Nobody is sure who owns the data'],
  ['△', 'The same incidents keep returning'],
] as const;

const responsibilities = [
  ['Platform boundaries', 'Keep product growth from becoming system sprawl.'],
  ['Identity and access', 'Make permissions explicit, testable, and safer to change.'],
  ['Complex workflows', 'Turn business rules into behavior the team can reason about.'],
  ['Integration and delivery', 'Connect the moving parts and stay through production.'],
] as const;

const workingMethod = [
  {
    number: '01',
    title: 'Make reality visible',
    description: 'I learn the product goals, code, data, constraints, and delivery pressure—then separate the real risks from the noise.',
  },
  {
    number: '02',
    title: 'Make the calls together',
    description: 'You get plain-language tradeoffs and a smallest-safe path forward. You keep control of the business decision.',
  },
  {
    number: '03',
    title: 'Stay through the build',
    description: 'I work alongside the team to implement, integrate, test, and ship—not disappear after presenting the architecture.',
  },
] as const;

const engagements = [
  {
    eyebrow: 'Focused decision',
    title: 'Architecture Review',
    description: 'When you need an experienced second set of eyes, a risk map, and a decision you can act on.',
    meta: 'From $350',
    href: '/architecture-review',
    action: 'Review the system',
  },
  {
    eyebrow: 'Focused intervention',
    title: 'System Stabilization',
    description: 'When delivery has slowed, failures repeat, or every change feels more dangerous than it should.',
    meta: 'Scoped to the problem',
    href: '/contact-me',
    action: 'Discuss the pressure',
  },
  {
    eyebrow: 'Ongoing partnership',
    title: 'Embedded Technical Partner',
    description: 'When you want senior judgment beside you and hands-on technical leadership inside the work.',
    meta: 'Directly with you and the team',
    href: '/schedule',
    action: 'Start a conversation',
  },
] as const;

export function ProofFoldCloser() {
  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9A7400]">Where I become useful</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">When technology starts stealing leadership attention</h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">You usually feel the drag before a dashboard can measure it. These are the moments when experienced technical judgment pays for itself.</p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
          {pressureSignals.map(([icon, label]) => (
            <div key={label} className="flex items-center gap-4 bg-white p-5">
              <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-lg font-bold text-[#B68900]">{icon}</span>
              <p className="text-sm font-semibold leading-snug text-slate-800">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-slate-950 p-6 text-white md:p-8">
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
            {responsibilities.map(([title, description]) => (
              <div key={title}>
                <h3 className="text-sm font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9A7400]">What working together feels like</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Clear enough for the CEO. Concrete enough for the team.</h2>
          </div>
          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {workingMethod.map((step) => (
              <article key={step.number} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold tracking-[0.16em] text-[#B68900]">{step.number}</span>
                <h3 className="mt-4 text-xl font-bold text-slate-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9A7400]">Ways to work together</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Bring me in at the level the situation needs.</h2>
          </div>
          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {engagements.map((engagement, index) => (
              <article key={engagement.title} className={`flex h-full flex-col rounded-2xl border bg-white p-6 ${index === 0 ? 'border-[#D7A900] shadow-[0_14px_35px_-24px_rgba(183,137,0,0.8)]' : 'border-slate-200 shadow-sm'}`}>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">{engagement.eyebrow}</p>
                  {index === 0 && <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold text-amber-900">Good first step</span>}
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-950">{engagement.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{engagement.description}</p>
                <p className="mt-5 text-xs font-semibold text-slate-500">{engagement.meta}</p>
                <Link href={engagement.href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-[#8A6800]">
                  {engagement.action} <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-24 grid items-center gap-8 overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm md:grid-cols-[180px_1fr] md:p-10">
          <div className="mx-auto aspect-[2/3] w-36 overflow-hidden rounded-md border border-slate-200 shadow-xl md:w-40">
            <BookCoverSVG />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9A7400]">Working Fundamentals · 13-part guide</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">The thinking I bring into the room is written down.</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">A practical guide to boundaries, state, data, failure, testing, performance, and the judgment required to build software that remains understandable under pressure.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/working-fundamentals-introduction" className="rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800">Start reading</Link>
              <Link href="/working-fundamentals" className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800 hover:border-slate-500">Explore all chapters</Link>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-slate-200 pt-12">
          <p className="text-center text-sm font-semibold text-slate-500">Experience earned across startups, consulting teams, fintech, staffing, and enterprise delivery.</p>
          <LogoStripFinalBoss />
        </div>
      </div>
    </section>
  );
}
