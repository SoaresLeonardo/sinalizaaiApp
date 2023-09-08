import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { ProviderAplication } from '@/contexts/provider';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700']
});

export const metadata: Metadata = {
  title: 'Sinaliza Ai',
  description:
    'Bem-vindo ao Sinaliza AI, um programa que permite aos usuários reportar problemas em determinadas localidades, juntamente com detalhes específicos sobre a questão. Dessa forma, podemos trabalhar para resolver o problema o mais rápido possível.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={roboto.className}>
        <ProviderAplication>{children}</ProviderAplication>
      </body>
    </html>
  );
}
