'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { QuickContactPanel } from '@/components/ui/QuickContactPanel';

export function SiteNavbar() {
  const pathname = usePathname();
  const [showContact, setShowContact] = useState(false);
  const rightRef = useRef<HTMLDivElement | null>(null);
  
  const isWorkingFundamentals = pathname?.startsWith('/working-fundamentals') ?? false;
  const isCaseStudies = pathname?.startsWith('/case-studies') ?? false;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const el = rightRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) {
        setShowContact(false);
      }
    };

    if (showContact) window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [showContact]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowContact(false);
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <header className="sticky top-0 border-b border-slate-200/60 bg-white shadow-sm z-50">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-base font-semibold tracking-tight text-slate-900 hover:text-slate-700 transition-colors">
            Arvin Jayson Castro
          </Link>
          <span className="text-sm text-slate-400">|</span>
          <span className="text-sm text-slate-500">Solutions Architect — Scalable Systems</span>
        </div>
        <div className="flex items-center gap-4 relative" ref={rightRef}>
          <button
            onClick={() => setShowContact(prev => !prev)}
            aria-expanded={showContact}
            aria-haspopup="dialog"
            className={`text-sm font-medium transition-colors text-slate-600 hover:text-[#F4C430]`}
          >
            Contact
          </button>

          <Link href="/contact-me">
            <button
              type="button"
              aria-label="Discuss Your System"
              className="inline-flex items-center justify-center rounded-md border border-[#0F172A] bg-transparent px-4 py-1.5 text-sm font-medium text-[#0F172A] transition-all hover:bg-[#0F172A] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-offset-1 hover:scale-[1.02]"
            >
              Discuss Your System
            </button>
          </Link>

          <QuickContactPanel open={showContact} />
        </div>
      </div>
    </header>
  );
}
