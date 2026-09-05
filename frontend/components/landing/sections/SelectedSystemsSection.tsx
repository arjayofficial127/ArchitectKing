"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';


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
    typeLabel: 'Windows prototype',
    screenshotAlt: 'Coach Browser research workspace with desktop workspaces, browser tabs, notes, and local files.',
    capabilities: ['Research', 'Capture', 'Organize', 'Local files'],
  },
  {
    name: 'Working Fundamentals',
    category: 'Book & reading site',
    description: 'A practical, unhurried guide to building software that stays understandable as the users, rules, data, and stakes keep changing.',
    built: 'Thirteen chapters, book structure, and the reading site built to go with it.',
    previewUrl: '/working-fundamentals',
    siteUrl: '/working-fundamentals',
    standSide: 'right',
  },
];

function LivePreview({ system }: { system: LiveSystem }) {
  return (
    <div className="rounded-lg border border-slate-200/80 bg-white shadow-sm">
      <div className="relative aspect-video overflow-hidden rounded-lg">
        {system.previewKind === 'image' ? (
          <Image
            src={system.previewUrl}
            alt={system.screenshotAlt ?? `${system.name} product preview`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
          />
        ) : (
          <iframe
            src={system.previewUrl}
            title={`${system.name} product preview`}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts"
            className="absolute inset-0 h-full w-full border-0 bg-white"
          />
        )}
      </div>
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
      <div className="px-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-950">{system.name}</h3>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{system.category}</p>
            {system.typeLabel ? <p className="mt-1 text-xs font-semibold text-[#9A7400]">{system.typeLabel}</p> : null}
          </div>
          {system.siteUrl ? (
            <a href={system.siteUrl} target="_blank" rel="noreferrer" className="shrink-0 rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-800 transition hover:border-slate-950 hover:bg-slate-950 hover:text-white">
              Open live <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">{system.description}</p>
        <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-800">
          <span className="text-[#B68900]">My contribution.</span> {system.built}
        </p>
        {system.capabilities && (
          <div className="mt-4 flex flex-wrap gap-2" aria-label={`${system.name} capabilities`}>
            {system.capabilities.map((capability) => <span key={capability} className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-violet-800">{capability}</span>)}
          </div>
        )}
      </div>
      <div className="px-1 pt-5">
        <LivePreview system={system} />
      </div>
    </article>
  );
}

export function SelectedSystemsSection() {
  return (
    <section id="selected-systems" className="relative overflow-x-clip scroll-mt-28 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9A7400]">Selected work</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Selected work</h2>
          <p className="mt-3 text-base text-slate-600">Two live products, one Windows prototype, and the book that holds the notes behind how I build.</p>
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-8">
          {liveSystems.slice(0, 2).map((system) => <LiveSystemCard key={system.name} system={system} />)}
        </div>
        <div className="mt-10 grid items-start gap-10 lg:grid-cols-2 lg:gap-8">
          {liveSystems.slice(2, 4).map((system) => <LiveSystemCard key={system.name} system={system} />)}
        </div>
      </div>
    </section>
  );
}
