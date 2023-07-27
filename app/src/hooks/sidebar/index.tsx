import { SidebarContext } from '@/contexts/Sidebar';
import { useContext } from 'react';

export const useSidebar = () => {
  const context = useContext(SidebarContext);

  return context;
};
