"use client";

import { useEffect, useRef, useState } from "react";

/* 🔥 EVOLUTION SYSTEM (smooth, not random) */
function evolveValuesOriginal(prev: number[], variance = 16, step = 1.2) {
  return prev.map((val) => {
    let next = val;

    // 🔥 normal smooth evolution
    next += (Math.random() - 0.5) * step;

    // 🔥 occasional stronger mutation (THIS is the key)
    if (Math.random() < 0.08) {
      next += (Math.random() - 0.5) * 10;
    }

    const min = 40 - variance / 2;
    const max = 40 + variance / 2;

    if (next < min) next = min;
    if (next > max) next = max;

    return next;
  });
}



function evolveValuesUniform(prev: number[], variance = 16, step = 1.2) {
return prev.map((val, i) => {
  let next = val;

  const bias = Math.sin(i * 0.8 + performance.now() * 0.002) * 2;

  next += (Math.random() - 0.5) * step + bias;

  if (Math.random() < 0.08) {
    next += (Math.random() - 0.5) * 10;
  }

  const min = 40 - variance / 2;
  const max = 40 + variance / 2;

  return Math.max(min, Math.min(max, next));
});
}

/* 🔥 SMOOTH BEZIER SHAPE */
function buildPath(radii: number[], center = 50) {
  const points = radii.length;
  const angleStep = (Math.PI * 2) / points;

  const pts = radii.map((r, i) => {
    const angle = i * angleStep;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  });

  let d = `M ${pts[0].x} ${pts[0].y}`;

  for (let i = 0; i < pts.length; i++) {
    const p0 = pts[i];
    const p1 = pts[(i + 1) % pts.length];
    const pPrev = pts[(i - 1 + pts.length) % pts.length];
    const pNext = pts[(i + 2) % pts.length];

    const smoothing = 0.2;

    const cp1x = p0.x + (p1.x - pPrev.x) * smoothing;
    const cp1y = p0.y + (p1.y - pPrev.y) * smoothing;

    const cp2x = p1.x - (pNext.x - p0.x) * smoothing;
    const cp2y = p1.y - (pNext.y - p0.y) * smoothing;

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
  }

  return d + " Z";
}

