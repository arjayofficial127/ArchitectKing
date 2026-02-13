import type { Metadata } from 'next';
import { ChapterPage } from '@/components/book/ChapterPage';

export const metadata: Metadata = {
  title: 'Chapter 10: Errors & Failure — Working Fundamentals by Arvin Jayson Castro',
  description: 'Designing for broken assumptions — Chapter 10 of Working Fundamentals',
};

export default function Chapter10Page() {
  return (
    <ChapterPage
      chapterNumber="10"
      chapterTitle="Errors & Failure"
      chapterSubtitle="Designing for broken assumptions"
      currentChapterHref="/working-fundamentals-10-of-13-errors-and-failure"
      currentChapterLabel="chapter 10 of 13"
      prevChapter={{
        title: 'Interfaces & APIs',
        href: '/working-fundamentals-9-of-13-interfaces-and-apis',
      }}
      nextChapter={{
        title: 'Testing',
        href: '/working-fundamentals-11-of-13-testing',
      }}
    >
      <h3>What this chapter is</h3>

      <p>
        This chapter is not about exceptions. It is not about error codes. It is not about retries, timeouts, or logs.
      </p>

      <p>
        This chapter is about <strong>truth</strong>.
      </p>

      <p>
        Errors exist because reality did not match your assumptions.
      </p>

      <h2>The core truth</h2>

      <p>
        Failure is not an accident.
      </p>

      <p>
        Failure is a <strong>revealed assumption</strong>.
      </p>

      <p>
        When a system fails, it is saying:
      </p>

      <blockquote>
        &quot;I expected the world to behave differently.&quot;
      </blockquote>

      <p>
        Ignoring that message does not restore correctness.
      </p>

      <p>
        🧠 <strong>Mental Model</strong> Every error is an assumption becoming visible.
      </p>

      <h2>Why failure must be designed</h2>

      <p>
        Most systems treat failure as an afterthought.
      </p>

      <p>
        They design for:
      </p>

      <ul>
        <li>the happy path</li>
        <li>correct inputs</li>
        <li>perfect timing</li>
        <li>reliable dependencies</li>
      </ul>

      <p>
        Reality does not agree.
      </p>

      <p>
        Failure that is not designed becomes:
      </p>

      <ul>
        <li>partial updates</li>
        <li>silent corruption</li>
        <li>cascading outages</li>
        <li>data inconsistency</li>
      </ul>

      <p>
        🧠 <strong>Architect&apos;s Note</strong> The most dangerous failures are the quiet ones.
      </p>

      <h2>Failure is a first-class path</h2>

      <p>
        Failure is not an interruption to control flow. It is <strong>an alternate path</strong>.
      </p>

      <p>
        Every failure path must answer:
      </p>

      <ul>
        <li>what stops?</li>
        <li>what continues?</li>
        <li>what must be undone?</li>
        <li>what must never happen?</li>
      </ul>

      <p>
        If these answers are unclear, the design is incomplete.
      </p>

      <h2>Partial failure is worse than total failure</h2>

      <p>
        A total failure is visible. A partial failure lies.
      </p>

      <p>
        Examples of partial failure:
      </p>

      <ul>
        <li>data written but not acknowledged</li>
        <li>side effects triggered before validation</li>
        <li>retries applied after irreversible changes</li>
      </ul>

      <p>
        🧠 <strong>Perspective</strong> It is safer to fail loudly than to succeed incorrectly.
      </p>

      <h2>Errors and state are inseparable</h2>

      <p>
        Failures interacting with state are dangerous.
      </p>

      <p>
        Questions you must answer:
      </p>

      <ul>
        <li>did state change?</li>
        <li>was it complete?</li>
        <li>can this be retried safely?</li>
        <li>can it be rolled back?</li>
      </ul>

      <p>
        If state cannot be restored or recovered, the system accumulates damage.
      </p>

      <p>
        🧠 <strong>Architect&apos;s Note</strong> Failure + state without recovery is corruption.
      </p>

      <h2>Retrying is a design decision</h2>

      <p>
        Retries feel safe. They are not.
      </p>

      <p>
        Blind retries can:
      </p>

      <ul>
        <li>duplicate work</li>
        <li>amplify load</li>
        <li>worsen outages</li>
      </ul>

      <p>
        Retries must be:
      </p>

      <ul>
        <li>bounded</li>
        <li>idempotent</li>
        <li>intentional</li>
      </ul>

      <p>
        🧠 <strong>Mental Model</strong> A retry is a promise that repeating is safe.
      </p>

      <h2>Error handling is part of the contract</h2>

      <p>
        Errors are not implementation details.
      </p>

      <p>
        They are part of:
      </p>

      <ul>
        <li>interfaces</li>
        <li>expectations</li>
        <li>system behavior</li>
      </ul>

      <p>
        Consumers will build logic around:
      </p>

      <ul>
        <li>how you fail</li>
        <li>how often you fail</li>
        <li>how you signal failure</li>
      </ul>

      <p>
        Inconsistent error behavior creates fragile integrations.
      </p>

      <h2>Failure domains matter</h2>

      <p>
        Failures should be <strong>contained</strong>.
      </p>

      <p>
        A failure in one area should not:
      </p>

      <ul>
        <li>bring down unrelated parts</li>
        <li>corrupt shared state</li>
        <li>force global recovery</li>
      </ul>

      <p>
        This is a structural problem, not a logging problem.
      </p>

      <p>
        🧠 <strong>Architect&apos;s Note</strong> A system without failure boundaries will eventually fail everywhere.
      </p>

      <h2>When failure is expected</h2>

      <p>
        Some failures are normal:
      </p>

      <ul>
        <li>invalid input</li>
        <li>missing data</li>
        <li>unavailable dependencies</li>
        <li>timeouts</li>
      </ul>

      <p>
        Treating expected failures as exceptional:
      </p>

      <ul>
        <li>clutters logs</li>
        <li>hides real issues</li>
        <li>increases noise</li>
      </ul>

      <p>
        🧠 <strong>Perspective</strong> If failure is expected, design for it explicitly.
      </p>

      <h2>Observability without panic</h2>

      <p>
        Errors should be:
      </p>

      <ul>
        <li>visible</li>
        <li>attributable</li>
        <li>actionable</li>
      </ul>

      <p>
        They should not:
      </p>

      <ul>
        <li>overwhelm operators</li>
        <li>trigger unnecessary escalation</li>
        <li>obscure root causes</li>
      </ul>

      <p>
        Silence is dangerous. Noise is also dangerous.
      </p>

      <h2>Failure teaches structure</h2>

      <p>
        Failures reveal:
      </p>

      <ul>
        <li>hidden coupling</li>
        <li>missing boundaries</li>
        <li>fragile assumptions</li>
      </ul>

      <p>
        Well-designed systems learn from failure. Poorly designed ones repeat it.
      </p>

      <h2>Minimal practice (still no code)</h2>

      <p>
        <strong>Problem:</strong> &quot;A process validates input, writes to storage, and notifies an external system. The notification fails.&quot;
      </p>

      <p>
        Ask:
      </p>

      <ul>
        <li>What state has already changed?</li>
        <li>Is retry safe?</li>
        <li>What must be undone?</li>
        <li>What should the system report?</li>
      </ul>

      <p>
        If the answer is &quot;it depends,&quot; the design is incomplete.
      </p>

      <h2>What beginners gain here</h2>

      <ul>
        <li>Respect for failure</li>
        <li>Fewer destructive shortcuts</li>
        <li>Safer mental models</li>
      </ul>

      <h2>What experienced developers recognize</h2>

      <ul>
        <li>Why outages cascade</li>
        <li>Why retries worsen incidents</li>
        <li>Why some bugs never fully disappear</li>
      </ul>

      <p>
        Failures were ignored.
      </p>

      <h2>What this chapter deliberately avoids</h2>

      <ul>
        <li>Error-handling libraries</li>
        <li>Framework-specific patterns</li>
        <li>Logging tools</li>
        <li>Incident playbooks</li>
      </ul>

      <p>
        Those come after design.
      </p>

      <h2>Closing</h2>

      <p>
        Failure is not the enemy.
      </p>

      <p>
        Unexamined failure is.
      </p>

      <p>
        Design systems that:
      </p>

      <ul>
        <li>expect failure</li>
        <li>expose assumptions</li>
        <li>recover deliberately</li>
      </ul>

      <p>
        A system that fails honestly is safer than one that pretends to succeed.
      </p>
    </ChapterPage>
  );
}
