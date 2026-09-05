'use client';

import Link from 'next/link';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import {
  BookChapter,
  CORE_CHAPTER_COUNT,
  coreChapters,
  introductionChapter,
  outroductionChapter,
} from '@/lib/bookChapters';
import styles from './chapterNavigation.module.css';

const HEADING_ID = 'working-fundamentals-contents';

interface DisclosureValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DisclosureContext = createContext<DisclosureValue | null>(null);

/**
 * Shares one disclosure state between the hero's "Explore the Chapters" control and
 * the contents rail, so there is a single chapter list in the accessibility tree.
 */
export function ChaptersProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, setOpen }), [open]);

  return <DisclosureContext.Provider value={value}>{children}</DisclosureContext.Provider>;
}

function useDisclosure(): DisclosureValue {
  const value = useContext(DisclosureContext);
  if (!value) throw new Error('Chapter disclosure components must be inside ChaptersProvider');
  return value;
}

/**
 * Secondary hero action. On wide screens the rail is already visible, so this moves
 * attention to it; on narrow screens it expands the disclosure first.
 */
export function ExploreChaptersButton({ className }: { className?: string }) {
  const { setOpen } = useDisclosure();

  const reveal = useCallback(() => {
    setOpen(true);
    // Let the panel render before moving focus to its heading.
    requestAnimationFrame(() => {
      const heading = document.getElementById(HEADING_ID);
      if (!heading) return;
      heading.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      heading.focus({ preventScroll: true });
    });
  }, [setOpen]);

  return (
    <button type="button" onClick={reveal} className={className} aria-controls={HEADING_ID}>
      Explore the Chapters
    </button>
  );
}

function padded(chapter: BookChapter): string {
  const value = Number(chapter.number);
  return Number.isNaN(value) ? chapter.number : String(value).padStart(2, '0');
}

function ChapterRow({ chapter }: { chapter: BookChapter }) {
  return (
    <li className={styles.item}>
      <Link href={chapter.href} className={styles.row}>
        <span className={styles.num} aria-hidden="true">{padded(chapter)}</span>
        <span className={styles.rowText}>
          <span className={styles.rowTitle}>{chapter.shortTitle}</span>
          <span className={styles.rowSub}>{chapter.subtitle}</span>
        </span>
      </Link>
    </li>
  );
}

export function ChapterNavigation() {
  const { open, setOpen } = useDisclosure();

  return (
    <nav className={styles.rail} aria-labelledby={HEADING_ID}>
      <div className={styles.head}>
        <h2 id={HEADING_ID} tabIndex={-1} className={styles.headTitle}>
          Contents
        </h2>
        <p className={styles.headCount}>{CORE_CHAPTER_COUNT} core chapters</p>
      </div>

      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span>{open ? 'Hide chapters' : 'Show all chapters'}</span>
        <span className={styles.toggleIcon} aria-hidden="true" data-open={open}>
          ▾
        </span>
      </button>

      <div className={styles.panel} data-open={open}>
        <div className={styles.scroller}>
          <p className={styles.group} aria-hidden="true">Start here</p>
          <ul className={styles.list} aria-label="Start here">
            <ChapterRow chapter={introductionChapter} />
          </ul>

          <p className={styles.group} aria-hidden="true">Core chapters</p>
          <ul className={styles.list} aria-label="Core chapters">
            {coreChapters.map((chapter) => (
              <ChapterRow key={chapter.href} chapter={chapter} />
            ))}
          </ul>

          <p className={styles.group} aria-hidden="true">Carry forward</p>
          <ul className={styles.list} aria-label="Carry forward">
            <ChapterRow chapter={outroductionChapter} />
          </ul>
        </div>
      </div>
    </nav>
  );
}
