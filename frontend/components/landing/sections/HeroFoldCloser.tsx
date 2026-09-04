import Image from 'next/image';
import Link from 'next/link';

export function HeroFoldCloser() {
  return (
    <section className="relative mx-auto w-full max-w-7xl overflow-hidden px-6 py-16 md:py-24 lg:py-28">
      <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 sm:text-sm">
            Software architect &amp; product builder
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.04] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-7xl">
            I help teams make difficult software work
            <span className="text-[#F4C430]">.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg lg:mx-0">
            I listen, find what is getting in the way, and work with the team until there is something reliable in production. Sometimes that means architecture. Sometimes it means getting into the code. Usually both.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link href="/contact-me" className="inline-flex items-center justify-center rounded-md bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800">
              Tell Me About It <span aria-hidden="true" className="ml-2">→</span>
            </Link>
            <Link href="#selected-systems" className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-500">
              See Some of My Work <span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className="mt-6 text-sm font-medium leading-relaxed text-slate-500">
            Practical advice <span className="px-2 text-[#F4C430]">•</span> Hands-on help
            <span className="px-2 text-[#F4C430]">•</span> No disappearing after the diagram
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md pb-8">
          <div aria-hidden="true" className="absolute -inset-8 rounded-[2.5rem] bg-[radial-gradient(circle_at_center,rgba(244,196,48,0.13),transparent_68%)]" />
          <div className="relative mx-auto aspect-[4/4.6] max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-2xl shadow-slate-900/15">
            <Image src="/architectking/profile_recent.png" alt="Arvin Jayson Castro, Software Architect and Product Builder" fill priority sizes="(max-width: 1024px) 384px, 420px" className="object-cover" />
          </div>
          <div className="absolute bottom-0 left-3 flex items-center rounded-xl border border-slate-200 bg-white/95 px-4 py-3 text-slate-950 shadow-[0_16px_32px_-20px_rgba(15,23,42,0.55)] backdrop-blur sm:left-4">
            <p className="text-4xl font-bold leading-none tracking-[-0.05em] text-[#C39400]">16</p>
            <div className="ml-3 border-l border-slate-200 pl-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Years in software</p>
              <p className="mt-0.5 text-sm font-semibold text-slate-800">Still hands-on.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
