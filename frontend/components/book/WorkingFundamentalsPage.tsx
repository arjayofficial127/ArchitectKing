'use client';

import Link from 'next/link';
import { BookCover } from './BookCover';
import { ChapterSidebar } from './ChapterSidebar';
import { BookConversionFooter } from './BookConversionFooter';
import { SiteNavbar } from '@/components/shared/SiteNavbar';
import styles from './book.module.css';

export function WorkingFundamentalsPage() {
  return (
    <div className={styles.page}>
      <SiteNavbar />

      <div className={styles.container}>
        {/* Main */}
        <main className={styles.main}>
          {/* Left: Book Cover */}
          <section className={styles.bookCover}>
            <BookCover />
            <Link
              href="/working-fundamentals-introduction"
              className={styles.startReading}
            >
              Begin the Preface
            </Link>
          </section>

          {/* Center: Content */}
          <section className={styles.content}>
            <h1 className={styles.contentTitle}>
              Systems That Hold Under Pressure
            </h1>
            <p className={styles.tagline}>
              Notes on the principles I keep returning to when software gets complicated.
            </p>
            <p className={styles.subtext}>
              This is what has helped me reason about systems, make tradeoffs, and leave code easier for the next person to understand.
            </p>

            <div className={styles.whyMatters}>
              <h2 className={styles.whyMattersTitle}>Where Systems Get Difficult</h2>
              <ul className={styles.whyMattersList}>
                <li>Important assumptions stay unwritten</li>
                <li>Responsibilities and ownership become unclear</li>
                <li>Short-term decisions quietly make later changes harder</li>
              </ul>
            </div>

            <div className={styles.valueBlock}>
              <h2 className={styles.whyMattersTitle}>What the Guide Covers</h2>
              <ul className={styles.whyMattersList}>
                <li>Inputs, state, data, boundaries, interfaces, and failure</li>
                <li>How to notice complexity before it spreads through the system</li>
                <li>How to make changes that the team can still reason about later</li>
              </ul>
            </div>

            <div className={styles.meta}>
              <div>
                <strong>Written By</strong>
                <br />
                Arvin Jayson Castro
              </div>
            </div>

            <div className={styles.connectsSection}>
              <h2 className={styles.connectsTitle}>How To Use This</h2>
              <p className={styles.connectsText}>
                Read it from the beginning or open the chapter closest to the problem in front of you. Use what is helpful and test it against the system you actually have.
              </p>
              <p className={styles.subtext}>
                These are working notes, not rules. I expect them to keep improving as I learn.
              </p>
            </div>
          </section>

          {/* Right: Chapter Sidebar */}
          <ChapterSidebar />
        </main>

          {/* Bridge Section */}
          {/* <section className={styles.bridgeSection}>
            <h2 className={styles.bridgeTitle}>How This Thinking Shows Up in Real Systems</h2>
            <p className={styles.bridgeText}>
              In my experience, these principles guide how I approach multi-tenant SaaS platforms,
              structure domain boundaries,
              and reduce long-term system fragility.
            </p>
          </section> */}

          {/* Conversion Footer */}
          {/* <BookConversionFooter /> */}

          {/* Close Loop */}
          {/* <div className={styles.closeLoop}>
            <p className={styles.closeLoopText}>
              These principles support how I deliver reliable, maintainable features within collaborative team environments.
            </p>
          </div> */}
      </div>
    </div>
  );
}
