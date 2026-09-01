import type { ReactNode } from 'react';
import { createMarketingMetadata } from '@/lib/marketingMetadata';

export const metadata = createMarketingMetadata({
  title: 'AiruNote Knowledge Workspace | Arvin Jayson Castro',
  description:
    'A knowledge workspace for notes, documents, boards, canvases, assessments, and AI-assisted capture.',
  path: '/case-studies/airunote',
});

export default function AiruNoteLayout({ children }: { children: ReactNode }) {
  return children;
}
