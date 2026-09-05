"use client";

import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { SiteNavbar } from '@/components/shared/SiteNavbar';

import { HeroFoldCloser } from './sections/HeroFoldCloser';
import { TechStrip } from './sections/TechStrip';
import { CareerTimelineSection } from './sections/CareerTimelineSection';
import { StrengthsSection } from './sections/StrengthsSection';
import { SelectedSystemsSection } from './sections/SelectedSystemsSection';
import { WritingSection } from './sections/WritingSection';
import { HiringCloseSection } from './sections/HiringCloseSection';

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
        {/* Fold 1: hero + working-principles strip */}
        <section className="flex min-h-[calc(100vh-82px)] flex-col justify-between">
          <div className="flex flex-1 items-center justify-center">
            <HeroFoldCloser />
          </div>
          <TechStrip />
        </section>

        <CareerTimelineSection />

        {/* #approach is kept as an anchor: other pages still link to /#approach. */}
        <section id="approach" className="scroll-mt-28">
          <StrengthsSection />
        </section>

        <SelectedSystemsSection />

        <WritingSection />
      </main>

      <HiringCloseSection />
    </div>
  );
}
