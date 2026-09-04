'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PointerEvent, useEffect, useRef } from 'react';

import styles from './workingFundamentalsShowcase.module.css';

const chapters = [
  { number: '01', label: 'Keeping It Understandable', href: '/working-fundamentals-1-of-13-programming-fundamentals' },
  { number: '02', label: 'Make Change Safe', href: '/working-fundamentals-5-of-13-state-and-change' },
  { number: '03', label: 'Draw the Boundaries', href: '/working-fundamentals-7-of-13-architecture' },
] as const;

function ArchitecturalOrbit() {
  return (
    <svg className={styles.orbit} viewBox="0 0 420 420" aria-hidden="true">
      <g className={styles.orbitOuter}>
        <circle cx="210" cy="210" r="176" />
        <circle cx="210" cy="210" r="135" strokeDasharray="2 13" />
        <path d="M48 210h324M210 48v324M83 95l254 230M337 95 83 325" />
        <circle cx="210" cy="34" r="4" className={styles.orbitNode} />
        <circle cx="372" cy="210" r="3" className={styles.orbitNode} />
      </g>
      <g className={styles.orbitInner}>
        <path d="M107 210a103 103 0 0 1 206 0M143 296a103 103 0 0 0 134 0" />
        <circle cx="121" cy="158" r="3" className={styles.orbitNode} />
      </g>
    </svg>
  );
}

const stalkPlacements = [
  { className: 'stalkOne', style: { left: '6%', width: '40%' } },
  { className: 'stalkTwo', style: { left: '22%', width: '46%' } },
  { className: 'stalkThree', style: { left: '46%', width: '36%' } },
] as const;

function RiceStalks() {
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const group = groupRef.current;
    if (!group || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let lastY = window.scrollY;
    let velocity = 0;
    let frame = 0;

    const settle = () => {
      velocity *= 0.9;
      group.style.setProperty('--wind', velocity.toFixed(3));
      frame = Math.abs(velocity) > 0.02 ? requestAnimationFrame(settle) : 0;
    };

    const onScroll = () => {
      const y = window.scrollY;
      velocity = Math.max(-6, Math.min(6, velocity + (y - lastY) * 0.5));
      lastY = y;
      if (!frame) frame = requestAnimationFrame(settle);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={styles.botanical} aria-hidden="true">
      <div ref={groupRef} className={styles.windGroup}>
        {stalkPlacements.map((stalk) => (
          <div key={stalk.className} className={styles.stalk} style={stalk.style}>
            <div className={`${styles.stalkSway} ${styles[stalk.className]}`}>
              <div className={styles.stalkScale}>
                <Image src="/architectking/rice.png" alt="" fill sizes="120px" className={styles.stalkImage} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FieldSeal() {
  return (
    <div className={styles.fieldSeal} aria-hidden="true">
      <Image src="/architectking/sun.png" alt="A practical field guide, for builders" fill sizes="90px" className={styles.sealRing} />
    </div>
  );
}

const SPIN_FROM = 9;
const SPIN_TO = -6;

function BookInstallation() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const spinRef = useRef({ current: SPIN_FROM, target: SPIN_FROM });
  const frameRef = useRef(0);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const readScroll = () => {
      const rect = scene.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (viewport - rect.top) / (viewport + rect.height)));
      spinRef.current.target = SPIN_FROM - progress * (SPIN_FROM - SPIN_TO);
    };

    const animate = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.075;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.075;
      spinRef.current.current += (spinRef.current.target - spinRef.current.current) * 0.07;
      scene.style.setProperty('--book-x', currentRef.current.x.toFixed(3));
      scene.style.setProperty('--book-y', currentRef.current.y.toFixed(3));
      scene.style.setProperty('--book-spin', spinRef.current.current.toFixed(3));
      frameRef.current = requestAnimationFrame(animate);
    };

    readScroll();
    spinRef.current.current = spinRef.current.target;
    window.addEventListener('scroll', readScroll, { passive: true });
    window.addEventListener('resize', readScroll);
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('scroll', readScroll);
      window.removeEventListener('resize', readScroll);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    targetRef.current = {
      x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 6,
      y: ((event.clientY - bounds.top) / bounds.height - 0.5) * -3,
    };
  };

  const resetPointer = () => { targetRef.current = { x: 0, y: 0 }; };

  return (
    <div ref={sceneRef} className={styles.installation} onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
      <FieldSeal />
      <RiceStalks />
      <div className={styles.bookStage}>
        <div className={styles.bookFloat}>
          <div className={styles.bookParallax}>
            <div className={styles.bookBox}>
              <Image src="/architectking/working-fundamentals-paperback.png" alt="Working Fundamentals by Arvin Jayson Castro" fill sizes="(max-width: 768px) 60vw, 420px" priority className={styles.bookImage} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.pedestal} aria-hidden="true">
        <Image src="/architectking/stand.png" alt="" fill sizes="(max-width: 768px) 90vw, 560px" className={styles.pedestalImage} />
      </div>
      <span className={styles.contactShadow} aria-hidden="true" />
    </div>
  );
}

function MetaIcon({ kind }: { kind: 'book' | 'field' | 'heart' | 'save' }) {
  const paths = {
    book: <><path d="M3 5.5A3.5 3.5 0 0 1 6.5 2H11v16H6.5A3.5 3.5 0 0 0 3 21.5V5.5Z" /><path d="M21 5.5A3.5 3.5 0 0 0 17.5 2H13v16h4.5a3.5 3.5 0 0 1 3.5 3.5v-16Z" /></>,
    field: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 5V3h8v2M8 11h8M8 15h5" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    save: <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z" />,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[kind]}</svg>;
}

export function WorkingFundamentalsShowcase() {
  return (
    <article className={styles.showcase} aria-labelledby="working-fundamentals-title">
      <BookInstallation />
      <div className={styles.editorial}>
        <ArchitecturalOrbit />
        <div className={styles.chapterSignature}><strong>13</strong><span>Chapters</span></div>
        <p className={styles.eyebrow}>Working Fundamentals · Field Notes</p>
        <h3 id="working-fundamentals-title">Systems That Hold<br />Under Pressure</h3>
        <span className={styles.goldDash} aria-hidden="true" />
        <p className={styles.description}>A practical, unhurried guide to building software that stays understandable as the users, rules, data, and stakes keep changing.</p>
        <p className={styles.description}>Thirteen short chapters on the decisions that make a system dependable long after launch.</p>
        <blockquote>For builders who want fewer surprises, clearer boundaries, and software their teams can trust.</blockquote>

        <div className={styles.chapterBlock}>
          <p>Chapter preview</p>
          <div className={styles.chapterList}>
            {chapters.map((chapter) => <Link key={chapter.number} href={chapter.href}><span>{chapter.number}</span>{chapter.label}</Link>)}
            <Link href="/working-fundamentals">+10 more</Link>
          </div>
        </div>

        <div className={styles.actions}>
          <Link href="/working-fundamentals-introduction" className={styles.primaryAction}>Start reading <span>→</span></Link>
          <Link href="/working-fundamentals" className={styles.secondaryAction}>Explore all chapters <span>→</span></Link>
        </div>

        <dl className={styles.meta}>
          <div><MetaIcon kind="book" /><dd>~3–4 hrs<br />of reading</dd></div>
          <div><MetaIcon kind="field" /><dd>Practical guidance<br />from real systems</dd></div>
          <div><MetaIcon kind="heart" /><dd>Written for<br />builders</dd></div>
          <div><MetaIcon kind="save" /><dd>Save for<br />your team</dd></div>
        </dl>
      </div>
    </article>
  );
}
