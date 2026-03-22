"use client";

import React from 'react';

type IconProps = {
  className?: string;
};

export const EmailIcon: React.FC<IconProps> = ({ className = 'w-5 h-5 md:w-6 md:h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export const LinkedInIcon: React.FC<IconProps> = ({ className = 'w-5 h-5 md:w-6 md:h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2h0" />
    <rect x="2" y="9" width="4" height="12" rx="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ className = 'w-5 h-5 md:w-6 md:h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M22 16.92V21a1 1 0 01-1.11 1A19 19 0 013 4.11 1 1 0 014 3h4.09a1 1 0 011 .75c.12.7.36 1.37.7 2a1 1 0 01-.24 1L8.91 9.09a16 16 0 006 6l1.34-1.34a1 1 0 011-.24c.63.34 1.3.58 2 .7a1 1 0 01.75 1V21z" />
  </svg>
);

export const CONTACT_ICON_MAP = {
  email: EmailIcon,
  linkedin: LinkedInIcon,
  phone: PhoneIcon,
} as const;

export type ContactIconType = keyof typeof CONTACT_ICON_MAP;

export default CONTACT_ICON_MAP;
