'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function SiteNavbar() {
  const pathname = usePathname();
  
  const isWorkingFundamentals = pathname?.startsWith('/working-fundamentals') ?? false;
  const isCaseStudies = pathname?.startsWith('/case-studies') ?? false;

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
        <div className="flex items-center gap-4">
          <Link 
            href="/contact-me" 
            className={`text-sm font-medium transition-colors text-slate-600 hover:text-[#F4C430]`}
          >
            Contact
          </Link>

          <button
            type="button"
            aria-label="Let’s Work Together"
            onClick={(e) => {
              e.preventDefault();
              const ids = ['contact', 'contact-me', 'contact-section', 'contactForm'];
              for (const id of ids) {
                const el = document.getElementById(id);
                if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
              }
              const ev = new CustomEvent('open-contact-popover', { bubbles: true, cancelable: true });
              const notCanceled = window.dispatchEvent(ev);
              if (notCanceled) { window.location.href = 'mailto:arvinjaysoncastro@gmail.com'; }
            }}
            className="inline-flex items-center justify-center rounded-md border border-[#0F172A] bg-transparent px-4 py-1.5 text-sm font-medium text-[#0F172A] transition-all hover:bg-[#0F172A] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-offset-1"
          >
            Let’s Work Together
          </button>
        </div>
      </div>
    </header>
  );
}
