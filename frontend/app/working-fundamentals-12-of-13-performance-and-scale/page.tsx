import type { Metadata } from 'next';
import { ChapterPage } from '@/components/book/ChapterPage';

export const metadata: Metadata = {
  title: 'Chapter 12: Performance & Scale — Working Fundamentals by Arvin Jayson Castro',
  description: 'When systems meet reality — Chapter 12 of Working Fundamentals',
};

export default function Chapter12Page() {
  return (
    <ChapterPage
      chapterNumber="12"
      chapterTitle="Performance & Scale"
      chapterSubtitle="When systems meet reality"
      currentChapterHref="/working-fundamentals-12-of-13-performance-and-scale"
      currentChapterLabel="chapter 12 of 13"
      prevChapter={{
        title: 'Testing',
        href: '/working-fundamentals-11-of-13-testing',
      }}
      nextChapter={{
        title: 'The Developer\'s Role',
        href: '/working-fundamentals-13-of-13-the-developers-role',
      }}
    >
      <h3>What this chapter is</h3>

      <p>
        This chapter is not about micro-optimizations. It is not about benchmarks. It is not about clever tricks.
      </p>

      <p>
        This chapter is about <strong>stress</strong>.
      </p>

      <p>
        Performance problems do not appear randomly. They surface when a system is asked to do more than it was designed to do.
      </p>

      <h2>The core truth</h2>

      <p>
        Scale does not create problems. It <strong>reveals them</strong>.
      </p>

      <p>
        What works at small scale can fail quietly. What works at large scale must be structurally sound.
      </p>

      <p>
        🧠 <strong>Mental Model</strong> Performance is architecture asking for attention.
      </p>

      <h2>Why performance surprises people</h2>

      <p>
        Most developers test systems under ideal conditions:
      </p>

      <ul>
        <li>small data</li>
        <li>single users</li>
        <li>sequential execution</li>
        <li>predictable inputs</li>
      </ul>

      <p>
        Real systems face:
      </p>

      <ul>
        <li>concurrency</li>
        <li>uneven load</li>
        <li>partial failure</li>
        <li>long lifetimes</li>
      </ul>

      <p>
        The surprise is not that systems slow down. The surprise is that assumptions were never questioned.
      </p>

      <h2>Performance is about growth, not speed</h2>

      <p>
        Speed answers:
      </p>

      <blockquote>
        &quot;How fast is this now?&quot;
      </blockquote>

      <p>
        Performance answers:
      </p>

      <blockquote>
        &quot;What happens when this grows?&quot;
      </blockquote>

      <p>
        Growth happens in:
      </p>

      <ul>
        <li>users</li>
        <li>data volume</li>
        <li>requests</li>
        <li>time</li>
        <li>complexity</li>
      </ul>

      <p>
        🧠 <strong>Perspective</strong> A fast system that collapses under growth is not performant.
      </p>

      <h2>Bottlenecks reveal intent</h2>

      <p>
        Every system has bottlenecks.
      </p>

      <p>
        Bottlenecks tell you:
      </p>

      <ul>
        <li>where work concentrates</li>
        <li>where structure is weak</li>
        <li>where assumptions break</li>
      </ul>

      <p>
        Chasing bottlenecks blindly creates churn. Understanding them creates clarity.
      </p>

      <p>
        🧠 <strong>Architect&apos;s Note</strong> Bottlenecks are messages, not enemies.
      </p>

      <h2>Measure before reacting</h2>

      <p>
        Without measurement:
      </p>

      <ul>
        <li>intuition lies</li>
        <li>effort is wasted</li>
        <li>fixes misfire</li>
      </ul>

      <p>
        Guessing performance problems often:
      </p>

      <ul>
        <li>optimizes the wrong thing</li>
        <li>hides the real issue</li>
        <li>introduces new failures</li>
      </ul>

      <p>
        Measure first. Then decide.
      </p>

      <h2>Caching is a promise, not a shortcut</h2>

      <p>
        Caching trades:
      </p>

      <ul>
        <li>freshness for speed</li>
        <li>consistency for performance</li>
        <li>simplicity for complexity</li>
      </ul>

      <p>
        Every cache must answer:
      </p>

      <ul>
        <li>when is data stale?</li>
        <li>who invalidates it?</li>
        <li>what happens when it&apos;s wrong?</li>
      </ul>

      <p>
        🧠 <strong>Mental Model</strong> A cache is an agreement with time.
      </p>

      <p>
        Break that agreement, and bugs follow.
      </p>

      <h2>Concurrency exposes state</h2>

      <p>
        Concurrency does not cause bugs. It <strong>reveals unsafe state</strong>.
      </p>

      <p>
        When multiple things happen at once:
      </p>

      <ul>
        <li>shared state leaks</li>
        <li>assumptions break</li>
        <li>race conditions appear</li>
      </ul>

      <p>
        🧠 <strong>Perspective</strong> If concurrency breaks your system, state was already fragile.
      </p>

      <h2>Performance and persistence</h2>

      <p>
        Most performance problems involve data:
      </p>

      <ul>
        <li>too much of it</li>
        <li>poorly structured</li>
        <li>accessed inefficiently</li>
        <li>fetched repeatedly</li>
      </ul>

      <p>
        This is why data modeling matters.
      </p>

      <p>
        Structure first. Optimization second.
      </p>

      <h2>When optimization is necessary</h2>

      <p>
        Optimization becomes necessary when:
      </p>

      <ul>
        <li>growth is real</li>
        <li>pain is measured</li>
        <li>structure is understood</li>
      </ul>

      <p>
        At that point:
      </p>

      <ul>
        <li>remove repeated work</li>
        <li>move work earlier or later</li>
        <li>change structure</li>
        <li>change boundaries</li>
      </ul>

      <p>
        Micro-optimizations rarely matter. Structural changes endure.
      </p>

      <h2>Premature optimization revisited</h2>

      <p>
        Optimizing early often:
      </p>

      <ul>
        <li>complicates design</li>
        <li>hides intent</li>
        <li>freezes bad structure</li>
      </ul>

      <p>
        🧠 <strong>Architect&apos;s Note</strong> The cost of premature optimization is paid in understanding.
      </p>

      <h2>Scaling changes failure modes</h2>

      <p>
        At scale:
      </p>

      <ul>
        <li>retries amplify load</li>
        <li>slow paths dominate</li>
        <li>rare bugs become frequent</li>
        <li>partial failures cascade</li>
      </ul>

      <p>
        Designing for scale means:
      </p>

      <ul>
        <li>bounding failure</li>
        <li>limiting retries</li>
        <li>isolating damage</li>
      </ul>

      <h2>Minimal practice (still no code)</h2>

      <p>
        <strong>Problem:</strong> &quot;A feature works fine locally but slows dramatically under load.&quot;
      </p>

      <p>
        Ask:
      </p>

      <ul>
        <li>What assumptions were made about size?</li>
        <li>What work is repeated?</li>
        <li>Where is state shared?</li>
        <li>Which boundaries are missing?</li>
      </ul>

      <p>
        If the answers are vague, performance tuning will fail.
      </p>

      <h2>What beginners gain here</h2>

      <ul>
        <li>Realistic expectations</li>
        <li>Respect for structure</li>
        <li>Fewer magical fixes</li>
      </ul>

      <h2>What experienced developers recognize</h2>

      <ul>
        <li>Why optimizations don&apos;t stick</li>
        <li>Why performance work feels endless</li>
        <li>Why fixes move problems elsewhere</li>
      </ul>

      <p>
        Structure was ignored.
      </p>

      <h2>What this chapter deliberately avoids</h2>

      <ul>
        <li>Language-specific tuning</li>
        <li>Tool recommendations</li>
        <li>Benchmark strategies</li>
        <li>Infrastructure details</li>
      </ul>

      <p>
        Those are downstream.
      </p>

      <h2>Closing</h2>

      <p>
        Performance is not speed.
      </p>

      <p>
        It is <strong>stability under pressure</strong>.
      </p>

      <p>
        A performant system:
      </p>

      <ul>
        <li>degrades gracefully</li>
        <li>reveals problems early</li>
        <li>survives growth</li>
      </ul>

      <p>
        Design for pressure while calm — because pressure will arrive.
      </p>
    </ChapterPage>
  );
}
