import { ReactNode } from 'react';

export const ModalTitle = ({ children }: { children: ReactNode }) => {
  return <p className="text-base font-bold">{children}</p>;
};
