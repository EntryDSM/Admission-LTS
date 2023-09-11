import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IUserPlan } from '../interface/type';
import { TextAreaMaxLength } from '../utils/TextAreaMaxLength';

export const useUserPlan = create<IUserPlan>()(
  devtools((set) => ({
    userPlan: '',
    setUserPlan: (e) =>
      set((state) => {
        const { value } = e.currentTarget;
        if (state.userPlan.length >= TextAreaMaxLength.STUDY_PLAN) {
          return { ...state, userPlan: value.slice(0, TextAreaMaxLength.STUDY_PLAN) };
        }
        return { ...state, userPlan: value };
      }),
  })),
);
