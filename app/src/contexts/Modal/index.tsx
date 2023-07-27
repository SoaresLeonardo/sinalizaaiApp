import { IContext } from '@/interfaces/IModalOpenContext';
import { createContext } from 'react';

export const ModalContext = createContext<IContext>({} as IContext);
