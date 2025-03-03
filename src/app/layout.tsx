import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

// Metadata needs to be in a separate constant since it can't be used in client components
export const metadata: Metadata = {
  title: 'Ubongo Maarifa',
  description: 'Early Childhood Development Educational Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-background">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
