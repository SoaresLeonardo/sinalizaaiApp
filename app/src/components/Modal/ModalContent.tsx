import { ReactNode } from 'react';

export const ModalContent = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-1 p-3">{children}</div>;
};
