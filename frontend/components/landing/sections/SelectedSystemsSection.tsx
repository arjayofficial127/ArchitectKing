"use client";

import { CSSProperties, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Fractal-noise data URI for a matte, grained bezel - a flat black frame reads
// as plastic-render-fake; a little grain sells it as a real physical surface.
const BEZEL_NOISE =
  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 140 140\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")';


interface LiveSystem {
  name: string;
  category: string;
  description: string;
  built: string;
  previewUrl: string;
  siteUrl?: string;
  standSide: 'left' | 'right';
  previewKind?: 'live' | 'image';
  screenshotAlt?: string;
  capabilities?: readonly string[];
  typeLabel?: string;
  /** Where the project actually stands today. Stated plainly, never inflated. */
  status: string;
  /** How a visitor can see it. Omitted when there is no public destination. */
  viewLabel?: string;
}

const liveSystems: LiveSystem[] = [
  {
    name: 'airunote',
    category: 'Knowledge workspace',
    description: 'One content system for nested notes, boards, canvases, study views, and public assessments.',
    built: 'Product model, workspace behavior, editor flows, permissions, and full-stack delivery.',
    previewUrl: 'https://www.airunote.com/',
    siteUrl: 'https://www.airunote.com/',
    standSide: 'left',
    status: 'Live',
    viewLabel: 'Open airunote.com',
  },
  {
    name: 'baseofui',
    category: 'Multi-tenant workspace platform',
    description: 'A configurable system for websites, forms, files, publishing, portfolios, client workflows, and team operations.',
    built: 'Page builder, tenant isolation, RBAC, installable apps, public portals, and per-organization admin workspaces.',
    previewUrl: 'https://www.baseofui.com/',
    siteUrl: 'https://www.baseofui.com/',
    standSide: 'right',
    status: 'Live',
    viewLabel: 'Open baseofui.com',
  },
  {
    name: 'Coach Browser',
    category: 'Local-first research workspace',
    description: 'Keep research, browser tabs, notes, canvases, files, and next steps together inside focused desktop workspaces.',
    built: 'Windows desktop shell, isolated browser tabs, local files, Markdown notes, canvas pages, capture flows, keyboard navigation, and packaging.',
    previewUrl: '/architectking/coach-browser/new-tab.png',
    standSide: 'left',
    previewKind: 'image',
    // typeLabel: 'Windows browser app',
    screenshotAlt: 'Coach Browser research workspace with desktop workspaces, browser tabs, notes, and local files.',
    // capabilities: ['Research', 'Capture', 'Organize', 'Local files'],
    status: 'Windows prototype - not publicly released',
  },
];

function LivePreview({ system }: { system: LiveSystem }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // null = "not measured yet": the frame stays invisible instead of flashing
  // at native size before we know the real scale.
  const [scale, setScale] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  // useLayoutEffect (not useEffect) measures and applies the scale before the
  // browser paints, so the first frame the user sees is already correctly
  // sized - no "zoomed in for a blink" flash.
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || system.previewKind === 'image') return;

    const applyZoom = () => {
      const width = viewport.clientWidth || 1;
      const safeScale = Math.max(0.2, Math.min(1, width / 1920));
      setScale(safeScale);
    };

    const observer = new ResizeObserver(applyZoom);
    observer.observe(viewport);
    applyZoom();

    return () => observer.disconnect();
  }, [system.previewKind]);

  // React's synthetic onLoad is unreliable on <iframe> (confirmed it never
  // fires on this exact element), so bind the real DOM event directly. A
  // same-origin frame's src starts fetching as soon as the server-rendered
  // markup is parsed - often before hydration even runs - so the 'load'
  // event can fire before this effect ever attaches a listener. Check
  // whether it already finished navigating past about:blank first; only
  // fall back to waiting on the event for whatever hasn't loaded yet.
  useLayoutEffect(() => {
    const frame = iframeRef.current;
    if (!frame || system.previewKind === 'image') return;

    const handleLoad = () => setLoaded(true);

    try {
      const href = frame.contentWindow?.location.href;
      if (href && href !== 'about:blank') {
        handleLoad();
        return;
      }
    } catch {
      // Cross-origin frame: can't introspect it, so just wait on the event.
    }

    frame.addEventListener('load', handleLoad);

    // Safety net: a cross-origin frame can't be checked up front the way
    // same-origin ones are above, and a fast/cached response can finish
    // loading before this listener even attaches - the exact same race,
    // just one we can't detect for cross-origin content. Without a fallback
    // that leaves the preview stuck on the loading gradient forever. Timing
    // out and revealing the frame is safe even if the 'load' event really
    // hasn't fired yet, since the guest page keeps rendering regardless.
    const timeout = window.setTimeout(handleLoad, 4000);

    return () => {
      frame.removeEventListener('load', handleLoad);
      window.clearTimeout(timeout);
    };
  }, [system.previewKind]);

  // Rendering the guest site at its real desktop width (1920) and scaling the
  // whole frame down keeps its own layout intact and shrinks its native
  // scrollbar to a sliver instead of showing a full-size one in a small box.
  const ready = system.previewKind === 'image' ? loaded : scale !== null && loaded;

  const iframeStyle: CSSProperties = {
    width: 1920,
    height: 1080,
    transform: `scale(${scale ?? 0.001})`,
    transformOrigin: 'top left',
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: ready ? 1 : 0,
    transition: 'opacity 400ms ease',
  };

  return (
    <div className="relative isolate rounded-xl bg-neutral-950 p-2 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_36px_70px_-24px_rgba(15,23,42,0.55),0_16px_30px_-14px_rgba(15,23,42,0.4)]">
      {/* Matte, grained bezel - sits under the screen so the noise only shows
          in the frame itself, never over the content. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl opacity-40 mix-blend-overlay"
        style={{ backgroundImage: BEZEL_NOISE }}
      />

      <div ref={viewportRef} className="relative aspect-video overflow-hidden rounded-[calc(0.75rem_-_8px)] bg-slate-950">
        {/* Generic loading gradient - shown until the live preview has both a
            measured scale and has finished loading, so nothing zoomed-in or
            blank ever flashes on screen. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, #1e2937 0%, #334155 45%, #0f172a 100%)',
            opacity: ready ? 0 : 1,
          }}
        />

        {system.previewKind === 'image' ? (
          <Image
            src={system.previewUrl}
            alt={system.screenshotAlt ?? `${system.name} product preview`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
            onLoad={() => setLoaded(true)}
            style={{ opacity: ready ? 1 : 0, transition: 'opacity 400ms ease' }}
          />
        ) : (
          <iframe
            ref={iframeRef}
            src={system.previewUrl}
            title={`${system.name} product preview`}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts"
            className="border-0 bg-white"
            style={iframeStyle}
          />
        )}

        {/* Glass screen sheen - purely decorative, sits above the content but never
            intercepts pointer events so scrolling/clicking inside the preview still works. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.05) 16%, rgba(255,255,255,0) 34%, rgba(8,15,32,0.04) 72%, rgba(8,15,32,0.15) 100%)',
          }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/20" />
      </div>
    </div>
  );
}

function LiveSystemCard({ system }: { system: LiveSystem }) {
  const cardRef = useRef<HTMLElement>(null);

  // Reveal on scroll. This used to slide each card in horizontally by up to
  // 460px, which pushed content outside the grid and was the real cause of the
  // clipped project text - the section then masked it with overflow-x-clip.
  // A vertical rise can't overflow the inline axis, so both go away.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      card.style.opacity = '1';
      card.style.transform = 'none';
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        card.style.opacity = '1';
        card.style.transform = 'translate3d(0, 0, 0)';
        observer.disconnect();
      },
      { rootMargin: '0px 0px -12% 0px' },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className="flex min-w-0 flex-col opacity-0 transition-[opacity,transform] duration-700 ease-out will-change-[opacity,transform] motion-reduce:!opacity-100 motion-reduce:!transform-none"
      style={{ transform: 'translate3d(0, 18px, 0)' }}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
          <div className="min-w-0">
            <h3 className="text-2xl font-bold tracking-tight text-slate-950">{system.name}</h3>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{system.category}</p>
          </div>
          <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-600">
            {system.status}
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-600">{system.description}</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          <span className="font-bold text-[#9A7400]">My contribution.</span> {system.built}
        </p>

        {system.capabilities && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${system.name} capabilities`}>
            {system.capabilities.map((capability) => (
              <li key={capability} className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                {capability}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="pt-5">
        <LivePreview system={system} />
      </div>

      {system.siteUrl ? (
        <a
          href={system.siteUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex w-fit items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-slate-950 hover:bg-slate-950 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
        >
          {system.viewLabel ?? 'Open live'} <span aria-hidden="true">↗</span>
        </a>
      ) : null}
    </article>
  );
}

export function SelectedSystemsSection() {
  return (
    <section id="selected-systems" className="relative scroll-mt-28 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9A7400]">Selected work</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Real systems. Real problems.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            A few projects that show how I work - from idea through to production.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-x-8 gap-y-14 lg:grid-cols-2">
          {liveSystems.map((system) => (
            <LiveSystemCard key={system.name} system={system} />
          ))}
        </div>
      </div>
    </section>
  );
}
