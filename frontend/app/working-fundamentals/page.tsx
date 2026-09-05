import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';

import { WorkingFundamentalsPage } from '@/components/book/WorkingFundamentalsPage';

/** Display serif for this route only — the rest of the site keeps Inter. */
const displaySerif = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Working Fundamentals — Notes on Building Software by Arvin Jayson Castro',
  description: 'Working notes on state, data, boundaries, failure, testing, performance, and keeping software understandable as it changes.',
  openGraph: {
    title: 'Working Fundamentals — Notes on Building Software',
    description: 'Working notes on state, data, boundaries, failure, testing, performance, and keeping software understandable as it changes.',
    type: 'website',
  },
};

export default function WorkingFundamentals() {
  return <WorkingFundamentalsPage fontClassName={displaySerif.variable} />;
}
