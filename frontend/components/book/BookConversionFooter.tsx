import Link from 'next/link';
import styles from './bookConversionFooter.module.css';

export function BookConversionFooter() {
  return (
    <section className={styles.conversionFooter}>
      <div className={styles.conversionContent}>
        <h2 className={styles.conversionTitle}>Systems either hold — or they decay.</h2>
        <p className={styles.conversionSubtitle}>
          Architecture-first thinking prevents silent fragility
          and protects long-term velocity.
        </p>
        <div className={styles.conversionActions}>
          <Link href="/schedule" className={styles.primaryCTA}>
            Book a Call
          </Link>
          <div className={styles.secondaryLinks}>
            <Link href="/pdf/ARVIN JAYSON CASTRO - Solutions Architect Lead.pdf" target="_blank" rel="noopener noreferrer" className={styles.subtleLink}>
              Resume
            </Link>
            <span className={styles.linkSeparator}>·</span>
            <a 
              href="https://linkedin.com/in/arvinjaysoncastro" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.subtleLink}
            >
              LinkedIn
            </a>
            <span className={styles.linkSeparator}>·</span>
            <a href="mailto:arvinjaysoncastro@gmail.com" className={styles.subtleLink}>
              Email
            </a>
          </div>
        </div>
        <p className={styles.signatureLine}>
          If you&apos;re responsible for systems that must hold under pressure — we should talk.
        </p>
      </div>
    </section>
  );
}
