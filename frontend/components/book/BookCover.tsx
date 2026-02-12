'use client';

import { useEffect, useRef } from 'react';
import styles from './bookCover.module.css';

export function BookCover() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const slab1 = wrap.querySelector<HTMLElement>('.shadow-slab');
    const slab2 = wrap.querySelector<HTMLElement>('.shadow-slab-2');
    const slab3 = wrap.querySelector<HTMLElement>('.shadow-slab-3');
    const slab4 = wrap.querySelector<HTMLElement>('.shadow-slab-4');
    const front = wrap.querySelector<HTMLElement>('.front-slab');

    if (!slab1 || !slab2 || !slab3 || !slab4) return;

    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

    let raf = 0;
    let lx = 0;
    let ly = 0;

    function render() {
      raf = 0;

      const sx = -lx;
      const sy = -ly;
      const intensity = Math.abs(lx) + Math.abs(ly);

      slab1.style.transform = `translate(${(sx * 38).toFixed(2)}px, ${(sy * 38).toFixed(2)}px)`;
      slab1.style.filter = `blur(${(14 + intensity * 6).toFixed(2)}px)`;
      slab1.style.opacity = (0.28 + intensity * 0.14).toFixed(2);

      slab2.style.transform = `translate(${(sx * 14).toFixed(2)}px, ${(sy * 14).toFixed(2)}px)`;
      slab2.style.filter = `blur(${(6 + intensity * 4).toFixed(2)}px)`;
      slab2.style.opacity = (0.16 + intensity * 0.10).toFixed(2);

      slab3.style.transform = `translate(${(sx * 6).toFixed(2)}px, ${(sy * 6).toFixed(2)}px)`;
      slab3.style.filter = `blur(9px)`;
      slab3.style.opacity = (0.24 + Math.abs(lx) * 0.06).toFixed(2);

      slab4.style.transform = `translate(${(sx * 3).toFixed(2)}px, ${(sy * 3).toFixed(2)}px)`;
      slab4.style.filter = `blur(18px)`;
      slab4.style.opacity = (0.16 + Math.abs(ly) * 0.04).toFixed(2);

      if (front) {
        front.style.transform = `translate(${(-lx * 1.6).toFixed(2)}px, ${(-ly * 1.6).toFixed(2)}px)`;
        front.style.opacity = (0.34 + intensity * 0.22).toFixed(2);
        const gx = 50 - lx * 28;
        const gy = 50 - ly * 28;
        front.style.backgroundPosition = `${gx}% ${gy}%`;
      }
    }

    function onMove(e: MouseEvent) {
      const r = wrap.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;

      lx = clamp((e.clientX - cx) / (r.width / 2), -1, 1);
      ly = clamp((e.clientY - cy) / (r.height / 2), -1, 1);

      if (!raf) raf = requestAnimationFrame(render);
    }

    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={styles.bookWrap} ref={wrapRef}>
      <div className={styles.shadowSlab}></div>
      <div className={styles.shadowSlab2}></div>
      <div className={styles.shadowSlab3}></div>
      <div className={styles.shadowSlab4}></div>

      <div className={styles.book}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2000"
          height="3000"
          viewBox="0 0 2000 3000"
          role="img"
          aria-label="Working Fundamentals book cover"
          style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
        >
          <rect width="2000" height="3000" fill="#F7F4EE"></rect>

          <g stroke="#111111" strokeOpacity="0.06" strokeWidth="1" shapeRendering="crispEdges">
            {Array.from({ length: 19 }, (_, i) => (
              <line key={`v-${i}`} x1={(i + 1) * 100} y1="0" x2={(i + 1) * 100} y2="3000"></line>
            ))}
            {Array.from({ length: 29 }, (_, i) => (
              <line key={`h-${i}`} x1="0" y1={(i + 1) * 100} x2="2000" y2={(i + 1) * 100}></line>
            ))}
          </g>

          <g stroke="#111111" strokeOpacity="0.10" strokeWidth="1" shapeRendering="crispEdges">
            <line x1="500" y1="0" x2="500" y2="3000"></line>
            <line x1="1000" y1="0" x2="1000" y2="3000"></line>
            <line x1="1500" y1="0" x2="1500" y2="3000"></line>
            <line x1="0" y1="500" x2="2000" y2="500"></line>
            <line x1="0" y1="1000" x2="2000" y2="1000"></line>
            <line x1="0" y1="1500" x2="2000" y2="1500"></line>
            <line x1="0" y1="2000" x2="2000" y2="2000"></line>
            <line x1="0" y1="2500" x2="2000" y2="2500"></line>
            <rect x="160" y="200" width="1680" height="2600" rx="64" fill="none"></rect>
          </g>

          <g opacity="0.05" fill="#111111">
            {[
              { cx: 140, cy: 260, r: 2 },
              { cx: 380, cy: 520, r: 1.8 },
              { cx: 860, cy: 420, r: 1.6 },
              { cx: 1560, cy: 360, r: 2.1 },
              { cx: 1820, cy: 680, r: 1.7 },
              { cx: 260, cy: 1220, r: 1.8 },
              { cx: 720, cy: 1540, r: 2.0 },
              { cx: 1280, cy: 1320, r: 1.6 },
              { cx: 1760, cy: 1460, r: 2.1 },
              { cx: 420, cy: 2140, r: 1.7 },
              { cx: 940, cy: 2380, r: 2.0 },
              { cx: 1460, cy: 2240, r: 1.6 },
              { cx: 1700, cy: 2620, r: 1.9 },
              { cx: 520, cy: 2840, r: 1.7 },
              { cx: 1120, cy: 2760, r: 2.0 },
            ].map((spec, i) => (
              <circle key={`dot-${i}`} cx={spec.cx} cy={spec.cy} r={spec.r}></circle>
            ))}
          </g>

          <text
            x="1000"
            y="1540"
            textAnchor="middle"
            fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
            fontSize="150"
            fontWeight="650"
            letterSpacing="-0.02em"
            fill="#111111"
          >
            Working <tspan fill="#DC2626">F</tspan>
            <tspan fill="#FACC15">u</tspan>
            <tspan fill="#2563EB">n</tspan>
            <tspan>damentals</tspan>
          </text>

          <text
            x="900"
            y="1720"
            textAnchor="end"
            fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
            fontSize="64"
            fontWeight="400"
            fill="#333333"
          >
            How software stays
          </text>

          <text
            x="920"
            y="1720"
            textAnchor="start"
            fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
            fontSize="64"
            fontWeight="400"
            fill="#333333"
          >
            predicatable
          </text>

          <g transform="translate(800, 1780) scale(1,-1)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="800"
              height="120"
              viewBox="0 0 800 180"
              role="img"
              aria-label="Squiggle underline flowing into yarn spiral"
              overflow="visible"
            >
              <path
                d="M 10 60 C 22 54, 38 54, 50 60 C 62 66, 78 66, 90 60 C 102 54,118 54,130 60 C 142 66,158 66,170 60 C 182 54,198 54,210 60 C 222 66,238 66,250 60 C 262 54,278 54,290 60 C 302 66,318 66,330 60 C 342 54,358 54,370 60 C 382 66,398 66,410 60 C 422 54,438 54,450 60 C 462 66,478 66,490 60 C 502 54,518 54,530 60 C 542 66,558 66,570 60 C 582 54,598 54,610 60 C 622 66,638 66,650 60 C 662 54,678 54,690 60 C 702 66,718 66,730 60 M 700 72 C 712 78, 714 86, 706 90 C 696 94, 688 86, 694 78 C 704 66, 718 70, 708 78 C 698 84, 682 84, 670 76 C 656 68, 650 54, 652 40 C 654 26, 666 18, 680 20 C 694 22, 704 34, 702 48 C 700 60, 688 70, 674 68 C 660 66, 656 52, 662 44 C 668 36, 682 36, 688 44 C 694 52, 686 60, 676 58 C 666 56, 664 48, 670 44 C 676 40, 682 44, 680 48 C 678 52, 672 52, 672 48"
                fill="none"
                stroke="#16A34A"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </g>

          <g transform="translate(1650, 1530) scale(-1,1)">
            <path
              fill="#16A34A"
              d="M238.2,105.9c0,0-10.6,0.1-14.1-1.9c-3.5-2-14.4-3.7-32,6.8c-12.4,6.9-35.1-9.6-37.5-10.6c-2.4-1-22-13.3-60.7,2c-16.7,6.2-43.2-5.7-48.3-7.6c-5.1-2-34.8-11.1-17.1-35.3c0,0,10.9-9.2,0.5-13.6C25,44.4,8.1,58,10.2,77.3c1.3,11.4,8.8,31.1,58,39.7c0,0,5.5,0.5,4.2,4.3c-1.4,3.8-3.5,24.1-2.9,31.4c0,5.5-3.2,7.9-4.8,9.5s-13.4,12.2-13.7,17.1c-0.4,4.9-5.3,29.1,4,30.4c0,0,8.7,2.4,9.6-1.9c0,0,2.6-6.4-5.1-8.1c0,0-0.2-12.5,5.2-15.1l16.4-8.3l-0.2-0.3c0,0,12.1,17.6,20.3,18.3c0,0,8.3,1.3,8.8-2.8c0.5-4.1-4.6-5.7-8.7-5.4c0,0-6.7-7.2-6.8-8.7c-0.1-1.5,3.1-6.8,5.6-9.7c2.5-2.9,11.1-12.1,13-17.3c10.5-4.6,36.6-1.6,42.8,1.3c0,0,0.8,4,11,18c-5.1,5.3-13.9,11.7-8.8,16.9c5.2,5.2,18.5-7.3,19.6-15.4c1.1-8.2-2.9-13.8-2.9-13.8s3.3,1.9,7.7,7.1c4.4,5.1,2,5.8,16.1,14.8c14,9.1,30.3,20.1,30.3,20.1s3.3,6,11,5.7c7.7-0.4,4.9-8.2,3.2-9.5c-1.8-1.3-5.3-4.3-10.5-6.8c-5.2-2.5-24.6-19.9-25.9-21.5s-1.6-7.8-0.2-10.9l6.7-17.2c0,0,1.9-1.3,3.5,1c1.6,2.3,5.9,3.2,6.8,2.1c0,0,3.5,0.3,6.4-0.3c2.9-0.6,2.4-6.5,5.1-11.9c0,0,2.6-3.5,1.9-11.8l9.2-4.9l-10-3.4L238.2,105.9z"
            ></path>
          </g>

          <text
            x="1000"
            y="2680"
            textAnchor="middle"
            fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
            fontSize="44"
            fontWeight="400"
            fill="#555555"
            letterSpacing="0.18em"
          >
            ARVIN JAYSON CASTRO
          </text>
        </svg>
      </div>
      <div className={styles.frontSlab}></div>
    </div>
  );
}
