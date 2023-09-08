import { IContext } from '@/interfaces/IModalOpenContext';
import { ReactNode, createContext, useState } from 'react';

export const ModalContext = createContext<IContext>({} as IContext);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
