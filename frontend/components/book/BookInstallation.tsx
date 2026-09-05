'use client';

import Image from 'next/image';
import { PointerEvent, useCallback, useEffect, useRef, useState } from 'react';

import styles from './bookInstallation.module.css';

/** Thin architectural arcs behind the book. Labels stay outside the rotating groups. */
function ArchitecturalOrbit() {
  return (
    <svg className={styles.orbit} viewBox="0 0 420 420" aria-hidden="true" focusable="false">
      <g className={styles.orbitOuter}>
        <circle cx="210" cy="210" r="176" />
        <circle cx="210" cy="210" r="135" strokeDasharray="2 13" />
        <path d="M48 210h324M210 48v324" />
        <circle cx="210" cy="34" r="3.5" className={styles.orbitNode} />
        <circle cx="372" cy="210" r="2.5" className={styles.orbitNode} />
      </g>
      <g className={styles.orbitInner}>
        <path d="M107 210a103 103 0 0 1 206 0M143 296a103 103 0 0 0 134 0" />
        <circle cx="121" cy="158" r="2.5" className={styles.orbitNode} />
      </g>
    </svg>
  );
}

const stalks = [
  { key: 'one', className: 'stalkOne', style: { left: '4%', width: '42%' } },
  { key: 'two', className: 'stalkTwo', style: { left: '21%', width: '48%' } },
  { key: 'three', className: 'stalkThree', style: { left: '47%', width: '38%' } },
] as const;

function Botanical() {
  return (
    <div className={styles.botanical} aria-hidden="true">
      {stalks.map((stalk) => (
        <div key={stalk.key} className={styles.stalk} style={stalk.style}>
          <div className={`${styles.stalkSway} ${styles[stalk.className]}`}>
            <div className={styles.stalkScale}>
              <Image src="/architectking/rice.png" alt="" fill sizes="140px" className={styles.stalkImage} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * The book is a real CSS 3D box: six faces on a preserve-3d stage, using the flat
 * cover artwork rather than a perspective photograph rotated in place.
 *
 * Motion lives on two separate wrappers so the resting yaw (a CSS keyframe) and the
 * pointer parallax (rAF-driven custom properties) never write the same transform.
 */
function Book() {
  return (
    <div
      className={styles.book}
      role="img"
      aria-label="Working Fundamentals by Arvin Jayson Castro - cover and spine of the printed guide"
    >
      <div className={`${styles.face} ${styles.faceFront}`}>
        <Image
          src="/architectking/wf-cover-front-flat.png"
          alt=""
          fill
          sizes="(max-width: 768px) 60vw, 320px"
          priority
          className={styles.coverArt}
        />
      </div>

      <div className={`${styles.face} ${styles.faceSpine}`} aria-hidden="true">
        <span className={styles.spineInner}>
          <span className={styles.spineTitle}>
            Working&nbsp;
            <b className={styles.hueF}>F</b>
            <b className={styles.hueU}>u</b>
            <b className={styles.hueN}>n</b>
            damentals
          </span>
          <span className={styles.spineAuthor}>Arvin Jayson Castro</span>
        </span>
      </div>

      <div className={`${styles.face} ${styles.faceTop}`} aria-hidden="true">
        <Image src="/architectking/wf-page-top.png" alt="" fill sizes="320px" className={styles.pageTopArt} />
      </div>

      <div className={`${styles.face} ${styles.faceFore}`} aria-hidden="true" />
      <div className={`${styles.face} ${styles.faceBottom}`} aria-hidden="true" />
      <div className={`${styles.face} ${styles.faceBack}`} aria-hidden="true" />
    </div>
  );
}

const TILT_X = 5;
const TILT_Y = 2.6;

export function BookInstallation({ className }: { className?: string } = {}) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const frame = useRef(0);
  const running = useRef(false);

  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);

  /** rAF only smooths pointer parallax - it never touches React state. */
  const startLoop = useCallback(() => {
    if (running.current) return;
    running.current = true;

    const step = () => {
      const node = tiltRef.current;
      if (!node) {
        running.current = false;
        return;
      }
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;
      node.style.setProperty('--tilt-x', current.current.x.toFixed(3));
      node.style.setProperty('--tilt-y', current.current.y.toFixed(3));

      const settled =
        Math.abs(target.current.x - current.current.x) < 0.002 &&
        Math.abs(target.current.y - current.current.y) < 0.002;

      if (settled && target.current.x === 0 && target.current.y === 0) {
        running.current = false;
        return;
      }
      frame.current = requestAnimationFrame(step);
    };

    frame.current = requestAnimationFrame(step);
  }, []);

  const stopLoop = useCallback(() => {
    cancelAnimationFrame(frame.current);
    running.current = false;
  }, []);

  /** Pause continuous work while offscreen, hidden, reduced-motion, or user-paused. */
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = true;

    const sync = () => {
      const allowed = visible && !document.hidden && !reduce.matches && !pausedRef.current;
      scene.dataset.motion = allowed ? 'running' : 'paused';
      if (!allowed) {
        stopLoop();
        target.current = { x: 0, y: 0 };
        current.current = { x: 0, y: 0 };
        tiltRef.current?.style.setProperty('--tilt-x', '0');
        tiltRef.current?.style.setProperty('--tilt-y', '0');
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
        sync();
      },
      { rootMargin: '120px' },
    );
    observer.observe(scene);

    document.addEventListener('visibilitychange', sync);
    reduce.addEventListener('change', sync);
    sync();

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reduce.removeEventListener('change', sync);
      stopLoop();
    };
  }, [stopLoop]);

  useEffect(() => {
    pausedRef.current = paused;
    const scene = sceneRef.current;
    if (!scene) return;
    if (paused) {
      scene.dataset.motion = 'paused';
      stopLoop();
      target.current = { x: 0, y: 0 };
      current.current = { x: 0, y: 0 };
      tiltRef.current?.style.setProperty('--tilt-x', '0');
      tiltRef.current?.style.setProperty('--tilt-y', '0');
    } else {
      scene.dataset.motion = 'running';
    }
  }, [paused, stopLoop]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    if (sceneRef.current?.dataset.motion !== 'running') return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    target.current = {
      x: ((event.clientX - bounds.left) / bounds.width - 0.5) * TILT_X,
      y: ((event.clientY - bounds.top) / bounds.height - 0.5) * -TILT_Y,
    };
    startLoop();
  };

  const handlePointerLeave = () => {
    target.current = { x: 0, y: 0 };
    startLoop();
  };

  return (
    <div ref={sceneRef} className={`${styles.installation} ${className ?? ''}`} data-motion="running">
      <ArchitecturalOrbit />

      <div className={styles.stage} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
        <div ref={tiltRef} className={styles.tilt}>
          <div className={styles.yaw}>
            <Book />
          </div>
        </div>
      </div>

      <span className={styles.contactShadow} aria-hidden="true" />

      <div className={styles.pedestal} aria-hidden="true">
        <Image
          src="/architectking/stone-quartz.png"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 620px"
          className={styles.pedestalArt}
        />
      </div>

      <Botanical />

      <button
        type="button"
        className={styles.motionToggle}
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused}
      >
        {paused ? 'Resume motion' : 'Pause motion'}
      </button>
    </div>
  );
}
