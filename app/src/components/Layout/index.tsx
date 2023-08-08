'use client';

import React, { ReactNode, useState } from 'react';
import { optionsIrregularidade } from '@/data/options/op.irregularidade';
import { PostChamado } from '@/services/chamados';
import { useMutation } from 'react-query';
import { OptionProps } from '@/data/options/op.type';
import { useSidebar } from '@/hooks/sidebar';
import { useModal } from '@/hooks/modal';
import { List, Spinner, X } from 'phosphor-react';
import { Sidebar } from '../Shared/Sidebar';
import { Header } from '../Shared/Header';
import { Modal } from '../Modal';
import Button from '../Button';
import Combox from '../Combox';
import { useGeoLocation } from '@/hooks/geoLocation';
import imageModal from '../../../public/modalmage.svg';
import Image from 'next/image';

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const { open, setOpen } = useSidebar();
  const { latitudes } = useGeoLocation();
  const { open: openModal, setOpen: setOpenModal } = useModal();
  const [selected, setSelected] = useState<{ option: OptionProps }>({
    option: {
      text: 'Irregularidade',
      value: null
    }
  });

  const createChamado = useMutation(PostChamado, {
    onSuccess: () => {
      console.log('Dados criados com sucesso!');
    },
    onError: (error) => {
      console.log('Error ao criar o chamado', error);
    }
  });

  console.log(createChamado.data);

  const handleSubmit = () => {
    const data = {
      tipoIrregularidade: selected.option.value || 0,
      latitude: latitudes.geoInfo.latitudeX || '',
      longitude: latitudes.geoInfo.latitudeY || '',
      endereco: 'rua cavalo',
      referencia: 'pqp'
    };
    createChamado.mutate(data);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelected({
      option: {
        text: 'Irregularidade',
        value: null
      }
    });
  };

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
            onClick={handleCloseModal}
          >
            <X size={20} />
          </button>
        </Modal.Header>
        <Modal.Content>
          <div className="flex flex-col gap-14 p-6 w-full">
            <div className="flex items-center justify-center">
              <Image
                src={imageModal}
                alt="Modal Image"
                width={280}
                height={280}
              />
            </div>
            <div className="text-zinc-100 flex flex-col gap-5">
              <h1 className="text-lg">
                <strong>Endereço: </strong>Rua senador luiz piza
              </h1>

              {/*Form*/}
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-gray-300">Motivo do chamado</span>
                <Combox
                  selected={selected.option}
                  setSelected={setSelected}
                  options={optionsIrregularidade}
                />
              </div>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <button
            className="flex items-center justify-center text-sm focus:ring-2 rounded-lg disabled-[disabled=true]:bg-gray-300 border border-gray-700 px-5 py-3 text-gray-400"
            onClick={handleCloseModal}
          >
            Finalizar
          </button>
          <Button
            disabled={selected.option.value !== null ? false : true}
            onClick={handleSubmit}
            className="w-24"
          >
            {createChamado.isLoading ? (
              <Spinner size={20} className="animate-spin" />
            ) : (
              <>
                <span>Confirmar</span>
              </>
            )}
          </Button>
        </Modal.Actions>
      </Modal.Root>
    </div>
  );
};

export default Layout;
