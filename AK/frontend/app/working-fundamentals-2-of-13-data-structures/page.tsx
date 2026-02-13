import type { Metadata } from 'next';
import { ChapterPage } from '@/components/book/ChapterPage';

export const metadata: Metadata = {
  title: 'Chapter 2: Data Structures — Working Fundamentals by Arvin Jayson Castro',
  description: 'Containers shape behavior — Chapter 2 of Working Fundamentals',
};

export default function Chapter2Page() {
  return (
    <ChapterPage
      chapterNumber="2"
      chapterTitle="Data Structures"
      chapterSubtitle="Containers shape behavior"
      currentChapterHref="/working-fundamentals-2-of-13-data-structures"
      currentChapterLabel="chapter 2 of 13"
      prevChapter={{
        title: 'Programming Fundamentals',
        href: '/working-fundamentals-1-of-13-programming-fundamentals',
      }}
      nextChapter={{
        title: 'Algorithms & Complexity',
        href: '/working-fundamentals-3-of-13-algorithms-and-complexity',
      }}
    >
      <h3>What this chapter is</h3>

      <p>
        This chapter is not a catalog of structures. It is not a comparison table. It is not about memorizing when to use what.
      </p>

      <p>
        This chapter explains <strong>why containers matter</strong>.
      </p>

      <p>
        Data structures are not implementation details. They are <strong>behavioral decisions</strong>.
      </p>

      <h2>The core truth</h2>

      <p>
        A data structure is not just a way to store data.
      </p>

      <p>
        It is a <strong>promise</strong> about:
      </p>

      <ul>
        <li>access</li>
        <li>ordering</li>
        <li>duplication</li>
        <li>absence</li>
        <li>cost</li>
      </ul>

      <p>
        When you choose a data structure, you choose behavior—whether you intended to or not.
      </p>

      <h2>Containers are constraints</h2>

      <p>
        Every container answers questions implicitly:
      </p>

      <ul>
        <li>Can there be duplicates?</li>
        <li>Does order matter?</li>
        <li>Can items be missing?</li>
        <li>Is lookup fast or slow?</li>
        <li>Is mutation expected?</li>
      </ul>

      <p>
        You do not answer these questions with comments. You answer them with <strong>structure</strong>.
      </p>

      <p>
        🧠 <strong>Mental Model</strong> A data structure encodes rules without asking permission.
      </p>

      <h2>Why systems drift here</h2>

      <p>
        Most developers choose data structures by habit.
      </p>

      <ul>
        <li>Arrays because they are familiar</li>
        <li>Objects because they are convenient</li>
        <li>Lists because they are flexible</li>
      </ul>

      <p>
        Habit is not reasoning.
      </p>

      <p>
        ⚠️ <strong>Common Drift</strong> When containers are chosen casually, rules migrate into code.
      </p>

      <p>
        That is how conditionals multiply.
      </p>

      <h2>Structure before algorithm</h2>

      <p>
        Many developers jump from data directly to logic.
      </p>

      <p>
        That is backwards.
      </p>

      <p>
        First ask:
      </p>

      <ul>
        <li>What relationships exist?</li>
        <li>What must be unique?</li>
        <li>What must be ordered?</li>
        <li>What must be fast?</li>
        <li>What must be stable?</li>
      </ul>

      <p>
        Only after the container is correct does logic become simple.
      </p>

      <p>
        🧠 <strong>Architect&apos;s Note</strong> Good algorithms often emerge automatically from correct structure.
      </p>

      <h2>The cost dimension</h2>

      <p>
        Every data structure trades something.
      </p>

      <ul>
        <li>Time vs space</li>
        <li>Simplicity vs flexibility</li>
        <li>Read performance vs write performance</li>
      </ul>

      <p>
        Ignoring cost does not remove it. It only makes it unpredictable.
      </p>

      <p>
        🧠 <strong>Perspective</strong> Performance problems are often structural, not computational.
      </p>

      <h2>Mutability and containment</h2>

      <p>
        Some containers invite mutation. Some resist it.
      </p>

      <p>
        This matters.
      </p>

      <p>
        A mutable container:
      </p>

      <ul>
        <li>spreads responsibility</li>
        <li>increases coupling</li>
        <li>hides state changes</li>
      </ul>

      <p>
        An immutable container:
      </p>

      <ul>
        <li>constrains behavior</li>
        <li>localizes change</li>
        <li>clarifies ownership</li>
      </ul>

      <p>
        Neither is &quot;better.&quot; But one must be <strong>chosen deliberately</strong>.
      </p>

      <h2>When structure lies</h2>

      <p>
        A dangerous moment in any system is when:
      </p>

      <ul>
        <li>the container allows something</li>
        <li>but the domain forbids it</li>
      </ul>

      <p>
        Example:
      </p>

      <ul>
        <li>duplicates allowed when uniqueness is required</li>
        <li>ordering implied where none exists</li>
        <li>absence treated as presence</li>
      </ul>

      <p>
        This mismatch forces logic to compensate.
      </p>

      <p>
        🧠 <strong>Common Drift</strong> Validation code is often an apology for poor structure.
      </p>

      <h2>Minimal practice (again, no code)</h2>

      <p>
        <strong>Problem:</strong> &quot;You are storing registered users. Each user must be unique by email. Order does not matter. Lookups are frequent.&quot;
      </p>

      <p>
        Before choosing anything, answer:
      </p>

      <ul>
        <li>What must never happen?</li>
        <li>What must be fast?</li>
        <li>What must be impossible by design?</li>
      </ul>

      <p>
        If your container allows violation, the system will eventually violate it.
      </p>

      <h2>What beginners gain here</h2>

      <ul>
        <li>Relief from guessing</li>
        <li>A reason containers exist</li>
        <li>Fewer &quot;why is this hard?&quot; moments</li>
      </ul>

      <h2>What experienced developers recognize</h2>

      <ul>
        <li>Why certain bugs cluster</li>
        <li>Why validation grows endlessly</li>
        <li>Why performance fixes feel reactive</li>
      </ul>

      <p>
        The container was wrong.
      </p>

      <h2>What this chapter deliberately avoids</h2>

      <ul>
        <li>Specific language structures</li>
        <li>Library comparisons</li>
        <li>Premature optimization</li>
        <li>Academic taxonomy</li>
      </ul>

      <p>
        Those are secondary.
      </p>

      <h2>Closing</h2>

      <p>
        Data structures are not about data.
      </p>

      <p>
        They are about <strong>rules made physical</strong>.
      </p>

      <p>
        When rules live in structure:
      </p>

      <ul>
        <li>code simplifies</li>
        <li>errors decrease</li>
        <li>systems calm down</li>
      </ul>

      <p>
        When rules live in logic:
      </p>

      <ul>
        <li>complexity accumulates</li>
        <li>behavior surprises</li>
        <li>systems drift</li>
      </ul>

      <p>
        Choose containers carefully.
      </p>

      <p>
        They speak even when your code is silent.
      </p>
    </ChapterPage>
  );
}
