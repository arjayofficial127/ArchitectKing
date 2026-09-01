import type { ReactNode } from 'react';
import { createMarketingMetadata } from '@/lib/marketingMetadata';

export const metadata = createMarketingMetadata({
  title: 'Discuss Your System | Arvin Jayson Castro',
  description:
    'Discuss performance, reliability, scalability, permissions, or maintainability concerns with a senior systems architect.',
  path: '/contact-me',
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
