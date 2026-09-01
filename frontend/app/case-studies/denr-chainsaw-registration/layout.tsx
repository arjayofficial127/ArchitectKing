import type { ReactNode } from 'react';
import { createMarketingMetadata } from '@/lib/marketingMetadata';

export const metadata = createMarketingMetadata({
  title: 'Government Registration Platform Case Study | Arvin Jayson Castro',
  description:
    'A secure public-sector platform for equipment registration, permit processing, compliance workflows, and application tracking.',
  path: '/case-studies/denr-chainsaw-registration',
});

export default function RegistrationPlatformLayout({ children }: { children: ReactNode }) {
  return children;
}
