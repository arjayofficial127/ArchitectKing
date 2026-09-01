import type { ReactNode } from 'react';
import { createMarketingMetadata } from '@/lib/marketingMetadata';

export const metadata = createMarketingMetadata({
  title: 'Organization, Roles and Billing Case Study | Arvin Jayson Castro',
  description:
    'A system for organization-based access control, role management, time entry, and billing workflows.',
  path: '/case-studies/org-role-billing',
});

export default function OrganizationBillingLayout({ children }: { children: ReactNode }) {
  return children;
}
