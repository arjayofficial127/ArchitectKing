'use client';

import Link from 'next/link';
import { ChapterDropdown } from './ChapterDropdown';
import { bookChapters } from '@/lib/bookChapters';
import styles from './chapterPage.module.css';

interface ChapterPageProps {
  chapterNumber: string;
  chapterTitle: string;
  chapterSubtitle: string;
  currentChapterHref: string;
  currentChapterLabel: string;
  prevChapter?: { title: string; href: string } | null;
  nextChapter?: { title: string; href: string } | null;
  children?: React.ReactNode;
}

export function ChapterPage({
  chapterNumber,
  chapterTitle,
  chapterSubtitle,
  currentChapterHref,
  currentChapterLabel,
  prevChapter,
  nextChapter,
  children,
}: ChapterPageProps) {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Link href="/" className={styles.brand}>
            Arvin Jayson Castro
          </Link>
          <nav className={styles.nav}>
            <Link href="/working-fundamentals" className={styles.navLink}>
              Working Fundamentals
            </Link>
            <a href="/#case-studies" className={styles.navLink}>
              Case Studies
            </a>
            <a href="/#systems" className={styles.navLink}>
              Systems
            </a>
            <a href="/#contact" className={styles.navLink}>
              Contact
            </a>
          </nav>
        </header>

        <main className={styles.main}>
          <article className={styles.chapterContent}>
            <header className={styles.chapterHeader}>
              <div className={styles.bookTitle}>Working Fundamentals</div>
              <ChapterDropdown
                currentChapterHref={currentChapterHref}
                currentChapterLabel={currentChapterLabel}
                chapters={bookChapters}
              />
              <h1 className={styles.chapterTitle}>{chapterTitle}</h1>
              <p className={styles.chapterSubtitle}>{chapterSubtitle}</p>
            </header>

            <div className={styles.chapterBody}>
              {children || (
                <div>
                  <p>
                    This chapter content is being prepared. The full content will be available soon.
                  </p>
                  <p>
                    <Link href="/working-fundamentals" className={styles.inlineLink}>
                      Return to Working Fundamentals
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </article>
        </main>

        <nav className={styles.chapterNav}>
          {prevChapter ? (
            <Link href={prevChapter.href} className={styles.navLink}>
              <span className={styles.navArrow}>←</span>
              <span>Previous: {prevChapter.title}</span>
            </Link>
          ) : (
            <Link href="/working-fundamentals" className={styles.navLink}>
              <span className={styles.navArrow}>←</span>
              <span>Back to Working Fundamentals</span>
            </Link>
          )}
          {nextChapter ? (
            <Link href={nextChapter.href} className={styles.navLink}>
              <span>Next: {nextChapter.title}</span>
              <span className={styles.navArrow}>→</span>
            </Link>
          ) : null}
        </nav>
      </div>
    </div>
  );
}
