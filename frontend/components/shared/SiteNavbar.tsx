'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const navigationItems = [
  { href: '/#selected-systems', label: 'Systems' },
  { href: '/#approach', label: 'Approach' },
  { href: '/architecture-review', label: 'Architecture Review' },
  { href: '/working-fundamentals', label: 'Working Fundamentals' },
] as const;

const MENU_ID = 'site-primary-menu';

export function SiteNavbar() {
  const [open, setOpen] = useState(false);

  // Escape closes the menu; the disclosure is the only thing it can affect.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-3 gap-y-0 px-4 py-3 sm:px-5 lg:flex-nowrap lg:gap-x-4 lg:px-6 lg:py-4"
      >
        {/* flex-1 (basis 0) so the brand shrinks to fit — with flex-wrap, an auto-basis
            item pushes siblings onto a second row instead of giving up width. */}
        <Link href="/" className="order-1 flex min-w-0 flex-1 flex-col lg:order-1">
          <span className="truncate text-[15px] font-bold tracking-tight text-slate-950 lg:text-base">
            Arvin Jayson Castro
          </span>
          <span className="truncate text-[11px] font-medium text-slate-500 lg:mt-0.5 lg:text-xs">
            Software Architect &amp; Product Builder
          </span>
        </Link>

        {/* Primary action stays reachable on every screen — it never goes behind the menu. */}
        <Link
          href="/contact-me"
          className="order-2 hidden sm:inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md bg-slate-950 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950 lg:order-4 lg:px-4 lg:text-sm"
        >
          Discuss your project <span aria-hidden="true" className="ml-1.5 lg:ml-2">→</span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={MENU_ID}
          className="order-3 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950 lg:hidden"
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />}
          </svg>
        </button>

        {/* One list for both layouts — a stacked panel under lg, an inline row above it. */}
        <div
          id={MENU_ID}
          className={`${open ? 'flex' : 'hidden'} order-4 w-full flex-col gap-0.5 border-t border-slate-200/70 pb-1 pt-2 lg:order-3 lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-1 lg:border-0 lg:pb-0 lg:pt-0`}
        >
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950 lg:whitespace-nowrap lg:py-2 lg:hover:bg-transparent"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
