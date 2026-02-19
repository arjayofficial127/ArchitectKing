import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastContainer } from '@/lib/toast';
import ConditionalFooter from '@/components/layout/ConditionalFooter';
import { ErrorBoundary } from '@/components/errors/ErrorBoundary';
import { ConnectivityAwarenessBanner } from '@/components/system/ConnectivityAwarenessBanner';
import { QueryProvider } from '@/providers/QueryProvider';
import { AuthSessionProvider } from '@/providers/AuthSessionProvider';
import { OrgSessionProvider } from '@/providers/OrgSessionProvider';
import { MetadataIndexProvider } from '@/providers/MetadataIndexProvider';
import { HydratedContentProvider } from '@/providers/HydratedContentProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://arvinjaysoncastro.com'),
  title: 'Arvin Jayson Castro | Senior Fullstack Architect | React Next.js .NET Node',
  description: '15 years experience. Senior Fullstack Architect specializing in React, Next.js, .NET, Node.js. Multi-tenant SaaS systems, production-grade architecture, system design. Available for architecture calls and consulting.',
  keywords: [
    'Senior Fullstack Developer Philippines',
    'React Next.js Architect',
    'System Architect',
    'Tech Lead Philippines',
    'Fullstack Engineer',
    'Multi-tenant SaaS',
    'Production Systems',
    'Software Architecture',
  ],
  authors: [{ name: 'Arvin Jayson Castro' }],
  creator: 'Arvin Jayson Castro',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://arvinjaysoncastro.com',
    siteName: 'Arvin Jayson Castro',
    title: 'Arvin Jayson Castro | Senior Fullstack Architect',
    description: '15 years experience. Senior Fullstack Architect specializing in React, Next.js, .NET, Node.js. Multi-tenant SaaS systems, production-grade architecture.',
    images: [
      {
        url: '/og-image.jpg', // Placeholder - should be added
        width: 1200,
        height: 630,
        alt: 'Arvin Jayson Castro - Senior Fullstack Architect',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arvin Jayson Castro | Senior Fullstack Architect',
    description: '15 years experience. Senior Fullstack Architect specializing in React, Next.js, .NET, Node.js.',
    creator: '@arvinjaysoncastro', // Placeholder - update if available
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://arvinjaysoncastro.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data - Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Arvin Jayson Castro',
              jobTitle: 'Senior Fullstack Architect',
              description: '15 years experience. Senior Fullstack Architect specializing in React, Next.js, .NET, Node.js. Multi-tenant SaaS systems, production-grade architecture.',
              email: 'arvinjaysoncastro@gmail.com',
              alumniOf: {
                '@type': 'EducationalOrganization',
                name: 'University of Santo Tomas',
                department: 'Computer Science',
              },
              knowsAbout: [
                'React',
                'Next.js',
                'TypeScript',
                'Node.js',
                '.NET',
                'Multi-tenant SaaS',
                'System Architecture',
                'Fullstack Development',
              ],
              url: 'https://arvinjaysoncastro.com',
              sameAs: [
                'https://www.linkedin.com/in/arvinjaysoncastro',
                'https://www.github.com/arvinjaysoncastro',
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <AuthSessionProvider>
          <OrgSessionProvider>
            <MetadataIndexProvider>
              <HydratedContentProvider>
                <QueryProvider>
                  <ErrorBoundary>
                    <ConnectivityAwarenessBanner />
                    <div className="flex flex-col min-h-screen">
                      {children}
                      <ConditionalFooter />
                    </div>
                    {/* ToastContainer must be here for toasts to show globally */}
                    <ToastContainer />
                  </ErrorBoundary>
                </QueryProvider>
              </HydratedContentProvider>
            </MetadataIndexProvider>
          </OrgSessionProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}

