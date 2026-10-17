import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Nexa Solutions | SBCC Consulting • Evidence, Creativity, Impact',
  description: 'Evidence-informed Social and Behavior Change Communication (SBCC), research, strategy and health awareness materials (PDFs, Infographics, Videos) for a healthier and stronger Ethiopia.',
  keywords: ['SBCC Ethiopia', 'Social and Behavior Change Communication', 'Health Awareness Ethiopia', 'Nexa Solutions', 'Behavioral Research', 'Health Communication Materials'],
  authors: [{ name: 'Nexa Solutions' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
