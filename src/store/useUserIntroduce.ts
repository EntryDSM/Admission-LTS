import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IUserIntroduce } from '../interface/type';

export const useUserIntroduce = create<IUserIntroduce>()(
  devtools((set) => ({
    userIntroduce: '',
    setUserIntroduce: (e) =>
      set((state) => {
        const { value } = e.currentTarget;
        return { ...state, userIntroduce: value };
      }),
  })),
);
