import Image from 'next/image';
import Link from 'next/link';
import { LogoStripFinalBoss } from '../../LogoStripFinalBoss';

export function HeroFoldCloser() {
  return (
    <section className="relative mx-auto w-full max-w-7xl overflow-hidden px-6 py-16 md:py-24 lg:py-28">
      <div className="hero-layout grid items-center gap-14 min-h-0 min-w-0 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
        <div className="hero-copy mx-auto w-full max-w-3xl min-w-0 text-center lg:mx-0 lg:max-w-full lg:text-left">
          <p className="hero-eyebrow text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 sm:text-sm">
            Software architect &amp; product builder
          </p>
          <h1 className="hero-title mt-5 text-4xl font-bold leading-[1.04] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-7xl">
            I help teams make difficult software work<span className="text-[#F4C430]">.</span>
          </h1>
          <p className="hero-description mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg lg:mx-0">I find what's blocking delivery, help your team make the right architecture decisions, and stay hands-on until the software is reliable in production.</p>
          <div className="mt-8 flex w-full flex-col justify-center gap-3 text-left lg:justify-start lg:text-left sm:flex-row">
            <Link href="/contact-me" className="hero-cta inline-flex w-full items-center justify-center rounded-md bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800 sm:w-auto">
              Discuss your project <span aria-hidden="true" className="ml-2">→</span>
            </Link>
            <Link href="#selected-systems" className="hero-cta inline-flex w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-500 sm:w-auto">
              View selected work <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="hero-proof mt-8 w-full max-w-full text-left">
            <p className="mb-3 text-sm font-semibold tracking-[0.08em] text-slate-500">Selected teams</p>
            <LogoStripFinalBoss className="mt-4" />
          </div>
        </div>

        <div className="hero-media relative mx-auto mt-4 w-[min(369px,100%)] min-w-0 pb-16 lg:mt-0 lg:w-[369px] lg:pb-8">
          <div aria-hidden="true" className="absolute -inset-8 rounded-[2.5rem] bg-[radial-gradient(circle_at_center,rgba(244,196,48,0.13),transparent_68%)]" />
          <div className="hero-media-frame relative mx-auto aspect-[4/4.6] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-2xl shadow-slate-900/15">
            <Image src="/architectking/pogi.png" alt="Arvin Jayson Castro, Software Architect and Product Builder" fill priority sizes="(max-width: 1024px) 384px, 420px" className="object-cover" />
          </div>
          <div className="absolute inset-x-3 bottom-0 left-3 right-3 flex max-w-[calc(100%-1.5rem)] items-center rounded-xl border border-slate-200 bg-white/95 px-4 py-3 text-slate-950 shadow-[0_16px_32px_-20px_rgba(15,23,42,0.55)] backdrop-blur sm:left-4 sm:right-auto sm:max-w-none">
            <p className="text-4xl font-bold leading-none tracking-[-0.05em] text-[#C39400]">16</p>
            <div className="ml-3 border-l border-slate-200 pl-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Years in software</p>
              <p className="mt-0.5 text-sm font-semibold text-slate-800">Still hands-on.</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-layout {
          box-sizing: border-box;
          width: 100%;
          max-width: 100%;
          min-width: 0;
        }

        .hero-copy,
        .hero-proof,
        .hero-media {
          min-width: 0;
          max-width: 100%;
        }

        .hero-cta {
          min-height: 52px;
        }

        @media (max-width: 1023px) {
          .hero-layout {
            grid-template-columns: minmax(0, 1fr);
          }
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: clamp(2rem, 8.5vw, 2.75rem);
            line-height: 1.08;
            white-space: normal;
            text-wrap: balance;
          }

          .hero-description {
            font-size: 1rem;
            line-height: 1.6;
          }

          .hero-eyebrow {
            font-size: 11px;
            letter-spacing: 0.07em;
            white-space: normal;
          }

          .hero-copy {
            max-width: 100%;
          }

          .hero-cta {
            gap: 12px;
          }

          .hero-media {
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
    </section>
  );
}
