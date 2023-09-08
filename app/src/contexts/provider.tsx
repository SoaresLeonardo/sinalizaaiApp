'use client';

import { ReactNode } from 'react';
import { AuthProvider } from './Auth';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '@/Utils/queryClient';
import { GeoLocationProvider } from './GeoLocation';
import { ModalProvider } from './Modal';
import { SidebarProvider } from './Sidebar';

export function ProviderAplication({ children }: { children: ReactNode }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <ModalProvider>
            <GeoLocationProvider>
              <AuthProvider>{children}</AuthProvider>
            </GeoLocationProvider>
          </ModalProvider>
        </SidebarProvider>
      </QueryClientProvider>
    </>
  );
}
