import { ReactNode } from 'react';

export const ModalHeader = ({ children }: { children: ReactNode }) => {
  return (
    <header className="text-zinc-200 p-3 border-b border-b-gray-800">
      <div className="flex items-center justify-between p-3">{children}</div>
    </header>
  );
};
