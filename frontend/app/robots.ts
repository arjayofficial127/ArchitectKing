import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/superadmin/', '/api/', '/booking/'],
    },
    sitemap: 'https://arvinjaysoncastro.com/sitemap.xml',
    host: 'https://arvinjaysoncastro.com',
  };
}
