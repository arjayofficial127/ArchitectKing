'use client';

import Link from 'next/link';

import { DittoBlob } from '@/components/ui/DittoBlob';
import { engagements } from '@/lib/helpJourney';
import { ProofIcon } from './ProofIcon';
import styles from './proofFold.module.css';

function HelpJourney() {
  return (
    <>
      <div className={styles.journey}>
        <header className={styles.centerHeader}>
          <p className={styles.eyebrow}>Ways we can work together</p>
          <h2 id="journey-heading" className={styles.heading}>Choose the kind of help you need</h2>
          <p className={styles.intro}>Practical support for complex systems and teams—focused, flexible, and outcome-driven.</p>
        </header>
        <div className={styles.serviceGrid} role="list" aria-label="Ways we can work together">
          {engagements.map((option, index) => (
            <article key={option.id} className={`${styles.serviceCard} ${index === 0 ? styles.serviceCardFeatured : ''}`} role="listitem">
              {index === 0 && <span className={styles.featuredBadge}>★ Featured</span>}
              <div className={styles.serviceIcon}><ProofIcon name={option.icon} /></div>
              <p className={styles.engagementEyebrow}>{option.eyebrow}</p>
              <h3>{option.title}</h3>
              <p className={styles.serviceDescription}>{option.description}</p>
              <div className={styles.serviceDivider} />
              <p className={styles.serviceLabel}>Best for</p>
              <div className={styles.serviceReasons}>{option.reasons.map((reason) => <span key={reason}>{reason}</span>)}</div>
              <p className={styles.serviceLabel}>What&apos;s included</p>
              <ul className={styles.serviceIncludes}><li>Understand before changing things</li><li>Make tradeoffs clear</li><li>Stay and help ship it</li></ul>
              <div className={styles.serviceFooter}><span>{option.detail}</span><Link href={`/contact-me?help=${option.id}`} aria-label={`Start with ${option.title}`}>→</Link></div>
            </article>
          ))}
        </div>
      </div>

      <section className={styles.journeyFooter} aria-labelledby="starting-point-heading">
        <div className={styles.finish}>
          <div><h3 id="starting-point-heading">What are you working on?</h3><p>Tell me what you&apos;re building or what&apos;s getting difficult. We&apos;ll work out where I can help and start from there.</p><Link href="/contact-me" className={styles.startPointAction}>Tell me about it <span aria-hidden="true">→</span></Link><p className={styles.directNote}>You&apos;ll speak and work directly with me.</p></div>
          <div className={styles.squishy}><DittoBlob /></div>
          <div className={styles.finishContacts}><a href="mailto:arvinjaysoncastro@gmail.com">arvinjaysoncastro@gmail.com</a><a href="https://linkedin.com/in/arvinjaysoncastro" target="_blank" rel="noopener noreferrer">linkedin.com/in/arvinjaysoncastro</a><a href="tel:+639627675114">+63 962 767 5114</a></div>
        </div>
      </section>
    </>
  );
}

export function ProofFoldCloser() {
  return <div className={styles.root}><div className={styles.container}><section aria-labelledby="journey-heading"><HelpJourney /></section></div></div>;
}
