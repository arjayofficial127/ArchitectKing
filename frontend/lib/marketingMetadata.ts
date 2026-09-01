import type { Metadata } from 'next';

const SITE_URL = 'https://arvinjaysoncastro.com';

interface MarketingMetadataInput {
  title: string;
  description: string;
  path: `/${string}`;
}

export function createMarketingMetadata({
  title,
  description,
  path,
}: MarketingMetadataInput): Metadata {
  const canonicalUrl = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      siteName: 'Arvin Jayson Castro',
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
