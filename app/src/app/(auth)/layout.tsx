import Layout from '@/components/Layout';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  // Toda rota dentro de auth vai ter uma estilização diferente;
  return <Layout>{children}</Layout>;
}
