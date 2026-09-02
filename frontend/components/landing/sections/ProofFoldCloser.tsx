'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';

import { ProofIcon } from './ProofIcon';
import { LogoStripFinalBoss } from '../../LogoStripFinalBoss';
import styles from './proofFold.module.css';

const pressureSignals = [
  ['boundaries', 'Every feature touches unrelated parts', 0],
  ['access', 'Permissions are difficult to trust', 1],
  ['rules', 'The same rule lives in five places', 2],
  ['delivery', 'Delivery slows as the product grows', 3],
  ['data', 'Nobody is sure who owns the data', 0],
  ['incidents', 'The same incidents keep returning', 3],
] as const;

const responsibilities = [
  ['Platform boundaries', 'Keep product growth from becoming system sprawl.'],
  ['Identity and access', 'Make permissions explicit, testable, and safer to change.'],
  ['Complex workflows', 'Turn business rules into behavior the team can reason about.'],
  ['Integration and delivery', 'Connect the moving parts and stay through production.'],
] as const;

const workingMethod = [
  {
    number: '01',
    title: 'Understand before changing things',
    description: 'I learn the product, code, data, constraints, and pressure around the work before suggesting an answer.',
  },
  {
    number: '02',
    title: 'Make the tradeoffs clear',
    description: 'I explain the options in plain language so we can choose a sensible path together.',
  },
  {
    number: '03',
    title: 'Stay and help ship it',
    description: 'I work alongside the team through implementation, integration, testing, release, and whatever turns up along the way.',
  },
] as const;

const engagements = [
  {
    eyebrow: 'A second look',
    title: 'Architecture Review',
    description: 'When you need another set of eyes, a clearer view of the risks, and a decision you can act on.',
    meta: 'From $350',
    href: '/architecture-review',
    action: 'Look at the system',
  },
  {
    eyebrow: 'Short-term help',
    title: 'System Stabilization',
    description: 'When delivery has slowed, failures repeat, or changes have become harder than they should be.',
    meta: 'Scoped around what is needed',
    href: '/contact-me',
    action: 'Discuss the pressure',
  },
  {
    eyebrow: 'Ongoing help',
    title: 'Work Alongside Your Team',
    description: 'When the team needs experienced help with decisions and someone willing to work through the details with them.',
    meta: 'Directly with you and the team',
    href: '/schedule',
    action: 'See if there is a fit',
  },
] as const;

const capabilityIcons = ['boundaries', 'access', 'workflow', 'integration'] as const;
const engagementIcons = ['review', 'stabilize', 'team'] as const;

