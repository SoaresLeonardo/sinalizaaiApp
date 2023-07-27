import { ReactNode } from 'react';

export const ModalHeader = ({ children }: { children: ReactNode }) => {
  return (
    <header className="bg-[#1D2234] border-b border-b-gray-700 text-zinc-50">
      <div className=" flex items-center justify-between p-3">{children}</div>
    </header>
  );
};
