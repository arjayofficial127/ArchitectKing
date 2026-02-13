import type { Metadata } from 'next';
import { ChapterPage } from '@/components/book/ChapterPage';

export const metadata: Metadata = {
  title: 'Chapter 11: Testing — Working Fundamentals by Arvin Jayson Castro',
  description: 'Confidence, not coverage — Chapter 11 of Working Fundamentals',
};

export default function Chapter11Page() {
  return (
    <ChapterPage
      chapterNumber="11"
      chapterTitle="Testing"
      chapterSubtitle="Confidence, not coverage"
      currentChapterHref="/working-fundamentals-11-of-13-testing"
      currentChapterLabel="chapter 11 of 13"
      prevChapter={{
        title: 'Errors & Failure',
        href: '/working-fundamentals-10-of-13-errors-and-failure',
      }}
      nextChapter={{
        title: 'Performance & Scale',
        href: '/working-fundamentals-12-of-13-performance-and-scale',
      }}
    >
      <h3>What this chapter is</h3>

      <p>
        This chapter is not about frameworks. It is not about coverage percentages. It is not about mocks, spies, or tools.
      </p>

      <p>
        This chapter is about <strong>trust</strong>.
      </p>

      <p>
        Testing exists so you can change a system <strong>without fear</strong>.
      </p>

      <h2>The core truth</h2>

      <p>
        Tests do not prove correctness.
      </p>

      <p>
        They prove <strong>stability of behavior</strong>.
      </p>

      <p>
        A test says:
      </p>

      <blockquote>
        &quot;This must remain true, even when everything else changes.&quot;
      </blockquote>

      <p>
        🧠 <strong>Mental Model</strong> Tests lock intent in place.
      </p>

      <h2>Why testing exists at all</h2>

      <p>
        Without tests:
      </p>

      <ul>
        <li>refactors hesitate</li>
        <li>fear grows</li>
        <li>changes slow</li>
        <li>systems calcify</li>
      </ul>

      <p>
        With tests:
      </p>

      <ul>
        <li>change becomes routine</li>
        <li>design improves</li>
        <li>confidence replaces caution</li>
      </ul>

      <p>
        Testing is not overhead. Fear is.
      </p>

      <h2>Tests protect behavior, not implementation</h2>

      <p>
        The biggest testing mistake is testing <em>how</em> something works.
      </p>

      <p>
        Tests should care about:
      </p>

      <ul>
        <li>inputs</li>
        <li>outputs</li>
        <li>side effects</li>
        <li>invariants</li>
        <li>failure behavior</li>
      </ul>

      <p>
        They should not care about:
      </p>

      <ul>
        <li>internal steps</li>
        <li>helper functions</li>
        <li>temporary structure</li>
      </ul>

      <p>
        🧠 <strong>Architect&apos;s Note</strong> Good tests survive refactors. Bad tests resist them.
      </p>

      <h2>Invariants are the highest-value tests</h2>

      <p>
        An invariant is something that must <strong>always</strong> be true.
      </p>

      <p>
        Examples:
      </p>

      <ul>
        <li>balances never go negative</li>
        <li>users cannot access forbidden data</li>
        <li>state transitions are valid</li>
        <li>identity never changes</li>
      </ul>

      <p>
        Invariants deserve tests first.
      </p>

      <p>
        🧠 <strong>Mental Model</strong> If an invariant breaks, the system is lying.
      </p>

      <h2>Boundaries deserve tests</h2>

      <p>
        Boundaries are where:
      </p>

      <ul>
        <li>assumptions meet reality</li>
        <li>failures occur</li>
        <li>misuse happens</li>
      </ul>

      <p>
        Test boundaries:
      </p>

      <ul>
        <li>input validation</li>
        <li>external interfaces</li>
        <li>persistence edges</li>
        <li>failure paths</li>
      </ul>

      <p>
        🧠 <strong>Perspective</strong> Most serious bugs enter through boundaries.
      </p>

      <h2>Failure paths matter more than success paths</h2>

      <p>
        Happy paths are easy. Failure paths are forgotten.
      </p>

      <p>
        Testing failure paths ensures:
      </p>

      <ul>
        <li>partial failures don&apos;t corrupt state</li>
        <li>retries are safe</li>
        <li>recovery is possible</li>
      </ul>

      <p>
        🧠 <strong>Architect&apos;s Note</strong> If failure isn&apos;t tested, it isn&apos;t designed.
      </p>

      <h2>Tests enable design feedback</h2>

      <p>
        Tests are not just safety nets. They are <strong>design mirrors</strong>.
      </p>

      <p>
        When tests are:
      </p>

      <ul>
        <li>hard to write</li>
        <li>fragile</li>
        <li>overly complex</li>
      </ul>

      <p>
        …the design is usually the problem.
      </p>

      <p>
        🧠 <strong>Mental Model</strong> Difficulty testing is a signal, not an inconvenience.
      </p>

      <h2>Unit vs integration is the wrong debate</h2>

      <p>
        The real questions are:
      </p>

      <ul>
        <li>What behavior am I protecting?</li>
        <li>What assumptions am I verifying?</li>
        <li>Where does failure hurt most?</li>
      </ul>

      <p>
        Use the smallest test that gives confidence. Use larger tests where boundaries demand it.
      </p>

      <p>
        🧠 <strong>Perspective</strong> Confidence, not purity, is the goal.
      </p>

      <h2>Tests and time</h2>

      <p>
        Systems change. Tests must change <strong>slower</strong>.
      </p>

      <p>
        If every small refactor breaks tests:
      </p>

      <ul>
        <li>tests are overfitted</li>
        <li>intent is unclear</li>
        <li>trust erodes</li>
      </ul>

      <p>
        Tests should anchor behavior, not freeze structure.
      </p>

      <h2>Testing and ownership</h2>

      <p>
        Tests encode responsibility.
      </p>

      <p>
        When a test fails, it should be obvious:
      </p>

      <ul>
        <li>what broke</li>
        <li>why it matters</li>
        <li>who owns the fix</li>
      </ul>

      <p>
        Ambiguous tests create blame. Clear tests create action.
      </p>

      <h2>Minimal practice (still no code)</h2>

      <p>
        <strong>Problem:</strong> &quot;A system processes payments and updates balances.&quot;
      </p>

      <p>
        Ask:
      </p>

      <ul>
        <li>What must always be true after processing?</li>
        <li>What must never happen?</li>
        <li>What happens if processing is retried?</li>
        <li>What failures are acceptable?</li>
      </ul>

      <p>
        Write tests for those answers — not the steps.
      </p>

      <h2>What beginners gain here</h2>

      <ul>
        <li>Confidence to change code</li>
        <li>Less fear of breaking things</li>
        <li>Better understanding of intent</li>
      </ul>

      <h2>What experienced developers recognize</h2>

      <ul>
        <li>Why refactors stall</li>
        <li>Why test suites feel brittle</li>
        <li>Why velocity drops over time</li>
      </ul>

      <p>
        Tests protected structure, not behavior.
      </p>

      <h2>What this chapter deliberately avoids</h2>

      <ul>
        <li>Testing libraries</li>
        <li>Tool comparisons</li>
        <li>Mocking strategies</li>
        <li>Coverage metrics</li>
      </ul>

      <p>
        Those are secondary.
      </p>

      <h2>Closing</h2>

      <p>
        Testing is not about perfection. It is about <strong>permission</strong>.
      </p>

      <p>
        Permission to change. Permission to refactor. Permission to improve.
      </p>

      <p>
        A system without tests demands caution. A system with good tests invites progress.
      </p>
    </ChapterPage>
  );
}
