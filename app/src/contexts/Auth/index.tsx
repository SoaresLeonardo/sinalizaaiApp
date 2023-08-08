import { createContext } from 'react';
import { IContext } from '@/interfaces/auth/IAuthUserContext';

export const AuthContext = createContext<IContext>({} as IContext);
