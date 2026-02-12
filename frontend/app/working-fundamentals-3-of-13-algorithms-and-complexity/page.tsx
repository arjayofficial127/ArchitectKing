import type { Metadata } from 'next';
import { ChapterPage } from '@/components/book/ChapterPage';

export const metadata: Metadata = {
  title: 'Chapter 3: Algorithms & Complexity — Working Fundamentals by Arvin Jayson Castro',
  description: 'Cost is behavior made visible — Chapter 3 of Working Fundamentals',
};

export default function Chapter3Page() {
  return (
    <ChapterPage
      chapterNumber="3"
      chapterTitle="Algorithms & Complexity"
      chapterSubtitle="Cost is behavior made visible"
      currentChapterHref="/working-fundamentals-3-of-13-algorithms-and-complexity"
      currentChapterLabel="chapter 3 of 13"
      prevChapter={{
        title: 'Data Structures',
        href: '/working-fundamentals-2-of-13-data-structures',
      }}
      nextChapter={{
        title: 'Control & Flow',
        href: '/working-fundamentals-4-of-13-control-and-flow',
      }}
    >
      <h3>What this chapter is</h3>

      <p>
        This chapter is not a catalog of algorithms. It is not a race for cleverness. It is not about trick solutions.
      </p>

      <p>
        This chapter explains <strong>why cost exists</strong> and <strong>how it shapes systems</strong>.
      </p>

      <p>
        Algorithms are not about speed. They are about <strong>tradeoffs you cannot escape</strong>.
      </p>

      <h2>The core truth</h2>

      <p>
        Every operation has a cost.
      </p>

      <p>
        If you do not name the cost, the system will pay it <strong>somewhere else</strong>.
      </p>

      <p>
        Time, space, and complexity do not disappear. They only move.
      </p>

      <h2>What an algorithm really is</h2>

      <p>
        An algorithm is not code.
      </p>

      <p>
        It is a <strong>decision procedure</strong>:
      </p>

      <ul>
        <li>how work progresses</li>
        <li>how often it repeats</li>
        <li>how it grows with input</li>
      </ul>

      <p>
        Code is just the expression.
      </p>

      <p>
        🧠 <strong>Mental Model</strong> An algorithm describes <em>how effort scales</em>, not <em>what happens once</em>.
      </p>

      <h2>Complexity is about growth, not size</h2>

      <p>
        Many misunderstand complexity as &quot;fast vs slow.&quot;
      </p>

      <p>
        That is shallow.
      </p>

      <p>
        Complexity answers a deeper question:
      </p>

      <blockquote>
        <em>What happens when this grows?</em>
      </blockquote>

      <ul>
        <li>More users</li>
        <li>More data</li>
        <li>More interactions</li>
        <li>More time</li>
      </ul>

      <p>
        A solution that works at small scale can collapse silently at larger scale.
      </p>

      <p>
        ⚠️ <strong>Common Drift</strong> Systems fail when growth was never modeled.
      </p>

      <h2>Big-O is a warning label, not a badge</h2>

      <p>
        Big-O notation is often misused as a flex.
      </p>

      <p>
        That misses the point.
      </p>

      <p>
        Big-O exists to say:
      </p>

      <ul>
        <li>&quot;This will get expensive.&quot;</li>
        <li>&quot;This will stay stable.&quot;</li>
        <li>&quot;This will surprise you later.&quot;</li>
      </ul>

      <p>
        🧠 <strong>Perspective</strong> Big-O does not measure speed. It measures <strong>risk under growth</strong>.
      </p>

      <h2>The invisible loop problem</h2>

      <p>
        Most performance issues come from <strong>unseen repetition</strong>.
      </p>

      <ul>
        <li>loops inside loops</li>
        <li>repeated lookups</li>
        <li>redundant transformations</li>
        <li>recomputation instead of reuse</li>
      </ul>

      <p>
        Individually harmless. Collectively destructive.
      </p>

      <p>
        🧠 <strong>Architect&apos;s Note</strong> If work repeats, ask <em>why</em> before asking <em>how fast</em>.
      </p>

      <h2>Structure determines algorithmic cost</h2>

      <p>
        Algorithms do not live alone.
      </p>

      <p>
        They sit on top of:
      </p>

      <ul>
        <li>data structures</li>
        <li>access patterns</li>
        <li>assumptions about ordering and uniqueness</li>
      </ul>

      <p>
        A poor structure forces expensive algorithms. A good structure simplifies them.
      </p>

      <p>
        This is why Chapter 2 comes first.
      </p>

      <h2>Space is a decision, not waste</h2>

      <p>
        Many developers fear memory usage unnecessarily.
      </p>

      <p>
        Space can be used to:
      </p>

      <ul>
        <li>reduce recomputation</li>
        <li>preserve results</li>
        <li>stabilize performance</li>
      </ul>

      <p>
        Caching is not optimization. It is <strong>time traded for space</strong>.
      </p>

      <p>
        🧠 <strong>Mental Model</strong> Every cache is a promise about consistency.
      </p>

      <p>
        Break that promise, and bugs follow.
      </p>

      <h2>When &quot;fast enough&quot; is correct</h2>

      <p>
        Not every system needs to be optimal.
      </p>

      <p>
        Some systems need to be:
      </p>

      <ul>
        <li>readable</li>
        <li>stable</li>
        <li>predictable</li>
        <li>easy to reason about</li>
      </ul>

      <p>
        Optimization too early creates:
      </p>

      <ul>
        <li>brittle code</li>
        <li>unclear intent</li>
        <li>defensive logic</li>
      </ul>

      <p>
        🧠 <strong>Perspective</strong> The best algorithm is often the one that stays obvious longest.
      </p>

      <h2>When optimization is unavoidable</h2>

      <p>
        Optimization becomes necessary when:
      </p>

      <ul>
        <li>growth is real</li>
        <li>cost is measured</li>
        <li>failure is visible</li>
      </ul>

      <p>
        At that point:
      </p>

      <ul>
        <li>remove repeated work</li>
        <li>move work earlier or later</li>
        <li>change the structure</li>
        <li>change the boundary</li>
      </ul>

      <p>
        Micro-optimizations rarely matter. Structural changes do.
      </p>

      <h2>Minimal practice (still no code)</h2>

      <p>
        <strong>Problem:</strong> &quot;You need to check whether a user already exists, and this check happens for every request.&quot;
      </p>

      <p>
        Ask:
      </p>

      <ul>
        <li>How often does this run?</li>
        <li>What does it scale with?</li>
        <li>Is the cost constant or growing?</li>
        <li>Can structure remove repetition?</li>
      </ul>

      <p>
        If the answer is &quot;we&apos;ll see later,&quot; later will be painful.
      </p>

      <h2>What beginners gain here</h2>

      <ul>
        <li>Relief from guessing</li>
        <li>A sense of scale</li>
        <li>Understanding why some solutions &quot;feel wrong&quot;</li>
      </ul>

      <h2>What experienced developers recognize</h2>

      <ul>
        <li>Why systems slow down mysteriously</li>
        <li>Why fixes don&apos;t stick</li>
        <li>Why performance work feels endless</li>
      </ul>

      <p>
        The cost was never named.
      </p>

      <h2>What this chapter deliberately avoids</h2>

      <ul>
        <li>Algorithm lists</li>
        <li>Competitive programming tricks</li>
        <li>Language-specific optimizations</li>
        <li>Premature benchmarks</li>
      </ul>

      <p>
        Those belong elsewhere.
      </p>

      <h2>Closing</h2>

      <p>
        Algorithms are not about cleverness.
      </p>

      <p>
        They are about <strong>honesty</strong>.
      </p>

      <p>
        Honesty about:
      </p>

      <ul>
        <li>growth</li>
        <li>repetition</li>
        <li>limits</li>
        <li>tradeoffs</li>
      </ul>

      <p>
        When cost is visible:
      </p>

      <ul>
        <li>decisions improve</li>
        <li>systems stabilize</li>
        <li>surprises disappear</li>
      </ul>

      <p>
        Hide cost, and it will surface at the worst time.
      </p>
    </ChapterPage>
  );
}
