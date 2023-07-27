import { ReactNode } from 'react';

export const ModalContent = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-1 items-center justify-center p-3">
      {children}
    </div>
  );
};
