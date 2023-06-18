import { create } from 'zustand';
import { IModalState } from '../interface/type';
import { devtools } from 'zustand/middleware';

export const useModalStateStore = create<IModalState>()(
  devtools((set) => ({
    modalState: '',
    setModalState: (modalState) => set(() => ({ modalState })),
  })),
);
