import { IContext } from '@/interfaces/IGeoLocationContext';
import { createContext } from 'react';

export const GeoLocationContext = createContext<IContext>({} as IContext);
