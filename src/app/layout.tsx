import {ClerkProvider} from '@clerk/nextjs';
import {Inter} from 'next/font/google';
import './globals.css';
import Providers from '@/components/providers';

const inter = Inter({subsets: ['latin']});

export const metadata = {
  title: 'SchoolOS',
  description: 'Track your studying progress and visualize your efforts',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={inter.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
