import type { ReactNode } from 'react';
import { createMarketingMetadata } from '@/lib/marketingMetadata';

export const metadata = createMarketingMetadata({
  title: 'Manufacturing Inventory Platform Case Study | Arvin Jayson Castro',
  description:
    'A production inventory and operations platform for real-time stock monitoring, automated reordering, and supply-chain reporting.',
  path: '/case-studies/thread-inventory-system',
});

export default function InventorySystemLayout({ children }: { children: ReactNode }) {
  return children;
}
