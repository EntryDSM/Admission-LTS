import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IUserPlan } from '../interface/type';

export const useUserPlan = create<IUserPlan>()(
  devtools((set) => ({
    userPlan: '',
    setUserPlan: (e) =>
      set((state) => {
        const { value } = e.currentTarget;
        return { ...state, userPlan: value };
      }),
  })),
);
