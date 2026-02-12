import type { Metadata } from 'next';
import { ChapterPage } from '@/components/book/ChapterPage';

export const metadata: Metadata = {
  title: 'Chapter 4: Control & Flow — Working Fundamentals by Arvin Jayson Castro',
  description: 'Execution is a path, not a script — Chapter 4 of Working Fundamentals',
};

export default function Chapter4Page() {
  return (
    <ChapterPage
      chapterNumber="4"
      chapterTitle="Control & Flow"
      chapterSubtitle="Execution is a path, not a script"
      currentChapterHref="/working-fundamentals-4-of-13-control-and-flow"
      currentChapterLabel="chapter 4 of 13"
      prevChapter={{
        title: 'Algorithms & Complexity',
        href: '/working-fundamentals-3-of-13-algorithms-and-complexity',
      }}
      nextChapter={{
        title: 'State & Change',
        href: '/working-fundamentals-5-of-13-state-and-change',
      }}
    >
      <h3>What this chapter is</h3>

      <p>
        This chapter is not about syntax. It is not about if, else, switch, or loops.
      </p>

      <p>
        This chapter is about <strong>movement</strong>.
      </p>

      <p>
        Most developers think of code as text that runs top to bottom. Systems do not behave that way.
      </p>

      <p>
        Systems behave as <strong>paths through decisions</strong>.
      </p>

      <p>
        If you misunderstand flow, you misunderstand behavior.
      </p>

      <h2>The core truth</h2>

      <p>
        Programs do not execute lines. They <strong>travel through possibilities</strong>.
      </p>

      <p>
        Every conditional creates a fork. Every loop creates repetition. Every return creates an exit.
      </p>

      <p>
        Execution is not linear. It is <strong>navigational</strong>.
      </p>

      <p>
        🧠 <strong>Mental Model</strong> Code is a map. Control flow is the allowed terrain.
      </p>

      <h2>Why control flow is where bugs hide</h2>

      <p>
        Logic errors are obvious. Flow errors are subtle.
      </p>

      <p>
        Flow bugs include:
      </p>

      <ul>
        <li>code that runs too often</li>
        <li>code that runs too late</li>
        <li>code that should stop but continues</li>
        <li>code that silently skips important steps</li>
      </ul>

      <p>
        These bugs survive reviews because the code <em>looks</em> correct.
      </p>

      <p>
        ⚠️ <strong>Common Drift</strong> When developers read code line-by-line instead of path-by-path, flow bugs slip through.
      </p>

      <h2>Conditionals define reality</h2>

      <p>
        A conditional is not a question. It is a <strong>gate</strong>.
      </p>

      <p>
        It decides:
      </p>

      <ul>
        <li>what is allowed to happen</li>
        <li>what is impossible to happen</li>
      </ul>

      <p>
        Every if encodes an assumption about reality.
      </p>

      <p>
        🧠 <strong>Perspective</strong> If you cannot explain <em>why</em> a branch exists, it probably should not.
      </p>

      <h2>The danger of implicit paths</h2>

      <p>
        Some paths are obvious. Others are implied.
      </p>

      <p>
        Examples:
      </p>

      <ul>
        <li>default branches</li>
        <li>fallthrough behavior</li>
        <li>early exits that bypass cleanup</li>
        <li>conditions that overlap</li>
      </ul>

      <p>
        These paths are not written explicitly, but they <strong>exist at runtime</strong>.
      </p>

      <p>
        🧠 <strong>Architect&apos;s Note</strong> Unwritten paths are still real paths.
      </p>

      <h2>Nesting is a symptom, not a style choice</h2>

      <p>
        Deep nesting is rarely intentional.
      </p>

      <p>
        It usually means:
      </p>

      <ul>
        <li>rules were added one by one</li>
        <li>edge cases accumulated</li>
        <li>boundaries were never drawn</li>
      </ul>

      <p>
        Each nested level increases:
      </p>

      <ul>
        <li>cognitive load</li>
        <li>path count</li>
        <li>chance of error</li>
      </ul>

      <p>
        🧠 <strong>Mental Model</strong> Every nested block multiplies possible execution paths.
      </p>

      <h2>Flattening flow restores reasoning</h2>

      <p>
        Flat code is not minimal code. It is <strong>honest code</strong>.
      </p>

      <p>
        Techniques that flatten flow:
      </p>

      <ul>
        <li>early returns</li>
        <li>guard clauses</li>
        <li>named functions</li>
        <li>extracted decisions</li>
      </ul>

      <p>
        Flattening does not remove logic. It <strong>reveals it</strong>.
      </p>

      <p>
        ⚠️ <strong>Common Drift</strong> Code that avoids early returns often hides invalid states deep inside.
      </p>

      <h2>Loops are promises</h2>

      <p>
        A loop promises repetition.
      </p>

      <p>
        That promise must answer:
      </p>

      <ul>
        <li>what repeats?</li>
        <li>why does it repeat?</li>
        <li>what guarantees it stops?</li>
      </ul>

      <p>
        A loop without a clear exit condition is not unfinished — it is dangerous.
      </p>

      <p>
        🧠 <strong>Perspective</strong> Termination is a design requirement, not an implementation detail.
      </p>

      <h2>Flow and time</h2>

      <p>
        Control flow is tightly coupled to time.
      </p>

      <p>
        Some paths assume:
      </p>

      <ul>
        <li>order</li>
        <li>timing</li>
        <li>exclusivity</li>
        <li>non-interruption</li>
      </ul>

      <p>
        When concurrency or asynchrony enters, those assumptions break.
      </p>

      <p>
        🧠 <strong>Architect&apos;s Note</strong> If order matters, enforce it. If it cannot be enforced, redesign.
      </p>

      <h2>Error paths are control paths</h2>

      <p>
        Errors are not interruptions. They are <strong>alternate flows</strong>.
      </p>

      <p>
        Every error path must answer:
      </p>

      <ul>
        <li>where does execution go next?</li>
        <li>what is skipped?</li>
        <li>what must still happen?</li>
      </ul>

      <p>
        Ignoring error flow creates:
      </p>

      <ul>
        <li>leaked resources</li>
        <li>partial updates</li>
        <li>corrupted state</li>
      </ul>

      <p>
        🧠 <strong>Mental Model</strong> Failure is a first-class path, not an exception to thinking.
      </p>

      <h2>Control flow and responsibility</h2>

      <p>
        Good flow makes responsibility obvious.
      </p>

      <p>
        You should be able to point at a block of code and say:
      </p>

      <ul>
        <li>this validates</li>
        <li>this decides</li>
        <li>this transforms</li>
        <li>this exits</li>
      </ul>

      <p>
        When responsibility is mixed, flow becomes tangled.
      </p>

      <h2>Minimal practice (still no code)</h2>

      <p>
        <strong>Problem:</strong> &quot;A process validates input, saves data, sends a notification, and logs activity. If validation fails, nothing else should happen.&quot;
      </p>

      <p>
        Answer in words:
      </p>

      <ul>
        <li>Where does execution stop?</li>
        <li>Which paths are illegal?</li>
        <li>What must never be partially executed?</li>
      </ul>

      <p>
        If you cannot describe the flow cleanly, code will not fix it.
      </p>

      <h2>What beginners gain here</h2>

      <ul>
        <li>A new way to read code</li>
        <li>Fewer &quot;why did this run?&quot; moments</li>
        <li>Confidence tracing behavior</li>
      </ul>

      <h2>What experienced developers recognize</h2>

      <ul>
        <li>Why certain bugs feel impossible</li>
        <li>Why fixes break unrelated features</li>
        <li>Why systems feel fragile under change</li>
      </ul>

      <p>
        Flow was unclear.
      </p>

      <h2>What this chapter deliberately avoids</h2>

      <ul>
        <li>Language-specific constructs</li>
        <li>Control-flow tricks</li>
        <li>Clever branching</li>
        <li>Performance tuning</li>
      </ul>

      <p>
        Those belong after clarity.
      </p>

      <h2>Closing</h2>

      <p>
        Control flow is where intent becomes behavior.
      </p>

      <p>
        Clear flow:
      </p>

      <ul>
        <li>reduces bugs</li>
        <li>simplifies reasoning</li>
        <li>stabilizes change</li>
      </ul>

      <p>
        Unclear flow:
      </p>

      <ul>
        <li>hides assumptions</li>
        <li>multiplies paths</li>
        <li>creates surprises</li>
      </ul>

      <p>
        Do not write code that merely <em>works</em>. Write code whose <strong>paths you can defend</strong>.
      </p>
    </ChapterPage>
  );
}
