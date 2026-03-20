'use client';

import { TechStrip } from './TechStrip';
import { ArchitectureImprovementsSection } from './ArchitectureImprovementsSection';
import { RedFlagsSection } from './RedFlagsSection';

export function ImprovementsFold() {
  return (
    <section>
      <TechStrip />
      <ArchitectureImprovementsSection />
      <RedFlagsSection />
    </section>
  );
}
