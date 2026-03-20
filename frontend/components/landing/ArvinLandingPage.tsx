"use client";

import Link from 'next/link';
import Image from 'next/image';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { DiagramCreator } from '@/components/case-studies/DiagramCreator';
import { CaseStudy } from './CaseStudy';
import { CTASection } from './CTASection';
import { AuthorityStrip } from './AuthorityStrip';
import { TechnicalDepth } from './TechnicalDepth';
import { SystemsArchitecture } from './SystemsArchitecture';
import { BookAuthorityStrip } from './BookAuthorityStrip';
import { SiteNavbar } from '@/components/shared/SiteNavbar';
import { selectedProductionWorkDiagrams } from './selectedProductionWorkDiagrams';

import { FooterFold } from './sections/FooterFold';

import { HeroFold } from './sections/HeroFold';
import { ImprovementsFold } from './sections/ImprovementsFold';
import { ProblemsFold } from './sections/ProblemsFold';
import { FeaturedFold } from './sections/FeaturedFold';
import { ExperienceFold } from './sections/ExperienceFold';
import { FeedbackFold } from './sections/FeedbackFold';
import { CTAFold } from './sections/CTAFold';

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

        {/* ✅ NEW CLEAN FOLDS */}
        <HeroFold />
        <ImprovementsFold />
        <ProblemsFold />
        <FeaturedFold />
        <ExperienceFold />
        <FeedbackFold />
        <CTAFold />

        {/* ✅ KEEP EXISTING SAFE COMPONENTS */}
        <AuthorityStrip />
        <BookAuthorityStrip />
        <TechnicalDepth />
        <SystemsArchitecture />
        <CTASection />

      </main>

      {/* Footer */}
      <FooterFold />

    </div>
  );
}