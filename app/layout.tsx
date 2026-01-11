import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/contexts/ToastContext';

export const metadata: Metadata = {
  title: 'QuickBid Pro - Trade Contractor Estimating Software',
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
  openGraph: {
    title: 'QuickBid Pro - Trade Contractor Estimating Software',
    description:
      'Professional estimating software for HVAC, plumbing, electrical, and roofing contractors.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
