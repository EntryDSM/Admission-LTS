import { ReactNode, useCallback, useState } from 'react';
import { useModalStateStore } from './useStore';

export const useModal = () => {
  const [modalState, setModalState] = useModalStateStore((store) => [store.modalState, store.setModalState]);

  const close = useCallback(() => {
    setModalState('');
  }, []);

  return {
    close,
    modalState,
    setModalState,
  };
};
