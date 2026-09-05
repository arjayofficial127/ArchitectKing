import Image from 'next/image';
import Link from 'next/link';

import { SiteNavbar } from '@/components/shared/SiteNavbar';
import { CORE_CHAPTER_COUNT, introductionChapter } from '@/lib/bookChapters';
import { BookInstallation } from './BookInstallation';
import { ChapterNavigation, ChaptersProvider, ExploreChaptersButton } from './ChapterNavigation';
import styles from './book.module.css';

const navigationLinks = [
  { href: '/#selected-systems', label: 'Systems' },
  { href: '/#approach', label: 'Approach' },
  { href: '/architecture-review', label: 'Architecture Review' },
  { href: '/working-fundamentals', label: 'Working Fundamentals' },
] as const;

function PrismIcon() {
  return (
    <svg className={styles.panelIcon} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M16 5 28 26H4L16 5Z" />
      <path d="M16 5v21M16 26 4 26M16 12.5 9.2 26M16 12.5 22.8 26" opacity=".5" />
    </svg>
  );
}

function BlocksIcon() {
  return (
    <svg className={styles.panelIcon} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M16 3.5 24.5 8 16 12.5 7.5 8 16 3.5Z" />
      <path d="M7.5 8v9l8.5 4.5V12.5M24.5 8v9L16 21.5" />
      <path d="M11 20.5 5.5 23.5 11 26.5 16.5 23.5 11 20.5Z" opacity=".55" />
    </svg>
  );
}

export function WorkingFundamentalsPage({ fontClassName }: { fontClassName?: string }) {
  return (
    <div className={`${styles.page} ${fontClassName ?? ''}`}>
      <SiteNavbar />

      <main className={styles.shell}>
        <ChaptersProvider>
          <div className={styles.upper}>
            <div className={styles.mainColumn}>
              <section className={styles.hero} aria-labelledby="working-fundamentals-title">
                <div className={styles.heroBook}>
                  <BookInstallation />
                </div>

                <div className={styles.heroCopy}>
                  <p className={styles.eyebrow}>
                    <span>Working Fundamentals</span>
                    <span>Field Notes</span>
                  </p>

                  <h1 id="working-fundamentals-title" className={styles.title}>
                    Systems That Hold Under Pressure
                  </h1>

                  <p className={styles.lead}>
                    Notes on the principles I keep returning to when software gets complicated.
                  </p>

                  <p className={styles.support}>
                    This is what has helped me reason about systems, make tradeoffs, and leave code
                    easier for the next person to understand.
                  </p>

                  <div className={styles.actions}>
                    <Link href={introductionChapter.href} className={styles.primaryAction}>
                      Begin the Preface
                      <span aria-hidden="true">→</span>
                    </Link>
                    <ExploreChaptersButton className={styles.secondaryAction} />
                  </div>

                  <p className={styles.heroNote}>
                    <span className={styles.heroRule} aria-hidden="true" />
                    {CORE_CHAPTER_COUNT} chapters · read in any order
                  </p>
                </div>
              </section>

              <section className={styles.panels} aria-label="What this guide is about">
                <article className={styles.panel}>
                  <PrismIcon />
                  <p className={styles.panelKicker}>The Reality</p>
                  <h2 className={styles.panelTitle}>Where Systems Get Difficult</h2>
                  <ul className={styles.panelList}>
                    <li>Important assumptions stay unwritten</li>
                    <li>Responsibilities and ownership become unclear</li>
                    <li>Short-term decisions quietly make later changes harder</li>
                  </ul>
                </article>

                <article className={styles.panel}>
                  <BlocksIcon />
                  <p className={styles.panelKicker}>The Guide</p>
                  <h2 className={styles.panelTitle}>What the Guide Covers</h2>
                  <ul className={styles.panelList}>
                    <li>Inputs, state, data, boundaries, interfaces, and failure</li>
                    <li>How to notice complexity before it spreads through the system</li>
                    <li>How to make changes that the team can still reason about later</li>
                  </ul>
                </article>
              </section>
            </div>

            <div className={styles.railColumn}>
              <ChapterNavigation />
            </div>
          </div>
        </ChaptersProvider>

        <section className={styles.statement} aria-label="What this guide is for">
          <div className={styles.statementInner}>
            <p className={styles.statementText}>
              Understand systems.
              <br />
              Make better tradeoffs.
              <br />
              Leave code easier for the next person.
            </p>
            <p className={styles.statementAside} aria-hidden="true">
              Clear thinking
              <br />
              builds durable
              <br />
              things
            </p>
          </div>
          <span className={styles.statementMaterial} aria-hidden="true">
            <Image
              src="/architectking/stand.png"
              alt=""
              fill
              sizes="(max-width: 900px) 60vw, 520px"
              className={styles.statementMaterialArt}
            />
          </span>
        </section>

        <section className={styles.guidance} aria-labelledby="how-to-use-this">
          <div className={styles.stillLife}>
            <Image
              src="/architectking/working-fundamentals-paperback-back.png"
              alt="The printed Working Fundamentals guide, cover and spine"
              fill
              sizes="(max-width: 900px) 88vw, 440px"
              className={styles.stillLifeArt}
            />
          </div>

          <div className={styles.guidanceCopy}>
            <h2 id="how-to-use-this" className={styles.guidanceTitle}>
              How To Use This
              <span className={styles.guidanceRule} aria-hidden="true" />
            </h2>
            <p className={styles.guidanceLead}>
              Read it from the beginning or open the chapter closest to the problem in front of you.
              Use what is helpful and test it against the system you actually have.
            </p>
            <p className={styles.guidanceNote}>
              These are working notes, not rules. I expect them to keep improving as I learn.
            </p>

            <div className={styles.guidanceAction}>
              <p className={styles.guidanceActionText}>
                A practical guide for
                <br />
                building under change.
              </p>
              <Link href={introductionChapter.href} className={styles.primaryAction}>
                Start Reading
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <Link href="/" className={styles.footerBrand}>
            <strong>Arvin Jayson Castro</strong>
            <span>Software Architect &amp; Product Builder</span>
          </Link>

          <nav aria-label="Footer" className={styles.footerNav}>
            {navigationLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <p className={styles.footerNote}>Build thoughtfully. Leave it better.</p>
        </div>
      </footer>
    </div>
  );
}
