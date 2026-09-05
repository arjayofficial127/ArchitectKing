import { Chapter } from '@/components/book/ChapterDropdown';

/**
 * Single source of truth for Working Fundamentals readings.
 *
 * `title` keeps the "Chapter N · " prefix the chapter-page dropdown already renders.
 * `shortTitle` and `subtitle` are what the overview page's contents rail shows, so
 * that rail does not need a second manifest of its own.
 */
export interface BookChapter extends Chapter {
  shortTitle: string;
  subtitle: string;
}

export const bookChapters: BookChapter[] = [
  {
    number: 'P',
    title: 'Introduction',
    shortTitle: 'Introduction',
    subtitle: 'On Building Software That Holds',
    href: '/working-fundamentals-introduction',
  },
  {
    number: '1',
    title: 'Chapter 1 · Programming Fundamentals',
    shortTitle: 'Programming Fundamentals',
    subtitle: 'The invariant shape of software',
    href: '/working-fundamentals-1-of-13-programming-fundamentals',
  },
  {
    number: '2',
    title: 'Chapter 2 · Data Structures',
    shortTitle: 'Data Structures',
    subtitle: 'How data shapes possibility',
    href: '/working-fundamentals-2-of-13-data-structures',
  },
  {
    number: '3',
    title: 'Chapter 3 · Algorithms & Complexity',
    shortTitle: 'Algorithms & Complexity',
    subtitle: 'Tradeoffs, not tricks',
    href: '/working-fundamentals-3-of-13-algorithms-and-complexity',
  },
  {
    number: '4',
    title: 'Chapter 4 · Control & Flow',
    shortTitle: 'Control & Flow',
    subtitle: 'Making execution visible',
    href: '/working-fundamentals-4-of-13-control-and-flow',
  },
  {
    number: '5',
    title: 'Chapter 5 · State & Change',
    shortTitle: 'State & Change',
    subtitle: 'What mutates, what must not',
    href: '/working-fundamentals-5-of-13-state-and-change',
  },
  {
    number: '6',
    title: 'Chapter 6 · Design Principles',
    shortTitle: 'Design Principles',
    subtitle: 'Boundaries, honesty, intent',
    href: '/working-fundamentals-6-of-13-design-principles',
  },
  {
    number: '7',
    title: 'Chapter 7 · Architecture',
    shortTitle: 'Architecture',
    subtitle: 'Systems that survive growth',
    href: '/working-fundamentals-7-of-13-architecture',
  },
  {
    number: '8',
    title: 'Chapter 8 · Persistence & Data Modeling',
    shortTitle: 'Persistence & Data Modeling',
    subtitle: 'Time, identity, durability',
    href: '/working-fundamentals-8-of-13-persistence-and-data-modeling',
  },
  {
    number: '9',
    title: 'Chapter 9 · Interfaces & APIs',
    shortTitle: 'Interfaces & APIs',
    subtitle: 'Contracts between humans and systems',
    href: '/working-fundamentals-9-of-13-interfaces-and-apis',
  },
  {
    number: '10',
    title: 'Chapter 10 · Errors & Failure',
    shortTitle: 'Errors & Failure',
    subtitle: 'Designing for broken assumptions',
    href: '/working-fundamentals-10-of-13-errors-and-failure',
  },
  {
    number: '11',
    title: 'Chapter 11 · Testing',
    shortTitle: 'Testing',
    subtitle: 'Confidence, not coverage',
    href: '/working-fundamentals-11-of-13-testing',
  },
  {
    number: '12',
    title: 'Chapter 12 · Performance & Scale',
    shortTitle: 'Performance & Scale',
    subtitle: 'When systems meet reality',
    href: '/working-fundamentals-12-of-13-performance-and-scale',
  },
  {
    number: '13',
    title: 'Chapter 13 · The Developer\'s Role',
    shortTitle: 'The Developer\'s Role',
    subtitle: 'Responsibility beyond code',
    href: '/working-fundamentals-13-of-13-the-developers-role',
  },
  {
    number: 'PS',
    title: 'Outroduction',
    shortTitle: 'Outroduction',
    subtitle: 'What Comes After Fundamentals',
    href: '/working-fundamentals-outroduction',
  },
];

/** The preface. Framing reading, not one of the thirteen. */
export const introductionChapter: BookChapter = bookChapters[0]!;

/** The closing reading. Framing reading, not one of the thirteen. */
export const outroductionChapter: BookChapter = bookChapters[bookChapters.length - 1]!;

/** The thirteen numbered chapters, in order. */
export const coreChapters: BookChapter[] = bookChapters.slice(1, -1);

export const CORE_CHAPTER_COUNT = coreChapters.length;
