import type { ReactNode } from 'react';
import { createMarketingMetadata } from '@/lib/marketingMetadata';

export const metadata = createMarketingMetadata({
  title: 'Production Systems Case Studies | Arvin Jayson Castro',
  description:
    'Explore production systems designed for knowledge management, enterprise monitoring, manufacturing, public-sector compliance, and complex workflows.',
  path: '/case-studies',
});

export default function CaseStudiesLayout({ children }: { children: ReactNode }) {
  return children;
}
