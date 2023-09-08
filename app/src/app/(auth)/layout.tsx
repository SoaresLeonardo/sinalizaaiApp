import Layout from '@/components/Layout';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  // Toda rota dentro de auth vai ter um layout personalizado
  return <Layout>{children}</Layout>;
}
