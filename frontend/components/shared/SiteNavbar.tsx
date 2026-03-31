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
    <header
      className="z-50"
      style={{
        position: 'sticky',
        // top: 12, 
        zIndex: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 18px',
        borderRadius: 12,
        background: 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.4)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.06)',
        transition: 'all 200ms ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.background = 'rgba(255,255,255,0.65)';
        el.style.borderColor = 'rgba(255,255,255,0.6)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.background = 'rgba(255,255,255,0.55)';
        el.style.borderColor = 'rgba(255,255,255,0.4)';
      }}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col md:flex-row items-center md:justify-between px-6 py-3">

        {/* Row 1 + Row 2 (mobile stacked, desktop inline) */}
        <div className="flex flex-col items-center md:items-start md:flex-row md:items-center md:gap-2">
          <div className="text-center md:text-left">
            <Link href="/" className="text-base font-semibold tracking-tight text-slate-900 hover:text-slate-700 transition-colors">
              Arvin Jayson Castro
            </Link>
          </div>

          {/* Desktop inline separator + title */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm text-slate-400">|</span>
            <span className="text-sm text-slate-500">Architect of Scalable Systems</span>
          </div>

          {/* Mobile stacked title */}
          <div className="md:hidden mt-1">
            <span className="text-sm text-slate-500">Architect of Scalable Systems</span>
          </div>
        </div>

        {/* Row 3 - actions (centered on mobile, right on desktop) */}
        <div className="flex items-center gap-3 relative w-full md:w-auto justify-center md:justify-end mt-3 md:mt-0" ref={rightRef}>
          <button
            onClick={() => setShowContact(prev => !prev)}
            aria-expanded={showContact}
            aria-haspopup="dialog"
            className={`text-sm font-medium transition-colors text-slate-600 hover:text-[#F4C430] px-4 py-2`}
          >
            Contact
          </button>

          <Link href="/working-fundamentals">
            <button
              type="button"
              aria-label="Working Fundamentals"
              className={`text-sm font-medium transition-colors px-4 py-2 ${isWorkingFundamentals ? 'text-[#F4C430]' : 'text-slate-600 hover:text-[#F4C430]'}`}
            >
              Working Fundamentals
            </button>
          </Link>

          <Link href="/case-studies">
            <button
              type="button"
              aria-label="Case Studies"
              className="text-sm font-medium transition-colors text-slate-600 hover:text-[#F4C430] px-4 py-2"
            >
              Case Studies
            </button>
          </Link>

          <Link href="/contact-me">
            <button
              type="button"
              aria-label="Discuss Your System"
              className="inline-flex items-center justify-center rounded-md border border-[#0F172A] bg-transparent px-4 py-2 text-sm font-medium text-[#0F172A] transition-all hover:bg-[#0F172A] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-offset-1 hover:scale-[1.02]"
            >
              Discuss Your System
            </button>
          </Link>

          <Link href="https://arvinjaysoncastro.com/pdf/ARVIN_JAYSON_CASTRO_-_Solutions_Architect.pdf" target="_blank" rel="noopener noreferrer">
            <button
              type="button"
              aria-label="Download CV"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#0F172A] px-3 py-2 text-sm font-medium text-white transition-all hover:opacity-90 focus:outline-none"
            >
              Download CV
            </button>
          </Link>

          <QuickContactPanel open={showContact} />
        </div>
      </div>
    </header>
  );
}
