import { ModalContext } from '@/contexts/Modal';
import { useContext } from 'react';

export const useModal = () => {
  const context = useContext(ModalContext);

  return context;
};
