import Link from 'next/link';
import styles from './bookAuthorityStrip.module.css';

export function BookAuthorityStrip() {
  return (
    <section className={styles.authorityStrip}>
      <div className={styles.authorityContent}>
        <div className={styles.bookCoverSmall}>
          <div className={styles.bookCoverPlaceholder}>
            <span className={styles.bookInitials}>WF</span>
          </div>
        </div>
        <div className={styles.authorityText}>
          <div className={styles.authorityLabel}>Author — Working Fundamentals</div>
          <p className={styles.authorityDescription}>
            A practical guide to building software that holds under pressure.
          </p>
          <div className={styles.authorityActions}>
            <Link href="/working-fundamentals-introduction" className={styles.primaryLink}>
              Read the Preface
            </Link>
            <Link href="/working-fundamentals-1-of-13-programming-fundamentals" className={styles.secondaryLink}>
              View Chapter 1
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
