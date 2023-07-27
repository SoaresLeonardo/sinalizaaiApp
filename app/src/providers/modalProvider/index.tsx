/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { ModalContext } from '@/contexts/Modal';
import { ReactNode, useState } from 'react';

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
