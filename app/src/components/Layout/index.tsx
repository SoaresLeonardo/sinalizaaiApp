'use client';

import React, { ReactNode } from 'react';
import { Sidebar } from '../Shared/Sidebar';
import { Navbar } from '../Shared/Navbar';
import { Modal } from '../Modal';
import { X } from 'phosphor-react';
import { useModal } from '@/hooks/modal';

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const { open, setOpen } = useModal();
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          {children}
        </main>
        <Modal.Root isOpen={open}>
          <Modal.Header>
            <Modal.Title>Abrir um novo chamado</Modal.Title>
            <button onClick={() => setOpen(!open)}>
              <X size={20} />
            </button>
          </Modal.Header>
          <Modal.Content>
            <h1>Modal</h1>
          </Modal.Content>
        </Modal.Root>
      </div>
    </div>
  );
};

export default Layout;
