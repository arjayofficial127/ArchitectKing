'use client';

import { useState } from 'react';
import {
  caseStudyGalleryConfig,
  type CaseStudyGalleryId,
} from './caseStudyGalleryConfig';

interface CaseStudyShowcaseGalleryProps {
  studyId: CaseStudyGalleryId;
}

export function CaseStudyShowcaseGallery({ studyId }: CaseStudyShowcaseGalleryProps) {
  const slides = caseStudyGalleryConfig[studyId];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  const goToPrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? slides.length - 1 : currentIndex - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === slides.length - 1 ? 0 : currentIndex + 1,
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPrevious();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    }
  };

  return (
    <section
      aria-label="Case study gallery"
      className="relative"
    >
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
            Product Gallery
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            {activeSlide.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            {activeSlide.description}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 p-1 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur">
          <button
            type="button"
            onClick={goToPrevious}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F4C430] focus:ring-offset-2"
            aria-label="Previous showcase slide"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F4C430] focus:ring-offset-2"
            aria-label="Next showcase slide"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className="group relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-white p-3 shadow-[0_30px_100px_rgba(15,23,42,0.12)] sm:p-4"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <div className="pointer-events-none absolute inset-x-12 top-0 h-24 rounded-full bg-[radial-gradient(circle_at_center,_rgba(244,196,48,0.28),_transparent_68%)] blur-3xl" />

        <div className="mb-3 flex items-center justify-between rounded-[22px] border border-slate-200/80 bg-slate-50/80 px-4 py-3 backdrop-blur sm:px-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
              {activeSlide.eyebrow}
            </p>
            <p className="mt-1 text-sm font-medium text-slate-700">
              Slide {activeIndex + 1} of {slides.length}
            </p>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.12)]" />
            <span className="text-xs font-medium text-slate-500">Preview locked</span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-slate-950/5">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="min-w-full">
                <div className="relative aspect-[16/12] w-full overflow-hidden bg-slate-100 md:aspect-[21/10]">
                  <iframe
                    title={`${slide.title} showcase preview`}
                    src={slide.src}
                    loading="lazy"
                    sandbox="allow-same-origin allow-scripts"
                    className="pointer-events-none absolute inset-0 h-full w-full border-0"
                    tabIndex={-1}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_16%,transparent_84%,rgba(15,23,42,0.06))]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {slides.length > 1 ? (
          <div className="mt-5 flex items-center justify-center gap-3" aria-label="Gallery pagination">
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative h-3 w-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#F4C430] focus:ring-offset-2 ${
                    isActive ? 'scale-110 bg-slate-900' : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Show slide ${index + 1}: ${slide.title}`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span className="sr-only">{slide.title}</span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}