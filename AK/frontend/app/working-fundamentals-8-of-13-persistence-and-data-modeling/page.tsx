import type { Metadata } from 'next';
import { ChapterPage } from '@/components/book/ChapterPage';

export const metadata: Metadata = {
  title: 'Chapter 8: Persistence & Data Modeling — Working Fundamentals by Arvin Jayson Castro',
  description: 'Time, identity, durability — Chapter 8 of Working Fundamentals',
};

export default function Chapter8Page() {
  return (
    <ChapterPage
      chapterNumber="8"
      chapterTitle="Persistence & Data Modeling"
      chapterSubtitle="Time, identity, durability"
      currentChapterHref="/working-fundamentals-8-of-13-persistence-and-data-modeling"
      currentChapterLabel="chapter 8 of 13"
      prevChapter={{
        title: 'Architecture',
        href: '/working-fundamentals-7-of-13-architecture',
      }}
      nextChapter={{
        title: 'Interfaces & APIs',
        href: '/working-fundamentals-9-of-13-interfaces-and-apis',
      }}
    >
      <h3>What this chapter is</h3>

      <p>
        This chapter is not about databases. It is not about SQL versus NoSQL. It is not about ORMs or query syntax.
      </p>

      <p>
        This chapter is about <strong>commitment</strong>.
      </p>

      <p>
        Persistence is the moment software stops being temporary.
      </p>

      <h2>The core truth</h2>

      <p>
        Code forgets. Data remembers.
      </p>

      <p>
        Once data is written, it becomes part of history — and history is hard to change.
      </p>

      <p>
        🧠 <strong>Mental Model</strong> Persistence turns decisions into obligations.
      </p>

      <h2>Why persistence is different from everything else</h2>

      <p>
        You can rewrite code. You can refactor logic. You can replace services.
      </p>

      <p>
        You cannot easily erase:
      </p>

      <ul>
        <li>stored records</li>
        <li>past assumptions</li>
        <li>historical mistakes</li>
      </ul>

      <p>
        Persistence multiplies the cost of being wrong.
      </p>

      <p>
        That is why this chapter exists.
      </p>

      <h2>Data models are statements about reality</h2>

      <p>
        A data model is not storage.
      </p>

      <p>
        It is a <strong>claim</strong> about the world:
      </p>

      <ul>
        <li>what exists</li>
        <li>what is allowed</li>
        <li>what is optional</li>
        <li>what must be unique</li>
        <li>what can change</li>
      </ul>

      <p>
        If your model lies, the system lies with it.
      </p>

      <p>
        🧠 <strong>Architect&apos;s Note</strong> Most bugs in persistent systems are truth mismatches, not code errors.
      </p>

      <h2>The danger of modeling too much</h2>

      <p>
        It is tempting to store everything:
      </p>

      <ul>
        <li>flags &quot;just in case&quot;</li>
        <li>snapshots &quot;for safety&quot;</li>
        <li>derived values &quot;for convenience&quot;</li>
      </ul>

      <p>
        Every stored field becomes:
      </p>

      <ul>
        <li>a liability</li>
        <li>a maintenance cost</li>
        <li>a migration risk</li>
      </ul>

      <p>
        🧠 <strong>Perspective</strong> If you are not willing to support a field forever, do not store it.
      </p>

      <h2>The danger of modeling too little</h2>

      <p>
        Under-modeling is equally dangerous.
      </p>

      <p>
        When the model does not express rules:
      </p>

      <ul>
        <li>validation moves into code</li>
        <li>invariants scatter</li>
        <li>bugs repeat</li>
      </ul>

      <p>
        The database becomes permissive. The application becomes defensive.
      </p>

      <p>
        ⚠️ <strong>Common Drift</strong> Validation logic often exists because the model is silent.
      </p>

      <h2>Identity, not structure</h2>

      <p>
        One of the most important modeling questions is:
      </p>

      <blockquote>
        <em>What gives this thing its identity?</em>
      </blockquote>

      <p>
        Identity answers:
      </p>

      <ul>
        <li>what makes two records the same</li>
        <li>what must never change</li>
        <li>what links history together</li>
      </ul>

      <p>
        Mistaken identity leads to:
      </p>

      <ul>
        <li>duplication</li>
        <li>orphaned records</li>
        <li>impossible merges</li>
      </ul>

      <p>
        🧠 <strong>Mental Model</strong> Identity should be stable, boring, and unquestioned.
      </p>

      <h2>Facts, state, and events</h2>

      <p>
        Not all stored data is the same.
      </p>

      <ul>
        <li><strong>Facts</strong> describe what <em>is true</em></li>
        <li><strong>State</strong> describes what <em>is true now</em></li>
        <li><strong>Events</strong> describe what <em>happened</em></li>
      </ul>

      <p>
        Confusing these leads to:
      </p>

      <ul>
        <li>overwritten history</li>
        <li>lost meaning</li>
        <li>irrecoverable mistakes</li>
      </ul>

      <p>
        🧠 <strong>Architect&apos;s Note</strong> You cannot reconstruct events from state reliably.
      </p>

      <h2>Normalization is about truth, not performance</h2>

      <p>
        Normalization exists to:
      </p>

      <ul>
        <li>prevent contradiction</li>
        <li>protect integrity</li>
        <li>preserve meaning</li>
      </ul>

      <p>
        Denormalization exists to:
      </p>

      <ul>
        <li>trade truth for speed</li>
        <li>duplicate intentionally</li>
        <li>optimize reads</li>
      </ul>

      <p>
        Both are valid.
      </p>

      <p>
        What matters is knowing <strong>which truth you are trading</strong>.
      </p>

      <h2>Migrations are architectural events</h2>

      <p>
        A migration is not a technical task. It is a <strong>public apology</strong> for a past assumption.
      </p>

      <p>
        Migrations:
      </p>

      <ul>
        <li>take time</li>
        <li>require coordination</li>
        <li>risk data loss</li>
        <li>affect trust</li>
      </ul>

      <p>
        🧠 <strong>Perspective</strong> Every migration is a reminder that persistence is permanent.
      </p>

      <h2>Backward compatibility is mercy</h2>

      <p>
        Old data will outlive:
      </p>

      <ul>
        <li>code</li>
        <li>teams</li>
        <li>documentation</li>
        <li>intentions</li>
      </ul>

      <p>
        Your system must treat old data kindly.
      </p>

      <p>
        If old data breaks new code, the design was incomplete.
      </p>

      <h2>Persistence and failure</h2>

      <p>
        Failures involving persistence are the most dangerous.
      </p>

      <p>
        Questions every persistent operation must answer:
      </p>

      <ul>
        <li>what happens if this fails halfway?</li>
        <li>what is left written?</li>
        <li>can this be retried safely?</li>
        <li>can it be rolled back?</li>
      </ul>

      <p>
        Ignoring these creates <strong>corruption</strong>, not just bugs.
      </p>

      <p>
        🧠 <strong>Architect&apos;s Note</strong> Partial writes are more dangerous than total failure.
      </p>

      <h2>Persistence leaks into architecture</h2>

      <p>
        Once data is stored:
      </p>

      <ul>
        <li>APIs must respect it</li>
        <li>migrations must honor it</li>
        <li>performance must account for it</li>
      </ul>

      <p>
        Persistence shapes the entire system.
      </p>

      <p>
        This is why data modeling is architecture.
      </p>

      <h2>Minimal practice (still no code)</h2>

      <p>
        <strong>Problem:</strong> &quot;You store user profiles, preferences, and activity history.&quot;
      </p>

      <p>
        Ask:
      </p>

      <ul>
        <li>Which parts are facts?</li>
        <li>Which parts are state?</li>
        <li>Which parts are events?</li>
        <li>Which parts must never be changed?</li>
        <li>Which parts can be recomputed?</li>
      </ul>

      <p>
        If the answers blur, redesign the model.
      </p>

      <h2>What beginners gain here</h2>

      <ul>
        <li>Respect for data</li>
        <li>Fewer destructive shortcuts</li>
        <li>Awareness of long-term impact</li>
      </ul>

      <h2>What experienced developers recognize</h2>

      <ul>
        <li>Why migrations hurt</li>
        <li>Why legacy data is terrifying</li>
        <li>Why &quot;simple schema changes&quot; aren&apos;t simple</li>
      </ul>

      <p>
        The model carried hidden assumptions.
      </p>

      <h2>What this chapter deliberately avoids</h2>

      <ul>
        <li>Database engines</li>
        <li>Index tuning</li>
        <li>ORM mechanics</li>
        <li>Query optimization</li>
      </ul>

      <p>
        Those come after truth.
      </p>

      <h2>Closing</h2>

      <p>
        Persistence is memory with consequences.
      </p>

      <p>
        Store only what you are willing to defend. Model only what you understand deeply.
      </p>

      <p>
        Good data models age gracefully. Bad ones haunt systems forever.
      </p>
    </ChapterPage>
  );
}
