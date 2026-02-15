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
      <div className={styles.container}>
        {/* Header - Reusable navbar */}
        <SiteNavbar />

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
            <h1 className={styles.contentTitle}>Working Fundamentals</h1>
            <p className={styles.tagline}>
              The internal blueprint behind the systems I ship in production.
            </p>
            <p className={styles.subtext}>
              Patterns. Ownership. Architecture that survives scale.
            </p>

            {/* Why This Matters Section */}
            <div className={styles.whyMatters}>
              <h2 className={styles.whyMattersTitle}>Why This Matters in Real Systems</h2>
              <ul className={styles.whyMattersList}>
                <li>Systems fail through hidden assumptions</li>
                <li>Complexity compounds silently</li>
                <li>Architecture determines velocity</li>
              </ul>
            </div>


            <div className={styles.meta}>
              <div>
                <strong>Built By</strong>
                <br />
                Arvin Jayson Castro
              </div>
              <div>
                <strong>Position</strong>
                <br />
                Senior Systems Engineer
              </div>
              <div>
                <strong>Focus</strong>
                <br />
                Production Systems & Multi-Tenant SaaS
              </div>
              <div>
                <strong>Operating Model</strong>
                <br />
                Used to build real production systems
              </div>
              <div>
                <strong>Language</strong>
                <br />
                English
              </div>
            </div>

            {/* How This Connects Section */}
            <div className={styles.connectsSection}>
              <h2 className={styles.connectsTitle}>How This Connects To My Work</h2>
              <p className={styles.connectsText}>
                This book reflects the patterns and invariants I use when building production systems for clients and teams.
              </p>
            </div>
          </section>

          {/* Right: Chapter Sidebar */}
          <ChapterSidebar />
        </main>

          {/* Bridge Section */}
          <section className={styles.bridgeSection}>
            <h2 className={styles.bridgeTitle}>How This Thinking Shows Up in Real Systems</h2>
            <p className={styles.bridgeText}>
              The ideas in Working Fundamentals are not theoretical.
              They guide how I design multi-tenant SaaS platforms,
              structure domain boundaries,
              and reduce long-term system fragility.
            </p>
          </section>

          {/* Conversion Footer */}
          <BookConversionFooter />

          {/* Close Loop */}
          <div className={styles.closeLoop}>
            <p className={styles.closeLoopText}>
              If you&apos;re building something that needs to hold,
              this is the lens I bring to it.
            </p>
          </div>
      </div>
    </div>
  );
}
