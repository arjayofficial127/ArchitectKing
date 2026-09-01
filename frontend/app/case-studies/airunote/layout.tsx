import type { ReactNode } from 'react';
import { createMarketingMetadata } from '@/lib/marketingMetadata';

export const metadata = createMarketingMetadata({
  title: 'AI Wiki Team Hub Case Study | Arvin Jayson Castro',
  description:
    'A privacy-first knowledge management system for AI-assisted capture, document organization, and modular enterprise workflows.',
  path: '/case-studies/airunote',
});

export default function AiruNoteLayout({ children }: { children: ReactNode }) {
  return children;
}
