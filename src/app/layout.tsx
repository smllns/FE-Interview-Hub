import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/components/useAuth';

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
        alt: 'Lunera preview',
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
