import type { Metadata } from 'next';
import { ChapterPage } from '@/components/book/ChapterPage';

export const metadata: Metadata = {
  title: 'Chapter 6: Design Principles — Working Fundamentals by Arvin Jayson Castro',
  description: 'Why boundaries matter more than cleverness — Chapter 6 of Working Fundamentals',
};

export default function Chapter6Page() {
  return (
    <ChapterPage
      chapterNumber="6"
      chapterTitle="Design Principles"
      chapterSubtitle="Why boundaries matter more than cleverness"
      currentChapterHref="/working-fundamentals-6-of-13-design-principles"
      currentChapterLabel="chapter 6 of 13"
      prevChapter={{
        title: 'State & Change',
        href: '/working-fundamentals-5-of-13-state-and-change',
      }}
      nextChapter={{
        title: 'Architecture',
        href: '/working-fundamentals-7-of-13-architecture',
      }}
    >
      <h3>What this chapter is</h3>

      <p>
        This chapter is not a checklist. It is not a style guide. It is not a collection of slogans.
      </p>

      <p>
        This chapter explains <strong>why design principles exist at all</strong>.
      </p>

      <p>
        They were not invented by committees. They were <strong>discovered through failure</strong>.
      </p>

      <h2>The core truth</h2>

      <p>
        Design principles are <strong>damage control mechanisms</strong>.
      </p>

      <p>
        They exist because:
      </p>

      <ul>
        <li>systems grow</li>
        <li>people change</li>
        <li>assumptions break</li>
        <li>time passes</li>
      </ul>

      <p>
        Good design is not about elegance. It is about <strong>survivability</strong>.
      </p>

      <h2>Principles are not rules</h2>

      <p>
        Rules demand obedience. Principles demand judgment.
      </p>

      <p>
        A principle does not say:
      </p>

      <blockquote>
        &quot;Always do this.&quot;
      </blockquote>

      <p>
        It says:
      </p>

      <blockquote>
        &quot;If you ignore this, something predictable will go wrong.&quot;
      </blockquote>

      <p>
        🧠 <strong>Mental Model</strong> Principles are warnings written in advance.
      </p>

      <h2>Separation of concerns: the foundation</h2>

      <p>
        When responsibilities mix:
      </p>

      <ul>
        <li>changes collide</li>
        <li>bugs hide</li>
        <li>reasoning slows</li>
      </ul>

      <p>
        Separation is not about purity. It is about <strong>blast radius</strong>.
      </p>

      <p>
        If something breaks, how much breaks with it?
      </p>

      <p>
        🧠 <strong>Architect&apos;s Note</strong> A concern separated is a failure contained.
      </p>

      <h2>Boundaries create safety</h2>

      <p>
        A boundary is a line you agree not to cross casually.
      </p>

      <p>
        Boundaries answer:
      </p>

      <ul>
        <li>what can change freely</li>
        <li>what must remain stable</li>
        <li>where assumptions stop</li>
      </ul>

      <p>
        Without boundaries:
      </p>

      <ul>
        <li>everything depends on everything</li>
        <li>fear replaces confidence</li>
        <li>refactoring becomes dangerous</li>
      </ul>

      <p>
        🧠 <strong>Perspective</strong> Most &quot;tight coupling&quot; is actually missing boundaries.
      </p>

      <h2>Single Responsibility, correctly understood</h2>

      <p>
        Single Responsibility does not mean:
      </p>

      <blockquote>
        &quot;One function does one thing.&quot;
      </blockquote>

      <p>
        It means:
      </p>

      <blockquote>
        &quot;One reason to change.&quot;
      </blockquote>

      <p>
        When code changes for multiple reasons:
      </p>

      <ul>
        <li>fixes interfere</li>
        <li>intent blurs</li>
        <li>history accumulates</li>
      </ul>

      <p>
        🧠 <strong>Mental Model</strong> If a change request feels ambiguous, responsibility is unclear.
      </p>

      <h2>DRY, without superstition</h2>

      <p>
        &quot;Don&apos;t Repeat Yourself&quot; is often misapplied.
      </p>

      <p>
        It does <strong>not</strong> mean:
      </p>

      <ul>
        <li>eliminate all duplication</li>
        <li>reuse aggressively</li>
        <li>abstract early</li>
      </ul>

      <p>
        It means:
      </p>

      <blockquote>
        &quot;A rule should have one authoritative definition.&quot;
      </blockquote>

      <p>
        Duplication of <em>knowledge</em> is the enemy. Duplication of <em>code</em> is sometimes the price of clarity.
      </p>

      <p>
        ⚠️ <strong>Common Drift</strong> Premature abstraction spreads mistakes faster.
      </p>

      <h2>Coupling vs cohesion</h2>

      <p>
        Cohesion:
      </p>

      <ul>
        <li>things that belong together</li>
        <li>shared purpose</li>
        <li>aligned change</li>
      </ul>

      <p>
        Coupling:
      </p>

      <ul>
        <li>things that depend on each other</li>
        <li>shared assumptions</li>
        <li>forced coordination</li>
      </ul>

      <p>
        High cohesion is good. High coupling is dangerous.
      </p>

      <p>
        🧠 <strong>Architect&apos;s Note</strong> Aim to increase cohesion before reducing coupling.
      </p>

      <h2>Cleverness is a liability</h2>

      <p>
        Clever code:
      </p>

      <ul>
        <li>impresses briefly</li>
        <li>confuses later</li>
        <li>resists change</li>
      </ul>

      <p>
        Clarity scales. Cleverness does not.
      </p>

      <p>
        🧠 <strong>Perspective</strong> If code needs explanation, it is already fragile.
      </p>

      <h2>Design for change, not prediction</h2>

      <p>
        You cannot predict:
      </p>

      <ul>
        <li>future features</li>
        <li>future scale</li>
        <li>future teams</li>
      </ul>

      <p>
        You <em>can</em> predict:
      </p>

      <ul>
        <li>change will happen</li>
        <li>assumptions will break</li>
        <li>pressure will arrive</li>
      </ul>

      <p>
        Good design:
      </p>

      <ul>
        <li>localizes change</li>
        <li>limits impact</li>
        <li>preserves invariants</li>
      </ul>

      <h2>Abstractions must earn their place</h2>

      <p>
        An abstraction should:
      </p>

      <ul>
        <li>remove repetition of reasoning</li>
        <li>hide volatile details</li>
        <li>clarify intent</li>
      </ul>

      <p>
        If it only:
      </p>

      <ul>
        <li>saves lines</li>
        <li>feels elegant</li>
        <li>looks reusable</li>
      </ul>

      <p>
        …it is suspect.
      </p>

      <p>
        🧠 <strong>Mental Model</strong> Abstractions should make misuse harder, not easier.
      </p>

      <h2>Design debt vs technical debt</h2>

      <p>
        Technical debt is often blamed. Design debt is more dangerous.
      </p>

      <p>
        Design debt appears when:
      </p>

      <ul>
        <li>boundaries are skipped</li>
        <li>responsibilities blur</li>
        <li>shortcuts harden into structure</li>
      </ul>

      <p>
        It compounds silently.
      </p>

      <p>
        ⚠️ <strong>Common Drift</strong> Most &quot;legacy problems&quot; began as reasonable shortcuts.
      </p>

      <h2>Minimal practice (still no code)</h2>

      <p>
        <strong>Problem:</strong> &quot;A module handles validation, persistence, logging, and notification.&quot;
      </p>

      <p>
        Ask:
      </p>

      <ul>
        <li>How many reasons can this change?</li>
        <li>Which changes should be independent?</li>
        <li>Where should boundaries exist?</li>
      </ul>

      <p>
        If the answers overlap, redesign is needed.
      </p>

      <h2>What beginners gain here</h2>

      <ul>
        <li>A sense of restraint</li>
        <li>Fewer &quot;magic fixes&quot;</li>
        <li>Cleaner mental models</li>
      </ul>

      <h2>What experienced developers recognize</h2>

      <ul>
        <li>Why systems rot over time</li>
        <li>Why refactors feel dangerous</li>
        <li>Why clever designs age poorly</li>
      </ul>

      <p>
        Principles were ignored.
      </p>

      <h2>What this chapter deliberately avoids</h2>

      <ul>
        <li>Named patterns</li>
        <li>Framework opinions</li>
        <li>Methodology wars</li>
        <li>Dogma</li>
      </ul>

      <p>
        Those are downstream.
      </p>

      <h2>Closing</h2>

      <p>
        Design principles are not about beauty. They are about <strong>longevity</strong>.
      </p>

      <p>
        Boundaries protect clarity. Clarity protects systems. Systems that hold protect people.
      </p>

      <p>
        Choose boring design. Boring design survives.
      </p>
    </ChapterPage>
  );
}
