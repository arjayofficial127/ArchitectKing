import Image from 'next/image';
import Link from 'next/link';

export function HeroFoldCloser() {
  return (
    <section className="relative mx-auto w-full max-w-7xl overflow-hidden px-6 py-16 md:py-24 lg:py-28">
      <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 sm:text-sm">
            Hands-on technical partner for founders and CEOs
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.04] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-7xl">
            You lead the company. I&apos;ll make sure the technology can carry the vision
            <span className="text-[#F4C430]">.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg lg:mx-0">
            I work directly with founders and CEOs as the technical partner in the room—turning business intent into clear decisions, dependable systems, and software we can confidently put in front of customers. I&apos;ll tell you what is risky, what matters now, and help build it.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link href="/schedule" className="inline-flex items-center justify-center rounded-md bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800">
              Discuss What You&apos;re Building
            </Link>
            <Link href="#selected-systems" className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-500">
              Inspect What I&apos;ve Built <span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className="mt-6 text-sm font-medium leading-relaxed text-slate-500">
            Straight answers <span className="px-2 text-[#F4C430]">•</span> Calm ownership
            <span className="px-2 text-[#F4C430]">•</span> Architecture and execution in one partner
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md pb-8">
          <div aria-hidden="true" className="absolute -inset-8 rounded-[2.5rem] bg-[radial-gradient(circle_at_center,rgba(244,196,48,0.13),transparent_68%)]" />
          <div className="relative mx-auto aspect-[4/4.6] max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-2xl shadow-slate-900/15">
            <Image src="/architectking/profile_recent.png" alt="Arvin Jayson Castro, Software Architect and Product Builder" fill priority sizes="(max-width: 1024px) 384px, 420px" className="object-cover" />
          </div>
          <div className="absolute bottom-0 left-1/2 flex w-max -translate-x-1/2 items-center gap-4 rounded-xl border border-slate-800 bg-slate-950 px-5 py-4 text-white shadow-2xl shadow-slate-950/25 sm:left-4 sm:translate-x-0">
            <p className="text-3xl font-bold leading-none tracking-tight text-[#F4C430]">16 years</p>
            <p className="max-w-32 text-xs font-semibold leading-snug text-slate-200">building systems that have to work</p>
          </div>
        </div>
      </div>
    </section>
  );
}
