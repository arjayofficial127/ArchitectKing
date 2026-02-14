import Link from 'next/link';
import styles from './bookConversionFooter.module.css';

export function BookConversionFooter() {
  return (
    <section className={styles.conversionFooter}>
      <div className={styles.conversionContent}>
        <h2 className={styles.conversionTitle}>Want to build systems that hold?</h2>
        <p className={styles.conversionSubtitle}>
          Let&apos;s discuss how architecture-first thinking can accelerate your product development.
        </p>
        <div className={styles.conversionActions}>
          <a
            href="mailto:arjayofficial127@gmail.com?subject=Architecture%20Discussion&body=Hi%20Arvin%2C%0A%0AI'd%20like%20to%20discuss%20system%20architecture%20for%20[your%20project%2Frole].%0A%0ABest%2C"
            className={styles.primaryCTA}
          >
            Discuss Your System Architecture
          </a>
          <div className={styles.secondaryLinks}>
            <Link href="/pdf/ArJay_Castro_Skills.pdf" target="_blank" rel="noopener noreferrer" className={styles.subtleLink}>
              Download Resume
            </Link>
            <span className={styles.linkSeparator}>•</span>
            <a href="mailto:arjayofficial127@gmail.com" className={styles.subtleLink}>
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
