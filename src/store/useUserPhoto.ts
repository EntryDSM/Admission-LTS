import { create } from 'zustand';
import { IUserPhoto } from '../interface/type';
import { devtools } from 'zustand/middleware';

export const useUserPhoto = create<IUserPhoto>()(
  devtools((set) => ({
    photo_file_name: '',
    setUserPhoto: (photo_file_name) => set(() => ({ photo_file_name })),
  })),
);
