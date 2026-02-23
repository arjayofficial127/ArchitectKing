'use client';

import { useState, useRef, useEffect } from 'react';

interface ContactPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement>;
}

export function ContactPopover({ isOpen, onClose, triggerRef }: ContactPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <>
      {/* Optional overlay */}
      <div 
        className="fixed inset-0 bg-black/4 z-40"
        onClick={onClose}
        aria-hidden="true"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
      />
      
      {/* Popover */}
      <div
        ref={popoverRef}
        role="dialog"
        aria-label="Contact options"
        className="absolute top-full mt-2.5 right-0 w-[333px] border-2 border-[#111111] rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] p-5 z-40"
        style={{
          backgroundColor: '#FFFFFF',
          animation: 'fadeInUp 150ms ease-out',
        }}
      >
        {/* Arrow */}
        <div
          className="absolute -top-[8px] right-6 w-[14px] h-[14px] border-l-2 border-t-2 border-[#111111] rotate-45"
          style={{
            backgroundColor: '#FFFFFF',
          }}
        />

        {/* Title */}
        <div className="text-xs font-semibold text-gray-700 mb-3">
          Connect Directly
        </div>

        {/* Contact Items */}
        <div className="flex flex-col gap-3">
          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/arvinjaysoncastro"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F4C430] transition-colors cursor-pointer group"
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ color: '#111' }}
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span className="text-sm text-gray-900 group-hover:text-[#111] transition-colors">
              linkedin.com/in/arvinjaysoncastro
            </span>
          </a>

          {/* Email */}
          <a
            href="mailto:arvinjaysoncastro@gmail.com"
            className="flex gap-2 p-2 rounded-lg hover:bg-[#F4C430] transition-colors cursor-pointer group"
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ color: '#111' }}
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span className="text-sm text-gray-900 group-hover:text-[#111] transition-colors">
              arvinjaysoncastro@gmail.com
            </span>
          </a>

          {/* Phone */}
          <a
            href="tel:+639627675114"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F4C430] transition-colors cursor-pointer group"
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ color: '#111' }}
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span className="text-sm text-gray-900 group-hover:text-[#111] transition-colors">
              +63 962 767 5114
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
