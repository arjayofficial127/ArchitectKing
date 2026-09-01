import type { ReactNode } from 'react';
import { createMarketingMetadata } from '@/lib/marketingMetadata';

export const metadata = createMarketingMetadata({
  title: 'Forms Workflow System | Arvin Jayson Castro',
  description:
    'A metadata-driven forms platform supporting conditional logic, validation, approvals, and secure workflow automation.',
  path: '/case-studies/custom-forms-management',
});

export default function FormsManagementLayout({ children }: { children: ReactNode }) {
  return children;
}
