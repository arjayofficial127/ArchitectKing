"use client";

import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { SiteNavbar } from '@/components/shared/SiteNavbar';

import { HeroFoldCloser } from './sections/HeroFoldCloser';
import { ProofFoldCloser } from './sections/ProofFoldCloser';
// CloseFoldCloser section removed per request
import { TechStrip } from './sections/TechStrip';
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

        <CloseFoldFinal />

      </main>

    </div>
  );
}