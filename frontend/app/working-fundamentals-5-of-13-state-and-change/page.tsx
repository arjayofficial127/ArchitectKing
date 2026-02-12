import type { Metadata } from 'next';
import { ChapterPage } from '@/components/book/ChapterPage';

export const metadata: Metadata = {
  title: 'Chapter 5: State & Change — Working Fundamentals by Arvin Jayson Castro',
  description: 'Why history complicates everything — Chapter 5 of Working Fundamentals',
};

export default function Chapter5Page() {
  return (
    <ChapterPage
      chapterNumber="5"
      chapterTitle="State & Change"
      chapterSubtitle="Why history complicates everything"
      currentChapterHref="/working-fundamentals-5-of-13-state-and-change"
      currentChapterLabel="chapter 5 of 13"
      prevChapter={{
        title: 'Control & Flow',
        href: '/working-fundamentals-4-of-13-control-and-flow',
      }}
      nextChapter={{
        title: 'Design Principles',
        href: '/working-fundamentals-6-of-13-design-principles',
      }}
    >
      <h3>What this chapter is</h3>

      <p>
        This chapter is not about variables. It is not about mutability keywords. It is not about functional versus object-oriented debates.
      </p>

      <p>
        This chapter is about <strong>memory</strong>.
      </p>

      <p>
        State is memory inside a system. And memory always changes how reasoning works.
      </p>

      <h2>The core truth</h2>

      <p>
        State means <strong>the past is still present</strong>.
      </p>

      <p>
        When state exists:
      </p>

      <ul>
        <li>behavior depends on history</li>
        <li>order matters</li>
        <li>repetition is no longer safe</li>
      </ul>

      <p>
        Two identical inputs can produce different outputs because something happened before.
      </p>

      <p>
        🧠 <strong>Mental Model</strong> State introduces time into logic.
      </p>

      <h2>Why state is unavoidable</h2>

      <p>
        Every real system has state.
      </p>

      <ul>
        <li>user sessions</li>
        <li>stored data</li>
        <li>configuration</li>
        <li>caches</li>
        <li>counters</li>
        <li>flags</li>
      </ul>

      <p>
        Trying to eliminate state entirely is fantasy.
      </p>

      <p>
        The goal is not to remove state. The goal is to <strong>contain it</strong>.
      </p>

      <h2>The real danger is not mutability</h2>

      <p>
        Most discussions focus on:
      </p>

      <blockquote>
        &quot;Is this mutable or immutable?&quot;
      </blockquote>

      <p>
        That question is secondary.
      </p>

      <p>
        The primary question is:
      </p>

      <blockquote>
        <strong>Who owns this state?</strong>
      </blockquote>

      <p>
        Unowned state is dangerous state.
      </p>

      <h2>Ownership defines safety</h2>

      <p>
        When state has clear ownership:
      </p>

      <ul>
        <li>changes are intentional</li>
        <li>responsibilities are visible</li>
        <li>bugs localize</li>
      </ul>

      <p>
        When state has unclear ownership:
      </p>

      <ul>
        <li>multiple actors modify it</li>
        <li>invariants erode</li>
        <li>fixes collide</li>
      </ul>

      <p>
        🧠 <strong>Architect&apos;s Note</strong> State should have one owner, even if many can read it.
      </p>

      <h2>Hidden state is the worst kind</h2>

      <p>
        Hidden state includes:
      </p>

      <ul>
        <li>global variables</li>
        <li>shared singletons</li>
        <li>implicit environment dependencies</li>
        <li>static caches</li>
        <li>values modified outside visible flow</li>
      </ul>

      <p>
        Hidden state creates <strong>action at a distance</strong>.
      </p>

      <p>
        You change something here. Something breaks there.
      </p>

      <p>
        ⚠️ <strong>Common Drift</strong> When bugs feel &quot;impossible,&quot; hidden state is usually involved.
      </p>

      <h2>Temporal coupling</h2>

      <p>
        State creates <strong>temporal coupling</strong>:
      </p>

      <ul>
        <li>this must happen before that</li>
        <li>this must not happen twice</li>
        <li>this must happen only once</li>
      </ul>

      <p>
        Temporal coupling is fragile because:
      </p>

      <ul>
        <li>time is hard to see</li>
        <li>time is hard to test</li>
        <li>time is hard to control</li>
      </ul>

      <p>
        🧠 <strong>Mental Model</strong> If order matters, order must be enforced — not assumed.
      </p>

      <h2>Reentrancy reveals state problems</h2>

      <p>
        A powerful test of state clarity is this question:
      </p>

      <blockquote>
        &quot;What happens if this runs twice?&quot;
      </blockquote>

      <p>
        Or:
      </p>

      <blockquote>
        &quot;What happens if this runs again before it finishes?&quot;
      </blockquote>

      <p>
        If the answer is unclear, state is leaking.
      </p>

      <h2>State vs data</h2>

      <p>
        Not all data is state.
      </p>

      <ul>
        <li>Data describes reality.</li>
        <li>State describes <strong>change over time</strong>.</li>
      </ul>

      <p>
        Confusing the two causes:
      </p>

      <ul>
        <li>over-mutability</li>
        <li>defensive copying</li>
        <li>unnecessary resets</li>
      </ul>

      <p>
        🧠 <strong>Perspective</strong> Stable data should stay stable. Only true state should change.
      </p>

      <h2>Local state vs shared state</h2>

      <p>
        Local state:
      </p>

      <ul>
        <li>easier to reason about</li>
        <li>easier to reset</li>
        <li>easier to test</li>
      </ul>

      <p>
        Shared state:
      </p>

      <ul>
        <li>harder to reason about</li>
        <li>harder to control</li>
        <li>harder to debug</li>
      </ul>

      <p>
        Shared state is sometimes necessary. It should always be <strong>explicit</strong>.
      </p>

      <h2>State and failure</h2>

      <p>
        Failures interacting with state are dangerous.
      </p>

      <p>
        Questions every stateful operation must answer:
      </p>

      <ul>
        <li>what happens if this fails halfway?</li>
        <li>what is left changed?</li>
        <li>can it be retried safely?</li>
      </ul>

      <p>
        Ignoring these questions creates:
      </p>

      <ul>
        <li>partial updates</li>
        <li>corruption</li>
        <li>irreversible damage</li>
      </ul>

      <p>
        🧠 <strong>Architect&apos;s Note</strong> State changes must be atomic or recoverable.
      </p>

      <h2>State accumulation and drift</h2>

      <p>
        Over time, systems accumulate state:
      </p>

      <ul>
        <li>flags added &quot;temporarily&quot;</li>
        <li>caches layered on caches</li>
        <li>compatibility hacks preserved forever</li>
      </ul>

      <p>
        Each addition feels small. Together, they create inertia.
      </p>

      <p>
        ⚠️ <strong>Common Drift</strong> Most legacy systems are not complex — they are over-remembering.
      </p>

      <h2>Minimal practice (still no code)</h2>

      <p>
        <strong>Problem:</strong> &quot;A function updates a counter, saves a record, and sends a notification.&quot;
      </p>

      <p>
        Ask:
      </p>

      <ul>
        <li>What state changes?</li>
        <li>Who owns each change?</li>
        <li>What happens if notification fails?</li>
        <li>Can this be retried safely?</li>
      </ul>

      <p>
        If these answers are vague, the design is incomplete.
      </p>

      <h2>What beginners gain here</h2>

      <ul>
        <li>Understanding why bugs appear &quot;random&quot;</li>
        <li>Awareness of hidden dependencies</li>
        <li>Respect for order and ownership</li>
      </ul>

      <h2>What experienced developers recognize</h2>

      <ul>
        <li>Why some systems resist refactoring</li>
        <li>Why concurrency introduces chaos</li>
        <li>Why fixes create new problems</li>
      </ul>

      <p>
        State was unmanaged.
      </p>

      <h2>What this chapter deliberately avoids</h2>

      <ul>
        <li>Language-level mutability debates</li>
        <li>Framework state management patterns</li>
        <li>Reactive buzzwords</li>
        <li>Implementation details</li>
      </ul>

      <p>
        Those come after clarity.
      </p>

      <h2>Closing</h2>

      <p>
        State is not evil. But it is <strong>expensive</strong>.
      </p>

      <p>
        It costs:
      </p>

      <ul>
        <li>reasoning</li>
        <li>predictability</li>
        <li>safety</li>
      </ul>

      <p>
        Well-contained state makes systems reliable. Leaking state makes systems hostile.
      </p>

      <p>
        Design state as if time were your enemy — because eventually, it is.
      </p>
    </ChapterPage>
  );
}
