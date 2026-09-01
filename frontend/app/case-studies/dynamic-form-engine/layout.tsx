import type { ReactNode } from 'react';
import { createMarketingMetadata } from '@/lib/marketingMetadata';

export const metadata = createMarketingMetadata({
  title: 'Dynamic Form and Identity Engine Case Study | Arvin Jayson Castro',
  description:
    'A configurable form engine supporting complex validation, identity-based workflows, and rule-driven processing.',
  path: '/case-studies/dynamic-form-engine',
});

export default function DynamicFormEngineLayout({ children }: { children: ReactNode }) {
  return children;
}
