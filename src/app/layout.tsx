import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Raheel Parvez Durwesh — AI Software Developer',
  description:
    'Building AI-powered software that solves real-world problems. Portfolio showcasing REX, TableServe, REX AI, and more.',
  keywords: [
    'AI Developer',
    'Python Developer',
    'Software Engineer',
    'Machine Learning',
    'FastAPI',
    'React',
    'Portfolio',
    'Raheel Parvez Durwesh',
  ],
  authors: [{ name: 'Raheel Parvez Durwesh' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Raheel Parvez Durwesh — AI Software Developer',
    description:
      'Building AI-powered software that solves real-world problems.',
    siteName: 'Raheel Parvez Durwesh Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raheel Parvez Durwesh — AI Software Developer',
    description:
      'Building AI-powered software that solves real-world problems.',
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
  return (
    <html lang="en" className={`${jakarta.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-dark text-white antialiased">
        {/* Ambient noise texture overlay */}
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
