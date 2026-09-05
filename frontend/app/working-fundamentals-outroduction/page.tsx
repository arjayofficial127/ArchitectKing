import type { Metadata } from 'next';
import { ChapterPage } from '@/components/book/ChapterPage';

export const metadata: Metadata = {
  title: 'Outroduction - Working Fundamentals by Arvin Jayson Castro',
  description: 'What Comes After Fundamentals - Outroduction to Working Fundamentals',
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
        Thanks for reading this far.
      </p>

      <p>
        The goal of these chapters was simple: give you a few stable ideas to return to when the tools, code, or situation are unfamiliar.
      </p>

      <p>
        They are not a replacement for experience, context, or careful work. They are a way to organize the questions you ask.
      </p>

      <p>
        You may notice different things now when you read a system: where data enters, where state changes, who owns a decision, and how failure is handled.
      </p>

      <p>
        That is enough to begin.
      </p>

      <h3>What you should notice now</h3>

      <p>
        Unfamiliar code may feel a little less unfamiliar.
      </p>

      <p>
        You can look for inputs, transformations, state, boundaries, and failure paths before you know every implementation detail.
      </p>

      <p>
        With practice, those questions become easier to ask.
      </p>

      <h3>What this book did <em>not</em> do</h3>

      <p>
        It did not teach a particular language or framework, and it did not cover every part of building software.
      </p>

      <p>
        Those subjects still matter. They simply sit outside this guide.
      </p>

      <p>
        Use the chapters as a starting point, not as a complete answer.
      </p>

      <h3>What comes next</h3>

      <p>
        From here, keep learning the things the work requires:
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
        Try to connect each new technique to a real problem and a clear tradeoff.
      </p>

      <p>
        Keep the useful parts, question what does not fit, and revisit your decisions when the context changes.
      </p>

      <p>
        Good judgment grows from doing this repeatedly, not from getting every decision right the first time.
      </p>

      <h3>A final reminder</h3>

      <p>
        Good software does not need to be clever. It needs to be understandable enough for people to change it safely.
      </p>

      <p>
        Predictability helps.
      </p>

      <p>
        So do clear ownership, small feedback loops, honest tests, and people willing to ask simple questions.
      </p>

      <p>
        These notes are not finished.
      </p>

      <p>
        I expect them to change as I keep working and learning.
      </p>

      <p>
        I hope they help with something you are building.
      </p>
    </ChapterPage>
  );
}
