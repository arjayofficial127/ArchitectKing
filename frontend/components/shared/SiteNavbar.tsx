'use client';

import Link from 'next/link';

const navigationItems = [
  { href: '/#selected-systems', label: 'Systems' },
  { href: '/#approach', label: 'Approach' },
  { href: '/architecture-review', label: 'Architecture Review' },
  { href: '/working-fundamentals', label: 'Working Fundamentals' },
] as const;

export function SiteNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl">
      <nav aria-label="Primary navigation" className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="flex shrink-0 flex-col text-center lg:text-left">
          <span className="text-base font-bold tracking-tight text-slate-950">Arvin Jayson Castro</span>
          <span className="mt-0.5 text-xs font-medium text-slate-500">Software Architect &amp; Product Builder</span>
        </Link>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:justify-end lg:overflow-visible lg:pb-0">
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-950">
              {item.label}
            </Link>
          ))}
          <Link href="/contact-me" className="ml-1 inline-flex shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-950 hover:bg-slate-50">
            Discuss Your System
          </Link>
          <Link href="/schedule" className="ml-1 inline-flex shrink-0 items-center justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
            Book a Call
          </Link>
        </div>
      </nav>
    </header>
  );
}
