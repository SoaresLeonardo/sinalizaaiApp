import { SidebarContext } from '@/contexts/Sidebar';
import { ReactNode, useState } from 'react';

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};
