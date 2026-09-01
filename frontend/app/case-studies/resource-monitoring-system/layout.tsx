import type { ReactNode } from 'react';
import { createMarketingMetadata } from '@/lib/marketingMetadata';

export const metadata = createMarketingMetadata({
  title: 'Resource Monitoring System | Arvin Jayson Castro',
  description:
    'A system for resource allocation, capacity planning, operating metrics, and role-based reporting across distributed teams.',
  path: '/case-studies/resource-monitoring-system',
});

export default function ResourceMonitoringLayout({ children }: { children: ReactNode }) {
  return children;
}
