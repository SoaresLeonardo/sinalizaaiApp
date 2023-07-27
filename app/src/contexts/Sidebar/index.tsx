import { IContext } from '@/interfaces/ISidebarContext';
import { createContext } from 'react';

export const SidebarContext = createContext<IContext>(null!);
