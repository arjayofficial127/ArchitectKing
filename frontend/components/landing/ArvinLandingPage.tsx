"use client";

import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { SiteNavbar } from '@/components/shared/SiteNavbar';

import { FooterFold } from './sections/FooterFold';
import { HeroFoldCloser } from './sections/HeroFoldCloser';
import { ProofFoldCloser } from './sections/ProofFoldCloser';
import { CloseFoldCloser } from './sections/CloseFoldCloser';

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

        {/* 3-FOLD CONVERSION LAYOUT */}
        <HeroFoldCloser />
        <ProofFoldCloser />
        <CloseFoldCloser />

      </main>

      {/* Footer */}
      <FooterFold />

    </div>
  );
}