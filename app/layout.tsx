import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://bardyaxy.github.io/house-and-line/'),
  title: 'House & Line — Hospitality Design & Consulting',
  description:
    'Restaurant concept, front-of-house and kitchen design, permitting, fire systems, and construction—from first sketch to final inspection.',
  applicationName: 'House & Line',
  openGraph: {
    title: 'House & Line — Hospitality Design & Consulting',
    description:
      'Restaurant concept, front-of-house and kitchen design—from first sketch to final inspection.',
    type: 'website',
    siteName: 'House & Line',
    images: [{ url: './og.png', width: 1200, height: 630, alt: 'House & Line — From first sketch to final inspection' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'House & Line — Hospitality Design & Consulting',
    description: 'Restaurant design, permitting, and construction—from first sketch to final inspection.',
    images: ['./og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
