import type { ReactNode } from 'react';
import { createMarketingMetadata } from '@/lib/marketingMetadata';

export const metadata = createMarketingMetadata({
  title: 'Employee Learning Platform | Arvin Jayson Castro',
  description:
    'An employee learning and certification platform for internal training, module tracking, video delivery, and automated certificates.',
  path: '/case-studies/learning-platform',
});

export default function LearningPlatformLayout({ children }: { children: ReactNode }) {
  return children;
}
