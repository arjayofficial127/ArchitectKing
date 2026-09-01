"use client";

import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { SiteNavbar } from '@/components/shared/SiteNavbar';

import { HeroFoldCloser } from './sections/HeroFoldCloser';
import { ProofFoldCloser } from './sections/ProofFoldCloser';
// CloseFoldCloser section removed per request
import { TechStrip } from './sections/TechStrip';
import { SelectedSystemsSection } from './sections/SelectedSystemsSection';
import { CloseFoldFinal } from './sections/CloseFoldFinal';

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
      <div className="header">
        <SiteNavbar />
      </div>

      <main className="relative">

        {/* 3-FOLD LAYOUT - Fold 1: Hero + TechStrip combined into one full-height fold */}
        <section className="flex min-h-[calc(100vh-82px)] flex-col justify-between">
          <div className="flex-1 flex items-center justify-center">
            <HeroFoldCloser />
          </div>
          <TechStrip />
        </section>

        <SelectedSystemsSection />

        <section id="approach" className="scroll-mt-28">
          <ProofFoldCloser />
        </section>

        <CloseFoldFinal />

      </main>

    </div>
  );
}
