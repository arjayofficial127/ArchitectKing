import Image from 'next/image';
import Link from 'next/link';

/**
 * Writing. Presented as evidence of how Arvin reasons about building software —
 * no readership figures, reviews or endorsements, none of which are verified.
 */
export function WritingSection() {
  return (
    <section id="writing" className="scroll-mt-28 px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-16">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9A7400]">Writing</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            How I think about software.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
            <span className="font-semibold text-slate-800">Working Fundamentals</span> is my guide to
            building software that stays understandable as the users, rules, data, and stakes keep
            changing.
          </p>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            Thirteen short chapters on state, data, boundaries, failure, testing, and performance —
            the decisions that decide whether a system is still workable a year later.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/working-fundamentals"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
            >
              Read Working Fundamentals <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/working-fundamentals-introduction"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
            >
              Start with the preface
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:mx-0">
          <div
            aria-hidden="true"
            className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(244,196,48,0.14),transparent_70%)]"
          />
          <div className="relative aspect-square w-full">
            <Image
              src="/architectking/working-fundamentals-paperback.png"
              alt="Working Fundamentals, a printed guide by Arvin Jayson Castro"
              fill
              sizes="(max-width: 1024px) 90vw, 420px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
