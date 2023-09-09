import LayoutAPP from '@/templates/layout';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  // Toda rota dentro de auth vai ter um layout personalizado
  return <LayoutAPP>{children}</LayoutAPP>;
}
