import { ReactNode } from 'react';

export const ModalHeader = ({ children }: { children: ReactNode }) => {
  return (
    <header className="text-zinc-800 p-3 border-b border-gray-300">
      <div className="flex items-center justify-between p-3">{children}</div>
    </header>
  );
};
