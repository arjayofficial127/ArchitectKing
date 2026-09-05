import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { FloatingAudioPlayer } from '@/components/landing/FloatingAudioPlayer';
import { FEATURES } from '@/config/features';
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
  title: 'Arvin Jayson Castro | Software Architect & Technical Lead',
  description: 'Hands-on software architect and technical lead with 16+ years building production systems. Open to architecture, technical leadership, and senior engineering roles.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
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
    title: 'Arvin Jayson Castro | Software Architect & Technical Lead',
    description: 'Hands-on software architect and technical lead. I work with product and engineering teams to make clear technical decisions and deliver reliable systems.',
    images: [
      {
        url: '/og-image.jpg', // Placeholder - should be added
        width: 1200,
        height: 630,
        alt: 'Arvin Jayson Castro - Software Architect and Technical Lead',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arvin Jayson Castro | Software Architect & Technical Lead',
    description: 'Hands-on software architect and technical lead, open to architecture, technical leadership, and senior engineering roles.',
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
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
              jobTitle: 'Software Architect and Technical Lead',
              description: 'Sixteen years designing, building, and helping fix software systems across product development, architecture, delivery, and production.',
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
                'https://linkedin.com/in/arvinjaysoncastro',
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
                    {FEATURES.musicPlayer && <FloatingAudioPlayer />}
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

