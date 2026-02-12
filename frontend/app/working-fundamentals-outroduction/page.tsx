import type { Metadata } from 'next';
import { ChapterPage } from '@/components/book/ChapterPage';

export const metadata: Metadata = {
  title: 'Outroduction — Working Fundamentals by Arvin Jayson Castro',
  description: 'What Comes After Fundamentals — Outroduction to Working Fundamentals',
};

export default function OutroductionPage() {
  return (
    <ChapterPage
      chapterNumber="PS"
      chapterTitle="Outroduction"
      chapterSubtitle="What Comes After Fundamentals"
      currentChapterHref="/working-fundamentals-outroduction"
      currentChapterLabel="Outroduction"
      prevChapter={{
        title: 'The Developer\'s Role',
        href: '/working-fundamentals-13-of-13-the-developers-role',
      }}
    >
      <p>
        If you reached this point, something important already happened.
      </p>

      <p>
        You stopped treating programming as a collection of tricks and started seeing it as a system.
      </p>

      <p>
        Not a framework. Not a language. Not a career ladder.
      </p>

      <p>
        A system of thinking.
      </p>

      <p>
        The chapters you just read were not meant to impress you. They were meant to <em>stabilize you</em>. To give you a mental ground that does not shift when tools change, trends cycle, or complexity increases.
      </p>

      <p>
        Most developers spend years accumulating knowledge. Very few spend time strengthening the structure that holds that knowledge.
      </p>

      <p>
        You now have that structure.
      </p>

      <h3>What you should notice now</h3>

      <p>
        Code should feel quieter.
      </p>

      <p>
        When you read unfamiliar systems, you should feel less lost—even if the details are new. You can recognize inputs, transformations, state, and failure paths without effort. You can sense when something is overcomplicated before you can fully explain why.
      </p>

      <p>
        That instinct is not intuition. It is alignment.
      </p>

      <h3>What this book did <em>not</em> do</h3>

      <p>
        It did not teach you how to write code faster. It did not give you shortcuts. It did not promise mastery.
      </p>

      <p>
        Those are not foundations. Those are accelerants.
      </p>

      <p>
        Foundations exist so acceleration does not break the system.
      </p>

      <h3>What comes next</h3>

      <p>
        From here, everything becomes legitimate:
      </p>

      <ul>
        <li>Languages</li>
        <li>Frameworks</li>
        <li>Architecture</li>
        <li>Performance</li>
        <li>Patterns</li>
        <li>Scale</li>
      </ul>

      <p>
        But now, when you learn them, they will <em>attach cleanly</em>.
      </p>

      <p>
        You won&apos;t memorize as much. You won&apos;t cargo-cult patterns. You won&apos;t fear refactors.
      </p>

      <p>
        You will recognize when a solution is correct—even if it is unfamiliar.
      </p>

      <h3>A final reminder</h3>

      <p>
        Good software is not clever. Good software is <strong>predictable</strong>.
      </p>

      <p>
        Predictability is not limitation. It is freedom.
      </p>

      <p>
        It allows teams to move without fear. It allows systems to grow without collapse. It allows you to trust your own work.
      </p>

      <p>
        This book was not an endpoint.
      </p>

      <p>
        It was the ground.
      </p>

      <p>
        Stand on it.
      </p>
    </ChapterPage>
  );
}
