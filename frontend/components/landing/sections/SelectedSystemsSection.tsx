"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { LogoStripFinalBoss } from '../../LogoStripFinalBoss';
import { WorkingFundamentalsShowcase } from './WorkingFundamentalsShowcase';
import armStyles from './monitorArm.module.css';

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
  },
  {
    name: 'baseofui',
    category: 'Multi-tenant workspace platform',
    description: 'A configurable system for websites, forms, files, publishing, portfolios, client workflows, and team operations.',
    built: 'Page builder, tenant isolation, RBAC, installable apps, public portals, and per-organization admin workspaces.',
    previewUrl: 'https://www.baseofui.com/',
    siteUrl: 'https://www.baseofui.com/',
    standSide: 'right',
  },
  {
    name: 'Coach Browser',
    category: 'Local-first research workspace',
    description: 'Keep research, browser tabs, notes, canvases, files, and next steps together inside focused desktop workspaces.',
    built: 'Windows desktop shell, isolated browser tabs, local files, Markdown notes, canvas pages, capture flows, keyboard navigation, and packaging.',
    previewUrl: '/architectking/coach-browser/new-tab.png',
    standSide: 'left',
    previewKind: 'image',
    screenshotAlt: 'Coach Browser research workspace with desktop workspaces, browser tabs, notes, and local files.',
    capabilities: ['Research', 'Capture', 'Organize', 'Local files'],
  },
];

function MonitorFeet({ side = 'left' }: { side?: 'left' | 'right' }) {
  const position = side === 'left' ? 'left-[18%]' : 'left-[82%]';
  const sideClass = side === 'left' ? armStyles.sideLeft : armStyles.sideRight;

  return (
    <div className="relative mx-auto h-28 w-full" aria-hidden="true">
      <div className={`absolute ${position} top-0 -translate-x-1/2 ${armStyles.assembly} ${sideClass}`}>
        {/* VESA mount plate — bolted to the screen's back */}
        <span className={`mx-auto block h-1.5 w-6 rounded-t-sm ${armStyles.mount}`} />

        {/* Upper arm — pivots at the mount */}
        <span className={`mx-auto block h-[34px] w-[7px] ${armStyles.upperArm}`} />

        {/* Elbow joint */}
        <span className={`mx-auto block h-2.5 w-2.5 ${armStyles.elbow}`} />

        {/* Lower arm / gas-spring pole — counter-pivots at the elbow */}
        <span className={`mx-auto block h-[34px] w-2 ${armStyles.lowerArm}`} />

        {/* Desk clamp base — stays put */}
        <span className="relative mx-auto block h-2.5 w-20 -translate-y-px rounded-b-md bg-gradient-to-b from-slate-600 via-slate-800 to-slate-950 shadow-[0_5px_8px_-5px_rgba(15,23,42,0.9)]">
          <span className="absolute bottom-[-5px] left-1/2 h-2.5 w-12 -translate-x-1/2 rounded-full border border-black/60 bg-gradient-to-b from-slate-700 to-slate-950 shadow-[0_8px_12px_-7px_rgba(15,23,42,0.9)]" />
        </span>
      </div>
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
          {system.previewKind === 'image' ? (
            <Image src={system.previewUrl} alt={system.screenshotAlt ?? `${system.name} product preview`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-top" />
          ) : (
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
          )}
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
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const rect = card.getBoundingClientRect();
      const start = viewport * 1.02;
      const finish = viewport * 0.48;
      const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - finish)));
      const distance = Math.min(window.innerWidth * 0.34, 460);
      const direction = system.standSide === 'left' ? -1 : 1;
      card.style.transform = `translate3d(${direction * distance * (1 - progress)}px, 0, 0)`;
      card.style.opacity = `${0.45 + progress * 0.55}`;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, [system.standSide]);

  return (
    <article ref={cardRef} className="min-w-0 will-change-transform motion-reduce:!transform-none motion-reduce:!opacity-100">
      <LivePreview system={system} />
      <div className="px-1 pt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-950">{system.name}</h3>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{system.category}</p>
          </div>
          {system.siteUrl ? (
            <a href={system.siteUrl} target="_blank" rel="noreferrer" className="shrink-0 rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-800 transition hover:border-slate-950 hover:bg-slate-950 hover:text-white">
              Open live <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">{system.description}</p>
        <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-800">
          <span className="text-[#B68900]">What I worked on:</span> {system.built}
        </p>
        {system.capabilities && (
          <div className="mt-4 flex flex-wrap gap-2" aria-label={`${system.name} capabilities`}>
            {system.capabilities.map((capability) => <span key={capability} className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-violet-800">{capability}</span>)}
          </div>
        )}
      </div>
    </article>
  );
}

export function SelectedSystemsSection() {
  return (
    <section id="selected-systems" className="relative overflow-x-clip scroll-mt-28 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9A7400]">Some of my work</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">A few things I&apos;ve built</h2>
          <p className="mt-3 text-base text-slate-600">Two live products, one Windows prototype, and the notes behind how I build.</p>
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {liveSystems.map((system) => <LiveSystemCard key={system.name} system={system} />)}
        </div>
        <div className="mt-10">
          <WorkingFundamentalsShowcase />
        </div>
        <div className="mt-20 border-t border-slate-200 pt-12">
          <p className="text-center text-sm font-semibold text-slate-500">Some of the teams and environments I&apos;ve had the chance to learn from.</p>
          <LogoStripFinalBoss />
        </div>
      </div>
    </section>
  );
}
