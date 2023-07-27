'use client';

import { ReactNode } from 'react';
import { queryClient } from '@/Utils/queryClient';
import { QueryClientProvider } from 'react-query';

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
