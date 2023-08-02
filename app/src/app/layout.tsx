import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import AppProvider from '@/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sinaliza_Ai',
  description: 'Abra seus chamados!'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
