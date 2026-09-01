import type { ReactNode } from 'react';
import { createMarketingMetadata } from '@/lib/marketingMetadata';

export const metadata = createMarketingMetadata({
  title: 'Find a Time to Talk | Arvin Jayson Castro',
  description:
    'Choose a time to talk through what you are working on and see whether Arvin can help.',
  path: '/schedule',
});

export default function ScheduleLayout({ children }: { children: ReactNode }) {
  return children;
}
