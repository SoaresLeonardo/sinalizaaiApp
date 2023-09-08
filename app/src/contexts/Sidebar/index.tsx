import { IContext } from '@/interfaces/ISidebarContext';
import { ReactNode, createContext, useState } from 'react';

export const SidebarContext = createContext<IContext>(null!);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};
