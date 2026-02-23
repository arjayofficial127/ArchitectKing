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
          <a
            href="mailto:arvinjaysoncastro@gmail.com?subject=Architecture%20Discussion&body=Hi%20Arvin%2C%0A%0AI'd%20like%20to%20discuss%20system%20architecture%20for%20[your%20project%2Frole].%0A%0ABest%2C"
            className={styles.primaryCTA}
          >
            Discuss Your System
          </a>
          <div className={styles.secondaryLinks}>
            <Link href="/pdf/ARVIN_JAYSON_CASTRO_Senior_Full-Stack_Engineer.pdf" target="_blank" rel="noopener noreferrer" className={styles.subtleLink}>
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
