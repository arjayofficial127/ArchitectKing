'use client';

import Link from 'next/link';
import { BookCover } from './BookCover';
import { ChapterSidebar } from './ChapterSidebar';
import { BookConversionFooter } from './BookConversionFooter';
import styles from './book.module.css';

export function WorkingFundamentalsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <Link href="/" className={styles.brand}>
            Arvin Jayson Castro
          </Link>
          <nav className={styles.nav}>
            <Link href="/working-fundamentals" className={styles.navLink}>
              Working Fundamentals
            </Link>
            <a href="#case-studies" className={styles.navLink}>
              Case Studies
            </a>
            <a href="#systems" className={styles.navLink}>
              Systems
            </a>
            <a href="#contact" className={styles.navLink}>
              Contact
            </a>
            <div className={styles.linkedin}>
              <a
                href="https://www.linkedin.com/in/arvin-jayson-castro-7458199a/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkedinLink}
              >
                linkedIn
              </a>
              <span className={styles.linkedinSubtext}>let&apos;s connect</span>
            </div>
          </nav>
        </header>

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
            <div className={styles.byline}>by ARVIN JAYSON CASTRO</div>
            <p className={styles.tagline}>
              A concise, practical guide to building software that lasts — patterns, checklists, and pragmatic examples.
            </p>

            <p className={styles.paragraph}>
              Software rarely fails suddenly — it decays through unnamed assumptions, unclear responsibilities, invisible state, and misplaced abstractions.
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

            {/* Credibility Signals */}
            <div className={styles.credibility}>
              <p className={styles.credibilityText}>
                <strong>Senior Software Architect</strong>
                <br />
                <span style={{ fontSize: '0.9em', color: '#666' }}>
                  Architecture-led delivery across product, platform, and teams.
                </span>
                <br />
                <span style={{ fontSize: '0.85em', color: '#888' }}>
                  15+ years experience • Multi-tenant SaaS builder • Production systems shipped
                </span>
              </p>
            </div>

            <div className={styles.meta}>
              <div>
                <strong>Author</strong>
                <br />
                Arvin Jayson Castro
              </div>
              <div>
                <strong>Role</strong>
                <br />
                Senior Software Architect
              </div>
              <div>
                <strong>Structure</strong>
                <br />
                13 core chapters + preface + postscript
              </div>
              <div>
                <strong>Release</strong>
                <br />
                Jan 2026
              </div>
              <div>
                <strong>Language</strong>
                <br />
                English
              </div>
              <div>
                <strong>Positioning</strong>
                <br />
                Practical systems thinking for builders
              </div>
            </div>

            <div className={styles.author}>
              <img
                alt="Arvin Jayson Castro"
                loading="lazy"
                width="44"
                height="44"
                className={styles.authorImage}
                src="https://media.licdn.com/dms/image/v2/D4D03AQFu3T0VxHF1Fg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1699015981714?e=1770854400&v=beta&t=K6EWG2XmIt5qYpvu_3nCLgHVSa3-DCc2k6fD6YX2Oow"
              />
              <div>
                <strong>About the Author</strong>
                <div>
                  Arvin Jayson Castro is a software architect focused on designing dependable systems that scale across teams.
                  He writes from hands-on experience in delivery, platform work, and engineering leadership—turning messy realities into clear boundaries, predictable execution, and maintainable software.
                </div>
              </div>
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
