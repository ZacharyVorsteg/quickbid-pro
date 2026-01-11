import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/contexts/ToastContext';
import { CookieConsent } from '@/components/CookieConsent';

export const metadata: Metadata = {
  metadataBase: new URL('https://quickbidpro.com'),
  title: {
    default: 'QuickBid Pro - Trade Contractor Estimating Software',
    template: '%s | QuickBid Pro',
  },
  description:
    'Professional estimating software for HVAC, plumbing, electrical, and roofing contractors. Create accurate estimates in minutes, not hours.',
  keywords: [
    'contractor estimating',
    'HVAC estimates',
    'plumbing estimates',
    'electrical estimates',
    'roofing estimates',
    'trade contractor software',
    'construction estimating',
  ],
  authors: [{ name: 'QuickBid Pro' }],
  creator: 'QuickBid Pro',
  publisher: 'QuickBid Pro',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://quickbidpro.com',
    siteName: 'QuickBid Pro',
    title: 'QuickBid Pro - Trade Contractor Estimating Software',
    description:
      'Professional estimating software for HVAC, plumbing, electrical, and roofing contractors. Create accurate estimates in minutes, not hours.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'QuickBid Pro - Trade Contractor Estimating Software',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuickBid Pro - Trade Contractor Estimating Software',
    description:
      'Professional estimating software for HVAC, plumbing, electrical, and roofing contractors.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'QuickBid Pro',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'Professional estimating software for trade contractors.',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '79',
      highPrice: '149',
      priceCurrency: 'USD',
      offerCount: '2',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '2000',
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ToastProvider>
          {children}
          <CookieConsent />
        </ToastProvider>
      </body>
    </html>
  );
}
