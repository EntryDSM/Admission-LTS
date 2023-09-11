import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IUserIntroduce } from '../interface/type';
import { TextAreaMaxLength } from '../utils/TextAreaMaxLength';

export const useUserIntroduce = create<IUserIntroduce>()(
  devtools((set) => ({
    userIntroduce: '',
    setUserIntroduce: (e) =>
      set((state) => {
        const { value } = e.currentTarget;
        if (state.userIntroduce.length >= TextAreaMaxLength.INTRODUCE) {
          return { ...state, userIntroduce: value.slice(0, TextAreaMaxLength.INTRODUCE) };
        }
        return { ...state, userIntroduce: value };
      }),
  })),
);
