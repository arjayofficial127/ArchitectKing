import type { Metadata } from 'next';
import { ChapterPage } from '@/components/book/ChapterPage';

export const metadata: Metadata = {
  title: 'Chapter 1: Programming Fundamentals — Working Fundamentals by Arvin Jayson Castro',
  description: 'A system of thinking for predictable software — Chapter 1 of Working Fundamentals',
};

export default function Chapter1Page() {
  return (
    <ChapterPage
      chapterNumber="Chapter 1 of 13"
      chapterTitle="Programming Fundamentals"
      chapterSubtitle="A system of thinking for predictable software"
      currentChapterHref="/working-fundamentals-1-of-13-programming-fundamentals"
      currentChapterLabel="chapter 1 of 13"
      prevChapter={{
        title: 'Introduction',
        href: '/working-fundamentals-introduction',
      }}
      nextChapter={{
        title: 'Data Structures',
        href: '/working-fundamentals-2-of-13-data-structures',
      }}
    >
      <h3>What this chapter is</h3>

      <p>
        This chapter is <strong>not</strong> a language tutorial. It is <strong>not</strong> about syntax. It is <strong>not</strong> about memorizing rules.
      </p>

      <p>
        This chapter defines the <strong>minimum thinking system</strong> required to make software behave predictably.
      </p>

      <p>
        If you understand this chapter, you can learn any programming language faster. If you skip it, every abstraction you learn later will feel fragile.
      </p>

      <h2>The core truth</h2>

      <p>
        Every program—regardless of language, framework, or scale—reduces to the same shape:
      </p>

      <p>
        <strong>Input → Transform → Output</strong>
      </p>

      <p>
        This is not a metaphor. This is the invariant.
      </p>

      <p>
        Languages change. Frameworks change. Paradigms evolve.
      </p>

      <p>
        This shape does not.
      </p>

      <h2>Why fundamentals matter (beyond beginners)</h2>

      <p>
        Most bugs are not caused by advanced concepts. They are caused by <strong>unclear fundamentals</strong> hidden under abstraction.
      </p>

      <p>
        Unclear fundamentals lead to:
      </p>

      <ul>
        <li>unpredictable behavior</li>
        <li>defensive code</li>
        <li>excessive logging</li>
        <li>unnecessary complexity</li>
        <li>fragile refactors</li>
      </ul>

      <p>
        Strong fundamentals produce:
      </p>

      <ul>
        <li>calm code</li>
        <li>obvious flow</li>
        <li>fewer surprises</li>
        <li>easier collaboration</li>
        <li>long-term stability</li>
      </ul>

      <p>
        This chapter is about <strong>preventing drift</strong>.
      </p>

      <h2>The six fundamentals (the complete set)</h2>

      <p>
        Everything you write in code belongs to <strong>one of these six</strong>. If you cannot name which one, the system is already weakening.
      </p>

      <h3>1. Data</h3>

      <p>
        <strong>What exists</strong>
      </p>

      <p>
        Data is the raw material of a program. Numbers, text, flags, collections, objects.
      </p>

      <p>
        Data does nothing by itself. It only exists.
      </p>

      <p>
        🧠 <strong>Mental Model</strong> Data is passive. Behavior comes later.
      </p>

      <p>
        ⚠️ <strong>Common Drift</strong> When developers confuse data with behavior, logic spreads uncontrollably.
      </p>

      <h3>2. Variables</h3>

      <p>
        <strong>What names data</strong>
      </p>

      <p>
        Variables do not store values. They <strong>point to values</strong>.
      </p>

      <p>
        Naming is not cosmetic—it is structural.
      </p>

      <p>
        A good variable name:
      </p>

      <ul>
        <li>communicates intent</li>
        <li>limits misuse</li>
        <li>reduces comments</li>
      </ul>

      <p>
        🧠 <strong>Perspective</strong> Poor naming is the earliest form of technical debt.
      </p>

      <h3>3. Control Flow</h3>

      <p>
        <strong>What decides what happens</strong>
      </p>

      <p>
        Control flow determines:
      </p>

      <ul>
        <li>when something runs</li>
        <li>if something runs</li>
        <li>how often it runs</li>
        <li>when it stops</li>
      </ul>

      <p>
        Conditionals and loops are not logic. They are <strong>traffic signals</strong>.
      </p>

      <p>
        🧠 <strong>Mental Model</strong> Control flow answers: <em>&quot;What path does execution take?&quot;</em>
      </p>

      <p>
        ⚠️ <strong>Common Drift</strong> Nested conditionals are a symptom of unclear rules.
      </p>

      <h3>4. Functions</h3>

      <p>
        <strong>What transforms input into output</strong>
      </p>

      <p>
        A function is a <strong>boundary</strong>.
      </p>

      <p>
        It should answer four questions clearly:
      </p>

      <ol>
        <li>What does it take in?</li>
        <li>What does it return?</li>
        <li>What rules does it apply?</li>
        <li>What can go wrong?</li>
      </ol>

      <p>
        If a function cannot be explained in one sentence, it is doing too much.
      </p>

      <p>
        🧠 <strong>Architect&apos;s Note</strong> Good systems are collections of small, honest transformations.
      </p>

      <h3>5. State & Mutability</h3>

      <p>
        <strong>What changes over time</strong>
      </p>

      <p>
        State is data that can change. Mutability is <em>how</em> it changes.
      </p>

      <p>
        Not all data should be mutable. Not all changes should be allowed.
      </p>

      <p>
        🧠 <strong>Mental Model</strong> The more things that can change, the harder the system is to reason about.
      </p>

      <p>
        ⚠️ <strong>Common Drift</strong> Hidden state is responsible for most &quot;impossible&quot; bugs.
      </p>

      <h3>6. Errors</h3>

      <p>
        <strong>What happens when assumptions break</strong>
      </p>

      <p>
        Errors are not edge cases. They are <strong>alternate paths</strong>.
      </p>

      <p>
        Every system operates on assumptions:
      </p>

      <ul>
        <li>input format</li>
        <li>timing</li>
        <li>availability</li>
        <li>correctness</li>
      </ul>

      <p>
        When assumptions fail, errors appear.
      </p>

      <p>
        🧠 <strong>Perspective</strong> Unhandled errors are silent contracts you didn&apos;t realize you made.
      </p>

      <h2>How these fundamentals work together</h2>

      <p>
        A stable program follows this rhythm:
      </p>

      <ol>
        <li>Accept input (data)</li>
        <li>Name it (variables)</li>
        <li>Choose a path (control flow)</li>
        <li>Transform it (functions)</li>
        <li>Update what must change (state)</li>
        <li>Handle what can fail (errors)</li>
        <li>Produce output</li>
      </ol>

      <p>
        When systems fail, one of these steps is unclear.
      </p>

      <h2>Minimal practice (no code yet)</h2>

      <p>
        <strong>Problem (in plain language):</strong> &quot;Given a list of numbers, return only the even ones, then double them.&quot;
      </p>

      <p>
        Before writing code, answer:
      </p>

      <ul>
        <li>What is the input?</li>
        <li>What is the output?</li>
        <li>Where is the decision?</li>
        <li>Where is the transformation?</li>
        <li>What could go wrong?</li>
      </ul>

      <p>
        If you can answer these clearly, implementation is mechanical.
      </p>

      <p>
        🧠 <strong>Architect&apos;s Note</strong> If you cannot describe behavior in words, code will not save you.
      </p>

      <h2>What beginners gain here</h2>

      <ul>
        <li>A stable mental foundation</li>
        <li>Confidence reading unfamiliar code</li>
        <li>Reduced dependence on memorization</li>
      </ul>

      <h2>What experienced developers recognize</h2>

      <ul>
        <li>Why certain bugs keep returning</li>
        <li>Why refactors feel risky</li>
        <li>Why some codebases feel heavy despite &quot;best practices&quot;</li>
      </ul>

      <p>
        This chapter gives names to intuitions you already had.
      </p>

      <h2>What this chapter deliberately avoids</h2>

      <ul>
        <li>Language syntax</li>
        <li>Framework examples</li>
        <li>Tooling</li>
        <li>Patterns</li>
        <li>Optimization</li>
      </ul>

      <p>
        Those come later.
      </p>

      <p>
        Foundations come first.
      </p>

      <h2>Closing</h2>

      <p>
        Programming fundamentals are not about skill level. They are about <strong>predictability</strong>.
      </p>

      <p>
        Predictable systems scale. Predictable systems survive refactors. Predictable systems can be trusted.
      </p>

      <p>
        This chapter is not mastery. It is the ground.
      </p>
    </ChapterPage>
  );
}
