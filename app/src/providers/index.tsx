'use client';

import { AuthProvider } from './authProvider';
import { GeoLocationProvider } from './geoLocationProvider';
import { ModalProvider } from './modalProvider';
import { QueryProvider } from './queryProvider';
import { SidebarProvider } from './sidebarProvider';

//Componente onde terá todos os provider necessários para a aplicação;

export default function AppProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <QueryProvider>
        <GeoLocationProvider>
          <ModalProvider>
            <SidebarProvider>
              <AuthProvider>{children}</AuthProvider>
            </SidebarProvider>
          </ModalProvider>
        </GeoLocationProvider>
      </QueryProvider>
    </>
  );
}