function PressureMap() {
  const id = useId();
  const [selected, setSelected] = useState(1);
  const [preview, setPreview] = useState<number | null>(null);
  const active = preview ?? selected;
  const capability = pressureSignals[active][2];
  const mapRef = useRef<HTMLDivElement>(null);
  const signalRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const capabilityRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [connection, setConnection] = useState<{ path: string; x: number; y: number } | null>(null);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    function measure() {
      const signal = signalRefs.current[active];
      const target = capabilityRefs.current[capability];
      if (!map || !signal || !target) return;
      const bounds = map.getBoundingClientRect();
      const from = signal.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      const last = signalRefs.current[5]?.getBoundingClientRect();
      const sx = from.left + from.width / 2 - bounds.left;
      const sy = from.bottom - bounds.top;
      const tx = to.left + to.width / 2 - bounds.left;
      const ty = to.top - bounds.top;
      const busY = ty - 30;
      // Route upper-row connections through the grid's gutters, never across copy.
      const isUpperRow = last && from.bottom < last.top;
      const gutterX = from.right - bounds.left + 12;
      const path = isUpperRow
        ? `M ${sx} ${sy} V ${sy + 12} H ${gutterX} V ${busY} H ${tx} V ${ty}`
        : `M ${sx} ${sy} V ${busY} H ${tx} V ${ty}`;
      setConnection({ path, x: tx, y: ty });
    }

    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    observer.observe(map);
    signalRefs.current.forEach((element) => element && observer.observe(element));
    capabilityRefs.current.forEach((element) => element && observer.observe(element));
    return () => observer.disconnect();
  }, [active, capability]);

  return (
    <div className={styles.pressureMap} ref={mapRef}>
      {connection && (
        <svg className={styles.connections} aria-hidden="true" focusable="false">
          <path key={active} d={connection.path} pathLength="1" />
          <circle cx={connection.x} cy={connection.y} r="4" />
        </svg>
      )}
      <div className={styles.signals} role="group" aria-label="Explore the areas related to each software problem">
        {pressureSignals.map(([icon, label, related], index) => (
          <button
            key={label}
            ref={(element) => { signalRefs.current[index] = element; }}
            type="button"
            className={styles.signal}
            aria-pressed={selected === index}
            aria-controls={`${id}-capability-${related}`}
            aria-describedby={`${id}-capability-${related}`}
            data-active={active === index}
            onPointerEnter={(event) => { if (event.pointerType !== 'touch') setPreview(index); }}
            onPointerLeave={() => setPreview(null)}
            onFocus={() => setPreview(index)}
            onBlur={() => setPreview(null)}
            onClick={() => { setSelected(index); setPreview(null); }}
          >
            <ProofIcon name={icon} className={styles.signalIcon} />
            <span>{label}</span>
            <span className={styles.signalMark} aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <div className={styles.capabilities}>
        {responsibilities.map(([title, description], index) => (
          <div
            key={title}
            id={`${id}-capability-${index}`}
            ref={(element) => { capabilityRefs.current[index] = element; }}
            className={styles.capability}
            data-active={capability === index}
          >
            <ProofIcon name={capabilityIcons[index]} className={styles.capabilityIcon} />
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProofFoldCloser() {
  const timelineRef = useRef<HTMLOListElement>(null);
  const [timelineRevealed, setTimelineRevealed] = useState(false);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;
    if (typeof IntersectionObserver === 'undefined') {
      setTimelineRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimelineRevealed(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(timeline);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <section aria-labelledby="where-help-heading">
          <header className={styles.centerHeader}>
            <p className={styles.eyebrow}>Where I can help</p>
            <h2 id="where-help-heading" className={styles.heading}>When software gets harder than it should be</h2>
            <p className={styles.intro}>The signs are usually familiar. Changes take longer, ownership gets blurry, and the same problems keep coming back.</p>
          </header>
          <PressureMap />
        </section>

        <section className={styles.section} aria-labelledby="how-work-heading">
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>How I work</p>
            <h2 id="how-work-heading" className={styles.heading}>Understand it. Decide together. Help make it happen.</h2>
          </header>
          <ol className={styles.timeline} ref={timelineRef} data-revealed={timelineRevealed}>
            {workingMethod.map((step) => (
              <li key={step.number} className={styles.step}>
                <span className={styles.stepNumber} aria-hidden="true">{step.number}</span>
                <span className={styles.stepNode} aria-hidden="true" />
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section} aria-labelledby="ways-help-heading">
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Ways I can help</p>
            <h2 id="ways-help-heading" className={styles.heading}>Start with the problem. We&apos;ll keep the scope sensible.</h2>
          </header>
          <div className={styles.engagements}>
            {engagements.map((engagement, index) => (
              <Link key={engagement.title} href={engagement.href} className={styles.engagement} data-featured={index === 0} aria-labelledby={`engagement-title-${index} engagement-action-${index}`}>
                <div className={styles.engagementBody}>
                  <p className={styles.engagementEyebrow}>{engagement.eyebrow}</p>
                  <ProofIcon name={engagementIcons[index]} className={styles.engagementIcon} />
                  <div className={styles.recommendation}>{index === 0 && <span>Good first step</span>}</div>
                  <h3 id={`engagement-title-${index}`}>{engagement.title}</h3>
                  <p className={styles.engagementDescription}>{engagement.description}</p>
                </div>
                <div className={styles.engagementFooter}>
                  <p>{engagement.meta}</p>
                  <span id={`engagement-action-${index}`} className={styles.cardAction}>{engagement.action}<span aria-hidden="true">→</span></span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.bookSection} aria-labelledby="fundamentals-heading">
          <Link href="/working-fundamentals-introduction" className={styles.bookLink} aria-label="Start reading Working Fundamentals">
            <Image src="/architectking/working-fundamentals-paperback.png" alt="Working Fundamentals by Arvin Jayson Castro" width={1254} height={1254} sizes="(max-width: 767px) 310px, (max-width: 1023px) 40vw, 480px" className={styles.bookImage} />
          </Link>
          <div className={styles.bookCopy}>
            <p className={styles.eyebrow}>Working Fundamentals · 13-part guide</p>
            <h2 id="fundamentals-heading" className={styles.heading}>I write down what has helped me.</h2>
            <p className={styles.intro}>Notes on boundaries, state, data, failure, testing, performance, and other lessons I keep returning to when building software.</p>
            <div className={styles.bookActions}>
              <Link href="/working-fundamentals-introduction" className={styles.primaryAction}>Start reading</Link>
              <Link href="/working-fundamentals" className={styles.secondaryAction}>Explore all chapters</Link>
            </div>
          </div>
        </section>

        <div className="mt-20 border-t border-slate-200 pt-12">
          <p className="text-center text-sm font-semibold text-slate-500">Some of the teams and environments I&apos;ve had the chance to learn from.</p>
          <LogoStripFinalBoss />
        </div>
      </div>
    </div>
  );
}
