import type { ReactNode } from 'react';
import { createMarketingMetadata } from '@/lib/marketingMetadata';

export const metadata = createMarketingMetadata({
  title: 'Tell Me What You Are Working On | Arvin Jayson Castro',
  description:
    'Tell me what you are building, what is getting in the way, or what you are unsure about. A short note is enough.',
  path: '/contact-me',
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
