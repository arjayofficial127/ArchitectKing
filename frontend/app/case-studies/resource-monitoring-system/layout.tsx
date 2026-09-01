import type { ReactNode } from 'react';
import { createMarketingMetadata } from '@/lib/marketingMetadata';

export const metadata = createMarketingMetadata({
  title: 'Enterprise Resource Monitoring Case Study | Arvin Jayson Castro',
  description:
    'An enterprise platform for resource visibility, capacity planning, operational metrics, and role-based reporting across distributed teams.',
  path: '/case-studies/resource-monitoring-system',
});

export default function ResourceMonitoringLayout({ children }: { children: ReactNode }) {
  return children;
}
