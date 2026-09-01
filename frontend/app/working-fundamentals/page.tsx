import type { Metadata } from 'next';
import { WorkingFundamentalsPage } from '@/components/book/WorkingFundamentalsPage';

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
  return <WorkingFundamentalsPage />;
}