export function DittoBlob() {
  const POINTS = 9;
  const BASE = 40;

  const [path, setPath] = useState(
    buildPath(Array.from({ length: POINTS }, () => BASE))
  );
  const [scale, setScale] = useState(1);
  const [isCharging, setIsCharging] = useState(false);
  const [isMax, setIsMax] = useState(false);

  const radiiRef = useRef<number[]>(
    Array.from({ length: POINTS }, () => BASE)
  );

  const shapeRafRef = useRef<number>();
  const holdRafRef = useRef<number>();
  const lastUpdateRef = useRef(0);
  const holdStartRef = useRef<number | null>(null);

  const INTERVAL = 40;

  // evolution strategy is chosen dynamically (idle vs charging)

  const MAX_SCALE = 2;
  const HOLD_START = 800;
  const FULL_TIME = 4000;

  /* 🔥 SHAPE ANIMATION */
  useEffect(() => {
    const animate = (time: number) => {
      if (time - lastUpdateRef.current > INTERVAL) {
        // compute both evolutions and blend when transitioning for smoothness
        const a = evolveValuesOriginal(radiiRef.current);
        const b = evolveValuesUniform(radiiRef.current);

        if (isCharging) {
          // biased toward the "uniform" (controlled) shape when charging
          radiiRef.current = a.map((v, i) => v * 0.3 + b[i] * 0.7);
        } else {
          // idle: use organic evolution
          radiiRef.current = a;
        }

        setPath(buildPath(radiiRef.current));
        lastUpdateRef.current = time;
      }

      shapeRafRef.current = requestAnimationFrame(animate);
    };

    shapeRafRef.current = requestAnimationFrame(animate);

    return () => {
      if (shapeRafRef.current) cancelAnimationFrame(shapeRafRef.current);
    };
  }, [isCharging]);

  /* 🔥 HOLD INTERACTION */
  const startHold = () => {
    holdStartRef.current = Date.now();
    setIsCharging(true);

    const tick = () => {
      if (holdStartRef.current === null) return;

      const elapsed = Date.now() - holdStartRef.current;

      let nextScale = 1;
      let reachedMax = false;

      if (elapsed >= HOLD_START) {
        const progress = Math.min(
          (elapsed - HOLD_START) / (FULL_TIME - HOLD_START),
          1
        );

        nextScale = 1 + progress * (MAX_SCALE - 1);

        if (progress >= 1) reachedMax = true;
      }

      setScale(nextScale);
      setIsMax(reachedMax);

      holdRafRef.current = requestAnimationFrame(tick);
    };

    holdRafRef.current = requestAnimationFrame(tick);
  };

  const endHold = () => {
    holdStartRef.current = null;
    if (holdRafRef.current) cancelAnimationFrame(holdRafRef.current);

    setIsCharging(false);
    setIsMax(false);

    // 💥 elastic bounce
    setScale(1.15);
    requestAnimationFrame(() => {
      setScale(0.95);
      requestAnimationFrame(() => setScale(1));
    });
  };

  // Cursor tracking state and refs
  const [cursor, setCursor] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = (e: any) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setCursor({ x, y });
  };

  return (
    <div className="flex flex-col items-center mt-6 gap-2 select-none">
      <span className="text-[10px] text-slate-400 tracking-wide">
        adapts to any system
      </span>

      <div
        ref={containerRef}
        style={{
          transform: `scale(${scale})`,
          transition: "transform 0.12s ease-out",
        }}
      >
        <div
          className={`ditto-blob cursor-pointer 
            ${isCharging ? "charging" : ""}
            ${isMax ? "maxed" : ""}
          `}
          onPointerDown={startHold}
          onPointerUp={endHold}
          onPointerLeave={endHold}
          onPointerCancel={endHold}
        >
          <svg width="120" height="120" viewBox="-10 -10 120 120" onPointerMove={handleMove}>
            {/* 🔥 BODY */}
            <path className="blob" d={path} fill="#8b5cf6" />

            {/* 👀 EYES */}
            {(() => {
              const offsetX = (cursor.x - 50) * 0.12;
              const offsetY = (cursor.y - 50) * 0.12;
              return (
                <>
                  <circle className="eye" cx={43 + offsetX} cy={48 + offsetY} r={2.8} />
                  <circle className="eye" cx={57 + offsetX} cy={48 + offsetY} r={2.8} />

                  {/* 🙂 SMILE */}
                  <path
                    className="smile"
                    d={`M ${44 + offsetX} ${62 + offsetY} Q ${50 + offsetX} ${64 + offsetY} ${56 + offsetX} ${62 + offsetY}`}
                    strokeWidth="2"
                    fill="none"
                  />
                </>
              );
            })()}
          </svg>
        </div>
      </div>

      <style jsx>{`
        .ditto-blob {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }

        .blob {
          transform-origin: center;
          animation: squish 4s ease-in-out infinite;
          filter: blur(0.2px);
          transition: fill 0.2s ease;
        }

        @keyframes squish {
          0%, 100% { transform: scale(1, 1); }
          50% { transform: scale(1.04, 0.96); }
        }

        .eye {
          fill: #1f2937;
          transform-origin: center;
          transition: transform 0.2s ease;
        }

        .smile {
          stroke: #1f2937;
          transition: transform 0.2s ease;
        }

        /* ⚡ CHARGING */
        .ditto-blob.charging .blob {
          fill: #a78bfa;
          animation: squish 4s ease-in-out infinite,
                     vibrate 0.12s infinite;
        }

        .ditto-blob.charging .eye {
          transform: scale(1.2);
        }

        /* 💥 MAX */
        .ditto-blob.maxed .blob {
          fill: #c084fc;
        }

        .ditto-blob.maxed .eye {
          transform: scale(1.4);
        }

        @keyframes vibrate {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(0.6px); }
        }
      `}</style>
    </div>
  );
}