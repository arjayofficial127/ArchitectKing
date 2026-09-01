"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface LiveSystem {
  name: string;
  category: string;
  description: string;
  built: string;
  previewUrl: string;
  siteUrl: string;
  standSide: 'left' | 'right';
}

const liveSystems: LiveSystem[] = [
  {
    name: 'AiruNote',
    category: 'Knowledge workspace',
    description: 'One content system for nested notes, boards, canvases, study views, and public assessments.',
    built: 'Product model, workspace behavior, editor flows, permissions, and full-stack delivery.',
    previewUrl: 'https://www.airunote.com/',
    siteUrl: 'https://www.airunote.com/',
    standSide: 'left',
  },
  {
    name: 'BaseOfUI',
    category: 'Multi-tenant workspace platform',
    description: 'A configurable system for websites, forms, files, publishing, portfolios, client workflows, and team operations.',
    built: 'Page builder, tenant isolation, RBAC, installable apps, public portals, and per-organization admin workspaces.',
    previewUrl: 'https://www.baseofui.com/',
    siteUrl: 'https://www.baseofui.com/',
    standSide: 'right',
  },
];

const coachScreenshots = [
  { src: '/architectking/coach-browser/new-tab.png', label: 'Research workspace' },
  { src: '/architectking/coach-browser/canvas.png', label: 'Connected canvas' },
  { src: '/architectking/coach-browser/daily-flow.png', label: 'Local tools' },
] as const;

function MonitorFeet({ side = 'left' }: { side?: 'left' | 'right' }) {
  const position = side === 'left' ? 'left-[18%]' : 'left-[82%]';

  return (
    <div className="relative mx-auto h-11 w-[90%]" aria-hidden="true">
      <div className={`absolute ${position} top-[-1px] h-11 w-6 -translate-x-1/2 rounded-b-sm border-x border-black/70 bg-gradient-to-r from-slate-950 via-slate-800 to-slate-950 shadow-[0_7px_10px_-7px_rgba(15,23,42,0.75)]`} />
    </div>
  );
}

function LivePreview({ system }: { system: LiveSystem }) {
  const screenRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const screen = screenRef.current;
    if (!screen) return;

    const updateScale = () => setScale(screen.clientWidth / 1920);
    const observer = new ResizeObserver(updateScale);

    updateScale();
    observer.observe(screen);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="group/device pb-8">
      <div className="relative rounded-[1.35rem] bg-gradient-to-b from-slate-600 via-slate-900 to-black p-[7px] shadow-[0_24px_50px_-24px_rgba(15,23,42,0.75),0_8px_18px_-10px_rgba(15,23,42,0.55)] ring-1 ring-black/40">
        <div className="pointer-events-none absolute left-1/2 top-[2px] z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-b-lg bg-slate-950 px-3 py-1 shadow-sm" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-700 ring-1 ring-slate-500" />
          <span className="h-1 w-1 rounded-full bg-emerald-400/80" />
        </div>
        <div ref={screenRef} className="relative aspect-video overflow-hidden rounded-[0.95rem] bg-white ring-1 ring-white/15">
          <iframe
            src={system.previewUrl}
            title={`${system.name} live product preview at 1920 by 1080 pixels`}
            width="1920"
            height="1080"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts"
            className="absolute left-0 top-0 border-0 bg-white"
            style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: 'top left' }}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/10 to-transparent" />
        </div>
        <div className="relative flex h-5 items-center justify-center" aria-hidden="true">
          <span className="h-1 w-8 rounded-full bg-gradient-to-r from-slate-700 via-slate-300 to-slate-700 opacity-70" />
          <span className="absolute right-2 flex items-center gap-1 text-[8px] font-bold tracking-wider text-emerald-400"><span className="h-1 w-1 rounded-full bg-emerald-400" /> LIVE</span>
        </div>
      </div>
      <MonitorFeet side={system.standSide} />
    </div>
  );
}

