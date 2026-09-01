import type { ReactNode } from 'react';
import { createMarketingMetadata } from '@/lib/marketingMetadata';

export const metadata = createMarketingMetadata({
  title: 'Systems I Have Worked On | Arvin Jayson Castro',
  description:
    'Notes on systems for knowledge work, resource monitoring, manufacturing, public-sector compliance, and configurable workflows.',
  path: '/case-studies',
});

export default function CaseStudiesLayout({ children }: { children: ReactNode }) {
  return children;
}
