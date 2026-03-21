"use client";

import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { SiteNavbar } from '@/components/shared/SiteNavbar';

import { HeroFoldCloser } from './sections/HeroFoldCloser';
import { ProofFoldCloser } from './sections/ProofFoldCloser';
// CloseFoldCloser section removed per request
import { TechStrip } from './sections/TechStrip';

export function ArvinLandingPage() {

  return (
    <div className="relative min-h-screen bg-white text-slate-800">
      
      {/* Background */}
      <AmbientBackground 
        gridSize={64} 
        lightCount={8} 
        enableGradient
        gradientOpacity={0.08}
        enableGrain
        grainOpacity={0.04}
      />

      {/* Navbar */}
      <SiteNavbar />

      <main className="relative">

        {/* 3-FOLD LAYOUT - Fold 1: Hero + TechStrip combined into one full-height fold */}
        <section className="min-h-[calc(100vh-59px)]  flex flex-col justify-between">
          <div className="flex-1 flex items-center justify-center">
            <HeroFoldCloser />
          </div>
          <TechStrip />
        </section>

        <section className="min-h-screen flex flex-col justify-center">
          <ProofFoldCloser />
        </section>

        <section className="min-h-screen flex flex-col justify-center">
          <div className="mx-auto max-w-4xl text-center px-6">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Looking for someone to design, scale, or stabilize your systems?</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">I bring 15+ years of experience building and evolving production systems across teams and industries.</p>

            <div className="mt-8">
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
                className="bg-yellow-400 px-8 py-3 rounded font-semibold inline-block text-center"
              >
                Let’s Work Together
              </button>

              
            </div>
          </div>
        </section>

      </main>

    </div>
  );
}