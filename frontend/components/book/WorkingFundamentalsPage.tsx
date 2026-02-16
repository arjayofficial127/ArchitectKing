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
            <h1 className={styles.contentTitle}>How I Build Systems</h1>
            <p className={styles.tagline}>
              Practical engineering principles I rely on when shipping production systems.
            </p>
            <p className={styles.subtext}>
              These principles guide how I approach real-world feature delivery, system stability, and long-term maintainability.
            </p>

            {/* Why This Matters Section */}
            <div className={styles.whyMatters}>
              <h2 className={styles.whyMattersTitle}>Why This Matters in Real Systems</h2>
              <ul className={styles.whyMattersList}>
                <li>In my experience, systems fail through hidden assumptions</li>
                <li>I&apos;ve found that complexity compounds silently</li>
                <li>When building production systems, architecture determines velocity</li>
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
                These principles reflect the patterns and invariants I prioritize when building production systems within collaborative team environments.
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
              In my experience, these principles guide how I approach multi-tenant SaaS platforms,
              structure domain boundaries,
              and reduce long-term system fragility.
            </p>
          </section>

          {/* Conversion Footer */}
          <BookConversionFooter />

          {/* Close Loop */}
          <div className={styles.closeLoop}>
            <p className={styles.closeLoopText}>
              These principles support how I deliver reliable, maintainable features within collaborative team environments.
            </p>
          </div>
      </div>
    </div>
  );
}
