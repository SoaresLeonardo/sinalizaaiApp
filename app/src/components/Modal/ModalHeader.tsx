import { ReactNode } from 'react';

export const ModalHeader = ({ children }: { children: ReactNode }) => {
  return (
    <header className="text-zinc-900 p-4">
      <div className=" flex items-center justify-between p-3">{children}</div>
    </header>
  );
};
