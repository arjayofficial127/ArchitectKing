import type { ReactNode } from 'react';
import { createMarketingMetadata } from '@/lib/marketingMetadata';

export const metadata = createMarketingMetadata({
  title: 'Book a Systems Architecture Call | Arvin Jayson Castro',
  description:
    'Choose a time to discuss your system architecture, scaling risks, reliability concerns, and practical next steps with Arvin Jayson Castro.',
  path: '/schedule',
});

export default function ScheduleLayout({ children }: { children: ReactNode }) {
  return children;
}
