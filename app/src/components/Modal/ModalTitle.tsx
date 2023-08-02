import { ReactNode } from 'react';

export const ModalTitle = ({ children }: { children: ReactNode }) => {
  return <h1 className="text-xl font-bold">{children}</h1>;
};
