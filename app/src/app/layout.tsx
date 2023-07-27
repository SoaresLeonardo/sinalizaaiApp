import { AuthProvider } from '@/providers/authProvider';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { QueryProvider } from '@/providers/queryProvider';
import { SidebarProvider } from '@/providers/sidebarProvider';
import { ModalProvider } from '@/providers/modalProvider';
import { GeoLocationProvider } from '@/providers/geoLocationProvider';

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
        <QueryProvider>
          <GeoLocationProvider>
            <ModalProvider>
              <SidebarProvider>
                <AuthProvider>{children}</AuthProvider>
              </SidebarProvider>
            </ModalProvider>
          </GeoLocationProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
