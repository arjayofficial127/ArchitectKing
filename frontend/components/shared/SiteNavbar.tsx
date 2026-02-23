'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function SiteNavbar() {
  const pathname = usePathname();
  
  const isWorkingFundamentals = pathname?.startsWith('/working-fundamentals') ?? false;
  const isCaseStudies = pathname?.startsWith('/case-studies') ?? false;

  return (
    <header className="relative border-b border-slate-200/60 bg-white/80 backdrop-blur-sm z-50">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-base font-semibold tracking-tight text-slate-900 hover:text-slate-700 transition-colors">
            Arvin Jayson Castro
          </Link>
          <span className="text-sm text-slate-400">|</span>
          <span className="text-sm text-slate-500">Senior Full-Stack Engineer</span>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/case-studies" 
              className={`text-sm font-medium transition-colors ${
                isCaseStudies 
                  ? 'text-[#0F172A] border-b-2 border-[#F4C430] pb-1' 
                  : 'text-slate-600 hover:text-[#F4C430]'
              }`}
            >
              Case Studies
            </Link>
            <Link 
              href="/working-fundamentals" 
              className={`text-sm font-medium transition-colors ${
                isWorkingFundamentals 
                  ? 'text-[#0F172A] border-b-2 border-[#F4C430] pb-1' 
                  : 'text-slate-600 hover:text-[#F4C430]'
              }`}
            >
              How I Build Systems
            </Link>
            <Link 
              href="/contact-me" 
              className={`text-sm font-medium transition-colors ${
                pathname === '/contact-me'
                  ? 'text-[#0F172A] border-b-2 border-[#F4C430] pb-1' 
                  : 'text-slate-600 hover:text-[#F4C430]'
              }`}
            >
              Contact
            </Link>
          </nav>
          <a
            href="mailto:arvinjaysoncastro@gmail.com"
            className="hidden sm:inline-flex items-center justify-center rounded-md border border-[#0F172A] bg-transparent px-4 py-1.5 text-sm font-medium text-[#0F172A] transition-all hover:bg-[#0F172A] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-offset-1"
          >
            Message Me
          </a>
        </div>
      </div>
    </header>
  );
}
