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
              Read the Preface
            </Link>
          </section>

          {/* Center: Content */}
          <section className={styles.content}>
            <h1 className={styles.contentTitle}>
              Systems That Hold Under Pressure
            </h1>
            <p className={styles.tagline}>
              Most systems don’t fail loudly - they fail slowly, then all at once.
            </p>
            <p className={styles.subtext}>
              These principles help you build systems that remain stable, scalable, and maintainable in real-world production environments.
            </p>

            <div className={styles.whyMatters}>
              <h2 className={styles.whyMattersTitle}>Where Systems Break</h2>
              <ul className={styles.whyMattersList}>
                <li>Systems don’t break because of bugs - they break because of wrong assumptions</li>
                <li>Complexity doesn’t explode - it accumulates quietly until it slows everything down</li>
                <li>Speed without structure always turns into friction later</li>
              </ul>
            </div>

            <div className={styles.valueBlock}>
              <h2 className={styles.whyMattersTitle}>What This Gives You</h2>
              <ul className={styles.whyMattersList}>
                <li>Clarity on how to design systems that scale without degrading</li>
                <li>A way to reduce hidden complexity before it becomes a problem</li>
                <li>A foundation for building production systems that actually hold</li>
              </ul>
            </div>

            <div className={styles.meta}>
              <div>
                <strong>Built By</strong>
                <br />
                Arvin Jayson Castro
              </div>
            </div>

            <div className={styles.connectsSection}>
              <h2 className={styles.connectsTitle}>How To Use This</h2>
              <p className={styles.connectsText}>
                Use these principles as a lens when designing, reviewing, or scaling systems. 
                They help identify weak points early, reduce long-term complexity, and guide better architectural decisions.
              </p>
              <p className={styles.subtext}>
                If you are building something that needs to scale and hold, this way of thinking will help you get there.
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
