import Link from 'next/link';

import { DittoBlob } from '@/components/ui/DittoBlob';
import { RESUME_ROUTE } from '@/lib/experience';

/**
 * Employment-focused close. No testimonial: the one in the design reference was
 * generated, and no authentic approved quote has been supplied.
 *
 * The AOTxnologies line is deliberately plain text - its destination has not
 * been confirmed, and a broken or guessed link is worse than none.
 */
export function HiringCloseSection() {
  return (
    <>
      <section
        id="discuss-a-role"
        className="scroll-mt-28 bg-slate-950 px-6 py-20 text-white md:py-28"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#F4C430]">
              Let&apos;s work together
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Looking for an architect who stays hands-on?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300">
              I&apos;m interested in architecture, technical leadership, and senior engineering
              opportunities. Tell me about your team, the role, and the engineering problems
              you&apos;re working through - I&apos;ll tell you honestly where I could help.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact-me"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md bg-[#F4C430] px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-[#e0b528] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4C430]"
              >
                Discuss a role <span aria-hidden="true">→</span>
              </Link>
              <Link
                href={RESUME_ROUTE}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
              >
                View résumé
              </Link>
            </div>

            <p className="mt-6 text-sm text-slate-400">You&apos;ll speak and work directly with me.</p>
          </div>

          {/* Kept from the previous footer — the squishy blob people poke at. */}
          <div className="flex shrink-0 justify-center lg:justify-end">
            <DittoBlob />
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-slate-950 px-6 py-10 text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-bold text-white">Arvin Jayson Castro</p>
            <p className="mt-1 text-sm">Software Architect &amp; Technical Lead</p>
          </div>

          <nav aria-label="Contact" className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <a
              href="mailto:arvinjaysoncastro@gmail.com"
              className="inline-flex min-h-[44px] items-center transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
            >
              arvinjaysoncastro@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/arvinjaysoncastro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
            >
              LinkedIn
            </a>
            <a
              href="tel:+639627675114"
              className="inline-flex min-h-[44px] items-center transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
            >
              +63 962 767 5114
            </a>
          </nav>

          <p className="text-sm text-slate-500">
            Need a delivery team instead? Explore AOTxnologies.
          </p>
        </div>
      </footer>
    </>
  );
}
