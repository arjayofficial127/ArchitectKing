import type { MetadataRoute } from 'next';

const SITE_URL = 'https://arvinjaysoncastro.com';

const caseStudyPaths = [
  '/case-studies/airunote',
  '/case-studies/resource-monitoring-system',
  '/case-studies/thread-inventory-system',
  '/case-studies/denr-chainsaw-registration',
  '/case-studies/custom-forms-management',
] as const;

const bookPaths = [
  '/working-fundamentals',
  '/working-fundamentals-introduction',
  '/working-fundamentals-1-of-13-programming-fundamentals',
  '/working-fundamentals-2-of-13-data-structures',
  '/working-fundamentals-3-of-13-algorithms-and-complexity',
  '/working-fundamentals-4-of-13-control-and-flow',
  '/working-fundamentals-5-of-13-state-and-change',
  '/working-fundamentals-6-of-13-design-principles',
  '/working-fundamentals-7-of-13-architecture',
  '/working-fundamentals-8-of-13-persistence-and-data-modeling',
  '/working-fundamentals-9-of-13-interfaces-and-apis',
  '/working-fundamentals-10-of-13-errors-and-failure',
  '/working-fundamentals-11-of-13-testing',
  '/working-fundamentals-12-of-13-performance-and-scale',
  '/working-fundamentals-13-of-13-the-developers-role',
  '/working-fundamentals-outroduction',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const primaryPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/architecture-review`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/case-studies`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/contact-me`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${SITE_URL}/schedule`, changeFrequency: 'weekly', priority: 0.8 },
  ];

  const caseStudies: MetadataRoute.Sitemap = caseStudyPaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: 'yearly',
    priority: 0.7,
  }));

  const bookPages: MetadataRoute.Sitemap = bookPaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: 'yearly',
    priority: path === '/working-fundamentals' ? 0.8 : 0.6,
  }));

  return [...primaryPages, ...caseStudies, ...bookPages];
}
