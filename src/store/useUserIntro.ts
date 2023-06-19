import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IUserIntro } from '../interface/type';

export const useUserIntro = create<IUserIntro>()(
  devtools((set) => ({
    userIntro: '',
    setUserIntro: (e) =>
      set((state) => {
        const { value } = e.currentTarget;
        return { ...state, userIntro: value };
      }),
  })),
);
