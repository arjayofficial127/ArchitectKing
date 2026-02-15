'use client';

import { useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ContactPopover } from '@/components/landing/ContactPopover';

export function SiteNavbar() {
  const pathname = usePathname();
  const [isContactPopoverOpen, setIsContactPopoverOpen] = useState(false);
  const contactTriggerRef = useRef<HTMLAnchorElement>(null);
  
  const isWorkingFundamentals = pathname?.startsWith('/working-fundamentals') ?? false;

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
              href="/working-fundamentals" 
              className={`text-sm font-medium transition-colors ${
                isWorkingFundamentals 
                  ? 'text-[#0F172A] border-b-2 border-[#F4C430] pb-1' 
                  : 'text-slate-600 hover:text-[#F4C430]'
              }`}
            >
              Working Fundamentals
            </Link>
            <a href="/#case-studies" className="text-sm font-medium text-slate-600 hover:text-[#F4C430] transition-colors">
              Case Studies
            </a>
            <a href="/#systems" className="text-sm font-medium text-slate-600 hover:text-[#F4C430] transition-colors">
              Systems
            </a>
            <div className="relative">
              <a
                ref={contactTriggerRef}
                href="/#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setIsContactPopoverOpen(!isContactPopoverOpen);
                }}
                className="text-sm font-medium text-slate-600 hover:text-[#F4C430] transition-colors cursor-pointer"
                aria-expanded={isContactPopoverOpen}
                aria-haspopup="true"
              >
                Contact
              </a>
              <ContactPopover
                isOpen={isContactPopoverOpen}
                onClose={() => setIsContactPopoverOpen(false)}
                triggerRef={contactTriggerRef}
              />
            </div>
          </nav>
          <a
            href="https://m.me/arjayofficial127"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center rounded-md border border-[#0F172A] bg-transparent px-4 py-1.5 text-sm font-medium text-[#0F172A] transition-all hover:bg-[#0F172A] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-offset-1"
          >
            Message Me
          </a>
        </div>
      </div>
    </header>
  );
}
