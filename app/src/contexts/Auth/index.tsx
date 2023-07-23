import { createContext } from 'react';
import { IContext } from '@/interfaces/IAuthUserContext';

export const AuthContext = createContext<IContext>({} as IContext);
