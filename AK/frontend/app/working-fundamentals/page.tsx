import type { Metadata } from 'next';
import Link from 'next/link';
import { WorkingFundamentalsPage } from '@/components/book/WorkingFundamentalsPage';

export const metadata: Metadata = {
  title: 'Working Fundamentals — Systems Architecture Guide by Arvin Jayson Castro',
  description: 'A concise, practical guide to building software that lasts — patterns, checklists, and pragmatic examples from a senior software architect.',
  openGraph: {
    title: 'Working Fundamentals — Systems Architecture Guide',
    description: 'A concise, practical guide to building software that lasts — patterns, checklists, and pragmatic examples.',
    type: 'website',
  },
};

export default function WorkingFundamentals() {
  return <WorkingFundamentalsPage />;
}
