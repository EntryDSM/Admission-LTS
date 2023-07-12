import { create } from 'zustand';
import { IUserPhoto } from '../interface/type';
import { devtools } from 'zustand/middleware';

export const useUserPhoto = create<IUserPhoto>()(
  devtools((set) => ({
    photo: '',
    photo_file_name: null,
    setUserPhoto: (photo_file_name) => set(() => ({ photo_file_name })),
    setPhoto: (photo: string) => set(() => ({ photo })),
  })),
);
