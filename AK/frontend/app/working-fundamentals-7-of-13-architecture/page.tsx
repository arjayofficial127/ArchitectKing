import type { Metadata } from 'next';
import { ChapterPage } from '@/components/book/ChapterPage';

export const metadata: Metadata = {
  title: 'Chapter 7: Architecture — Working Fundamentals by Arvin Jayson Castro',
  description: 'Decisions that are expensive to change — Chapter 7 of Working Fundamentals',
};

export default function Chapter7Page() {
  return (
    <ChapterPage
      chapterNumber="7"
      chapterTitle="Architecture"
      chapterSubtitle="Decisions that are expensive to change"
      currentChapterHref="/working-fundamentals-7-of-13-architecture"
      currentChapterLabel="chapter 7 of 13"
      prevChapter={{
        title: 'Design Principles',
        href: '/working-fundamentals-6-of-13-design-principles',
      }}
      nextChapter={{
        title: 'Persistence & Data Modeling',
        href: '/working-fundamentals-8-of-13-persistence-and-data-modeling',
      }}
    >
      <h3>What this chapter is</h3>

      <p>
        This chapter is not about diagrams. It is not about boxes and arrows. It is not about technology choices.
      </p>

      <p>
        This chapter is about <strong>irreversibility</strong>.
      </p>

      <p>
        Architecture exists because some decisions, once made, reshape everything that follows.
      </p>

      <h2>The core truth</h2>

      <p>
        Architecture is not what you build first. Architecture is what you <strong>cannot easily undo</strong>.
      </p>

      <p>
        If a decision can be changed quickly and safely, it is not architectural.
      </p>

      <p>
        If changing it would:
      </p>

      <ul>
        <li>ripple through many parts</li>
        <li>require coordinated changes</li>
        <li>risk breaking unrelated behavior</li>
      </ul>

      <p>
        …then it is architecture.
      </p>

      <p>
        🧠 <strong>Mental Model</strong> Architecture is frozen intent.
      </p>

      <h2>Why architecture exists at all</h2>

      <p>
        In small systems:
      </p>

      <ul>
        <li>everything can touch everything</li>
        <li>changes are cheap</li>
        <li>mistakes are reversible</li>
      </ul>

      <p>
        In real systems:
      </p>

      <ul>
        <li>teams grow</li>
        <li>time passes</li>
        <li>assumptions decay</li>
        <li>pressure increases</li>
      </ul>

      <p>
        Architecture exists to <strong>control the cost of change</strong>.
      </p>

      <p>
        Without it, every change becomes dangerous.
      </p>

      <h2>Boundaries are the real architecture</h2>

      <p>
        Files, folders, layers, services — these are expressions. <strong>Boundaries</strong> are the substance.
      </p>

      <p>
        A boundary defines:
      </p>

      <ul>
        <li>who may depend on whom</li>
        <li>what knowledge is shared</li>
        <li>where assumptions stop</li>
      </ul>

      <p>
        Good boundaries:
      </p>

      <ul>
        <li>slow down damage</li>
        <li>localize mistakes</li>
        <li>preserve reasoning</li>
      </ul>

      <p>
        Bad or missing boundaries:
      </p>

      <ul>
        <li>spread change</li>
        <li>hide responsibility</li>
        <li>amplify fear</li>
      </ul>

      <p>
        🧠 <strong>Architect&apos;s Note</strong> If a boundary is unclear, it does not exist.
      </p>

      <h2>Architecture is constraint, not freedom</h2>

      <p>
        Many think architecture gives freedom.
      </p>

      <p>
        It does not.
      </p>

      <p>
        Good architecture <strong>removes options</strong>.
      </p>

      <p>
        It says:
      </p>

      <ul>
        <li>&quot;You cannot do that here.&quot;</li>
        <li>&quot;This must go through this path.&quot;</li>
        <li>&quot;This knowledge is forbidden here.&quot;</li>
      </ul>

      <p>
        Early on, this feels restrictive. Later, it feels protective.
      </p>

      <p>
        🧠 <strong>Perspective</strong> Freedom without structure becomes chaos under pressure.
      </p>

      <h2>Direction of dependency matters</h2>

      <p>
        One of the most important architectural decisions is:
      </p>

      <blockquote>
        <em>Who depends on whom?</em>
      </blockquote>

      <p>
        Dependencies create gravity.
      </p>

      <p>
        Code that depends on many things:
      </p>

      <ul>
        <li>is harder to change</li>
        <li>is harder to test</li>
        <li>becomes central unintentionally</li>
      </ul>

      <p>
        Code that few things depend on:
      </p>

      <ul>
        <li>is safer to evolve</li>
        <li>becomes foundational</li>
      </ul>

      <p>
        🧠 <strong>Mental Model</strong> Stability flows toward dependency, not size.
      </p>

      <h2>Architectural seams</h2>

      <p>
        A seam is a place where the system can split cleanly.
      </p>

      <p>
        Good seams allow:
      </p>

      <ul>
        <li>replacement</li>
        <li>isolation</li>
        <li>experimentation</li>
      </ul>

      <p>
        Seams often appear as:
      </p>

      <ul>
        <li>interfaces</li>
        <li>ports</li>
        <li>adapters</li>
        <li>boundaries between domains</li>
      </ul>

      <p>
        🧠 <strong>Architect&apos;s Note</strong> A system without seams cannot evolve safely.
      </p>

      <h2>Monolith vs microservices is a false start</h2>

      <p>
        The debate is seductive — and shallow.
      </p>

      <p>
        The real questions are:
      </p>

      <ul>
        <li>Where are the boundaries?</li>
        <li>Are responsibilities clear?</li>
        <li>Can parts change independently?</li>
      </ul>

      <p>
        A well-bounded monolith:
      </p>

      <ul>
        <li>is easier to reason about</li>
        <li>is easier to debug</li>
        <li>can evolve into services later</li>
      </ul>

      <p>
        A poorly bounded distributed system:
      </p>

      <ul>
        <li>multiplies failure</li>
        <li>hides latency</li>
        <li>amplifies mistakes</li>
      </ul>

      <p>
        🧠 <strong>Perspective</strong> Distribution magnifies structure — good or bad.
      </p>

      <h2>Architecture and time</h2>

      <p>
        Architecture must survive:
      </p>

      <ul>
        <li>new features</li>
        <li>new developers</li>
        <li>new constraints</li>
        <li>new scale</li>
      </ul>

      <p>
        Code is written once. Architecture is <strong>lived in</strong>.
      </p>

      <p>
        If the architecture requires constant explanation, it is already failing.
      </p>

      <h2>Architectural mistakes hurt quietly</h2>

      <p>
        Bad architecture rarely breaks immediately.
      </p>

      <p>
        Instead:
      </p>

      <ul>
        <li>development slows</li>
        <li>fear increases</li>
        <li>workarounds multiply</li>
        <li>&quot;temporary&quot; hacks harden</li>
      </ul>

      <p>
        By the time failure is obvious, change is expensive.
      </p>

      <p>
        ⚠️ <strong>Common Drift</strong> Most legacy systems were once &quot;good enough.&quot;
      </p>

      <h2>Humility in architectural decisions</h2>

      <p>
        Every architectural decision is a bet.
      </p>

      <p>
        You will get some wrong.
      </p>

      <p>
        Good architects:
      </p>

      <ul>
        <li>isolate risk</li>
        <li>delay irreversible decisions</li>
        <li>avoid locking in guesses</li>
        <li>provide escape routes</li>
      </ul>

      <p>
        🧠 <strong>Architect&apos;s Note</strong> The best architecture assumes it will be partially wrong.
      </p>

      <h2>Architecture is about people, not systems</h2>

      <p>
        Architecture exists to help humans:
      </p>

      <ul>
        <li>reason</li>
        <li>collaborate</li>
        <li>change safely</li>
        <li>sleep at night</li>
      </ul>

      <p>
        If only the original author understands it, it has already failed.
      </p>

      <h2>Minimal practice (still no code)</h2>

      <p>
        <strong>Problem:</strong> &quot;A system mixes business rules, data access, and external integrations in the same modules.&quot;
      </p>

      <p>
        Ask:
      </p>

      <ul>
        <li>What must change together?</li>
        <li>What should never change together?</li>
        <li>Where should knowledge stop flowing?</li>
      </ul>

      <p>
        If those answers are unclear, architecture is missing.
      </p>

      <h2>What beginners gain here</h2>

      <ul>
        <li>Respect for structure</li>
        <li>Awareness of long-term cost</li>
        <li>Understanding why some codebases feel hostile</li>
      </ul>

      <h2>What experienced developers recognize</h2>

      <ul>
        <li>Why refactors stall</li>
        <li>Why every change feels risky</li>
        <li>Why progress slows over time</li>
      </ul>

      <p>
        Architecture was neglected.
      </p>

      <h2>What this chapter deliberately avoids</h2>

      <ul>
        <li>Technology stacks</li>
        <li>Framework choices</li>
        <li>Deployment models</li>
        <li>Trend-driven patterns</li>
      </ul>

      <p>
        Those are downstream.
      </p>

      <h2>Closing</h2>

      <p>
        Architecture is not about control. It is about <strong>endurance</strong>.
      </p>

      <p>
        Good architecture fades into the background. Bad architecture demands attention every day.
      </p>

      <p>
        Design so the system can grow beyond you — without collapsing under its own weight.
      </p>
    </ChapterPage>
  );
}
