import type { Metadata } from 'next';
import { ChapterPage } from '@/components/book/ChapterPage';

export const metadata: Metadata = {
  title: 'Introduction - Working Fundamentals by Arvin Jayson Castro',
  description: 'On Building Software That Holds - Introduction to Working Fundamentals',
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
        This is not intended to be a complete programming course or reference.
      </p>

      <p>
        It is a set of notes on how I orient myself when software becomes difficult to reason about.
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
        Learning more tools creates capability, but it does not automatically make a system easier to understand.
      </p>

      <p>
        I wrote this guide for a narrower purpose:
      </p>

      <blockquote>
        to describe some of the conditions that help software remain understandable as it changes.
      </blockquote>

      <h2>Why this book exists</h2>

      <p>
        Software often becomes difficult a little at a time.
      </p>

      <p>
        It often becomes difficult through:
      </p>

      <ul>
        <li>unnamed assumptions</li>
        <li>unclear responsibilities</li>
        <li>invisible state</li>
        <li>misplaced abstractions</li>
        <li>containers used without thought</li>
      </ul>

      <p>
        These changes are easy to miss while everyone is busy delivering the next thing.
      </p>

      <p>
        The chapters try to name them and offer a useful way to think about them.
      </p>

      <h2>Who this book is for</h2>

      <p>
        This book is for:
      </p>

      <ul>
        <li>beginners who want a dependable way to reason about code</li>
        <li>experienced developers who feel systems growing heavy</li>
        <li>architects who want systems to remain understandable after the design work is done</li>
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
        This may not be the guide you need.
      </p>

      <p>
        If you are looking for:
      </p>

      <ul>
        <li>clarity</li>
        <li>stability</li>
        <li>reasoning that stays useful when tools change</li>
      </ul>

      <p>
        I hope you find something useful here.
      </p>

      <h2>How to read this book</h2>

      <p>
        Read it in whatever way helps.
      </p>

      <p>
        You can go chapter by chapter or start with the subject closest to your current problem.
      </p>

      <p>
        Some ideas may feel obvious. Those are often the ones worth checking against the work in front of you.
      </p>

      <p>
        I do not expect every principle to fit every system. Use your judgment, keep the context, and change your mind when the evidence asks you to.
      </p>
    </ChapterPage>
  );
}
