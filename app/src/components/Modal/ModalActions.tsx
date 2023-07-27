import { ReactNode } from 'react';

export const ModalActions = ({ children }: { children: ReactNode }) => {
  return (
    <footer className="flex w-full justify-end gap-2 p-3">{children}</footer>
  );
};
