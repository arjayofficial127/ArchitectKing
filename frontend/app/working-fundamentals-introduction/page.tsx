import type { Metadata } from 'next';
import { ChapterPage } from '@/components/book/ChapterPage';

export const metadata: Metadata = {
  title: 'Introduction — Working Fundamentals by Arvin Jayson Castro',
  description: 'On Building Software That Holds — Introduction to Working Fundamentals',
};

export default function IntroductionPage() {
  return (
    <ChapterPage
      chapterNumber="P"
      chapterTitle="Introduction"
      chapterSubtitle="On Building Software That Holds"
      currentChapterHref="/working-fundamentals-introduction"
      currentChapterLabel="Introduction"
      nextChapter={{
        title: 'Programming Fundamentals',
        href: '/working-fundamentals-1-of-13-programming-fundamentals',
      }}
    >
      <p>
        This book is not a course. It is not a reference. It is not a collection of tricks.
      </p>

      <p>
        It is a <strong>record of orientation</strong>.
      </p>

      <p>
        Most people learn software by accumulation:
      </p>

      <ul>
        <li>more languages</li>
        <li>more frameworks</li>
        <li>more patterns</li>
        <li>more tools</li>
      </ul>

      <p>
        Accumulation creates capability. It does not guarantee stability.
      </p>

      <p>
        This book is written for a different purpose:
      </p>

      <blockquote>
        to explain what must remain <strong>true</strong> for software to hold together over time.
      </blockquote>

      <h2>Why this book exists</h2>

      <p>
        Software rarely fails suddenly.
      </p>

      <p>
        It decays.
      </p>

      <p>
        It decays through:
      </p>

      <ul>
        <li>unnamed assumptions</li>
        <li>unclear responsibilities</li>
        <li>invisible state</li>
        <li>misplaced abstractions</li>
        <li>containers used without thought</li>
      </ul>

      <p>
        These failures are not dramatic. They are quiet.
      </p>

      <p>
        This book exists to name those quiet forces.
      </p>

      <h2>Who this book is for</h2>

      <p>
        This book is for:
      </p>

      <ul>
        <li>beginners who want ground, not tricks</li>
        <li>experienced developers who feel systems growing heavy</li>
        <li>architects who care about longevity more than novelty</li>
      </ul>

      <p>
        If you are looking for:
      </p>

      <ul>
        <li>syntax</li>
        <li>shortcuts</li>
        <li>&quot;best practices of the year&quot;</li>
      </ul>

      <p>
        This book will disappoint you.
      </p>

      <p>
        If you are looking for:
      </p>

      <ul>
        <li>clarity</li>
        <li>stability</li>
        <li>reasoning you can reuse for decades</li>
      </ul>

      <p>
        Then you are in the right place.
      </p>

      <h2>How to read this book</h2>

      <p>
        Read slowly.
      </p>

      <p>
        Do not skim for techniques. Read for <strong>shape</strong>.
      </p>

      <p>
        If something feels obvious, keep reading. Obvious truths are often the most neglected.
      </p>

      <p>
        If something feels familiar, pause. Recognition is a sign of alignment.
      </p>

      <h2>The promise</h2>

      <p>
        This book will not make you faster immediately. It will make you <strong>harder to break</strong>.
      </p>

      <p>
        And in software, that matters more.
      </p>
    </ChapterPage>
  );
}