function LiveSystemCard({ system }: { system: LiveSystem }) {
  return (
    <article className="min-w-0">
      <LivePreview system={system} />
      <div className="px-1 pt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-950">{system.name}</h3>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{system.category}</p>
          </div>
          <a
            href={system.siteUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-800 transition hover:border-slate-950 hover:bg-slate-950 hover:text-white"
          >
            Open live <span aria-hidden="true">↗</span>
          </a>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">{system.description}</p>
        <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-800">
          <span className="text-[#B68900]">Built:</span> {system.built}
        </p>
      </div>
    </article>
  );
}

function CoachBrowserCard() {
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const screenshot = coachScreenshots[activeScreenshot];

  return (
    <article className="mt-12 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 text-white shadow-2xl lg:grid lg:grid-cols-[1.25fr_0.75fr]">
      <div className="relative overflow-hidden border-b border-slate-800 p-5 sm:p-7 lg:border-b-0 lg:border-r">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,101,217,0.18),transparent_42%)]" />
        <div className="relative">
          <div className="rounded-[1.15rem] bg-gradient-to-b from-slate-500 via-slate-800 to-black p-[6px] shadow-[0_28px_55px_-26px_rgba(0,0,0,0.9)] ring-1 ring-white/15">
            <div className="pointer-events-none absolute left-1/2 top-[2px] z-10 -translate-x-1/2 rounded-b-lg bg-slate-950 px-4 py-1" aria-hidden="true">
              <span className="block h-1.5 w-1.5 rounded-full bg-slate-700 ring-1 ring-slate-500" />
            </div>
            <div className="relative aspect-video overflow-hidden rounded-[0.8rem] bg-white ring-1 ring-black/60">
              <Image
                key={screenshot.src}
                src={screenshot.src}
                alt={`Coach Browser ${screenshot.label.toLowerCase()} interface`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
            <div className="flex h-4 items-center justify-center" aria-hidden="true"><span className="h-0.5 w-8 rounded-full bg-slate-400/70" /></div>
          </div>
          <MonitorFeet />

          <div className="mt-5 grid grid-cols-3 gap-2" role="group" aria-label="Coach Browser screenshots">
            {coachScreenshots.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setActiveScreenshot(index)}
                aria-pressed={activeScreenshot === index}
                className={`overflow-hidden rounded-lg border text-left transition ${activeScreenshot === index ? 'border-[#F4C430] ring-2 ring-[#F4C430]/25' : 'border-slate-700 opacity-60 hover:border-slate-500 hover:opacity-100'}`}
              >
                <span className="relative block aspect-video bg-slate-900">
                  <Image src={item.src} alt="" fill sizes="20vw" className="object-cover" />
                </span>
                <span className="block truncate bg-slate-900 px-2 py-1.5 text-[10px] font-semibold text-slate-300">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center p-7 lg:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#F4C430]">Working Windows pre-release · Lattice</p>
        <h3 className="mt-3 text-3xl font-bold tracking-tight">Coach Browser</h3>
        <p className="mt-3 text-base leading-relaxed text-slate-300">A local-first research browser where web exploration, notes, canvases, and focused tools stay organized by desktop.</p>
        <p className="mt-5 text-sm font-semibold leading-relaxed text-slate-200"><span className="text-[#F4C430]">Built:</span> Electron and React shell, isolated website tabs, local workspaces, Obsidian-compatible capture, keyboard navigation, packaging, and smoke validation.</p>
        <div className="mt-6 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-300">
          {['Local-first', 'Isolated tabs', 'Markdown', 'JSON Canvas'].map((label) => <span key={label} className="rounded-full border border-slate-700 px-3 py-1.5">{label}</span>)}
        </div>
      </div>
    </article>
  );
}

export function SelectedSystemsSection() {
  return (
    <section id="selected-systems" className="relative scroll-mt-28 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9A7400]">Working proof</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Systems I&apos;ve built</h2>
          <p className="mt-3 text-base text-slate-600">Two live systems and one working desktop prototype. Inspect the work directly.</p>
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-8">
          {liveSystems.map((system) => <LiveSystemCard key={system.name} system={system} />)}
        </div>
        <CoachBrowserCard />
      </div>
    </section>
  );
}
