import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://bardyaxy.github.io/house-and-line/'),
  title: 'Robert Stocker — Hospitality Concepts & Design Services',
  description:
    'Founder-led restaurant concept, design, permitting, and construction by Tacoma restaurateur and restaurant designer Robert Stocker.',
  applicationName: 'Hospitality Concepts and Design Services',
  openGraph: {
    title: 'Robert Stocker — Hospitality Concepts & Design Services',
    description:
      'Restaurateur, concept creator, and restaurant designer—from first sketch to final inspection.',
    type: 'website',
    siteName: 'Hospitality Concepts and Design Services',
    images: [{ url: './og.png', width: 1200, height: 630, alt: 'Robert Stocker — Hospitality Concepts & Design Services — Restaurateur, creator, designer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Robert Stocker — Hospitality Concepts & Design Services',
    description: 'Restaurateur, concept creator, and restaurant designer—from first sketch to final inspection.',
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
