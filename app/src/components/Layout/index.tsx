'use client';

import { useSidebar } from '@/hooks/sidebar';
import { List, X } from 'phosphor-react';
import { Sidebar } from '../Shared/Sidebar';
import { Header } from '../Shared/Header';
import React, { ReactNode } from 'react';
import { Modal } from '../Modal';
import { useModal } from '@/hooks/modal';
import Button from '../Button';

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const { open, setOpen } = useSidebar();
  const { open: openModal, setOpen: setOpenModal } = useModal();
  return (
    <div className="min-h-screen grid grid-col-1 lg:grid-cols-6">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Content */}
      <div className="col-span-5 bg-[#0a0f17]">
        {/* Header Component */}
        <Header />

        {/* Main Content */}
        <main>{children}</main>
      </div>

      {/*Menu Sidebar*/}
      <button
        onClick={() => setOpen(!open)}
        className="block lg:hidden fixed bottom-4 right-4 bg-[#7E3AF2] p-2 text-zinc-50 rounded-full"
      >
        {open ? <X size={20} /> : <List size={20} />}
      </button>

      {/*Modal Form Context*/}
      <Modal.Root isOpen={openModal}>
        <Modal.Header>
          <Modal.Title>Abrir um chamado.</Modal.Title>

          <button
            className="text-zinc-100 bg-[#242c37] p-2 rounded-md"
            onClick={() => setOpenModal(false)}
          >
            <X size={20} />
          </button>
        </Modal.Header>
        <Modal.Content>
          <div className="flex flex-col gap-5 p-6">
            <div className="text-neutral-200">
              <h2>Endereço: Rua senador luiz piza</h2>
              {/*Form*/}
              <div className="w-72">
                <select>
                  <option value=""></option>
                </select>
              </div>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button>Finalizar</Button>
        </Modal.Actions>
      </Modal.Root>
    </div>
  );
};

export default Layout;
