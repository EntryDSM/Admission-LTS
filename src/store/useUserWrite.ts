import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IUserWrite, InputType } from '../interface/type';

export const useUserWrite = create<IUserWrite>()(
  devtools((set) => ({
    userWrite: {
      intro: '',
      study_plan: '',
    },
    setUserWrite: (e: InputType) =>
      set((state) => {
        const { name, value } = e.currentTarget;
        return { userWrite: { ...state.userWrite, [name]: value } };
      }),
    setAllValues: <T>(initialForm: T) =>
      set((state) => {
        return { userWrite: { ...state.userWrite, ...initialForm } };
      }),
  })),
);
