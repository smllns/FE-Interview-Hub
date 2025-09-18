import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Frontend Interview Hub',
  description: 'Space for frontend interview preparation',
  openGraph: {
    title: 'Frontend Interview Hub',
    description: 'Space for frontend interview preparation',
    url: 'https://fe-interview-hub.vercel.app/',
    siteName: 'FE Interview Hub',
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
        alt: 'FE Interview Hub preview',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel='manifest' href='/manifest.json' />
        <meta name='theme-color' content='#000000' />
        <link
          rel='apple-touch-icon'
          sizes='192x192'
          href='/icons/icon-192x192.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='512x512'
          href='/icons/icon-512x512.png'
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (
                    theme === 'dark' ||
                    (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
                  ) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (_) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${robotoMono.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster position='bottom-right' />
      </body>
    </html>
  );
}
