'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './chapterDropdown.module.css';

export interface Chapter {
  number: string;
  title: string;
  href: string;
}

interface ChapterDropdownProps {
  currentChapterHref: string;
  currentChapterLabel: string;
  chapters: Chapter[];
}

export function ChapterDropdown({
  currentChapterHref,
  currentChapterLabel,
  chapters,
}: ChapterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = document.body;
    const sidebar = sidebarRef.current;
    const backdrop = backdropRef.current;
    const indicator = indicatorRef.current;

    if (!sidebar || !backdrop || !indicator) return;

    const openSidebar = () => {
      setIsOpen(true);
      body.style.overflow = 'hidden';
    };

    const closeSidebar = () => {
      setIsOpen(false);
      body.style.overflow = '';
    };

    // Toggle sidebar
    indicator.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isOpen) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });

    // Close sidebar when clicking backdrop
    backdrop.addEventListener('click', () => {
      closeSidebar();
    });

    // Close sidebar when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        sidebar &&
        !sidebar.contains(e.target as Node) &&
        indicator &&
        !indicator.contains(e.target as Node)
      ) {
        closeSidebar();
      }
    };

    document.addEventListener('click', handleClickOutside);

    // Close sidebar on scroll (debounced)
    let scrollTimeout: NodeJS.Timeout | null = null;
    const handleScroll = () => {
      if (isOpen) {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          closeSidebar();
        }, 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Close sidebar on escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeSidebar();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleEscape);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ''}`}
      />

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}
      >
        <div className={styles.sidebarTitle}>Working Fundamentals</div>
        <ul className={styles.chapterList}>
          {chapters.map((chapter) => {
            const isCurrent = chapter.href === currentChapterHref;
            return (
              <li key={chapter.href} className={styles.chapterItem}>
                <Link
                  href={chapter.href}
                  className={`${styles.chapterLink} ${isCurrent ? styles.chapterLinkCurrent : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {chapter.number === 'P' ? 'Introduction' : chapter.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Chapter Indicator */}
      <div ref={indicatorRef} className={styles.chapterIndicator}>
        <span>{currentChapterLabel}</span>
        <span className={`${styles.chapterIcon} ${isOpen ? styles.chapterIconOpen : ''}`}>
          ▾
        </span>
      </div>
    </>
  );
}
