import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IUserMiddleSchool, InputType } from '../interface/type';

export const useUserMiddleSchool = create<IUserMiddleSchool>()(
  devtools((set) => ({
    userMiddleSchool: {
      name: '',
      studentId: undefined,
      telephoneNumber: undefined,
    },
    setUserMiddleSchool: (e: InputType) =>
      set((state) => {
        const { name, value } = e.currentTarget;
        return { userMiddleSchool: { ...state.userMiddleSchool, [name]: value } };
      }),
    setAllValues: <T>(initialForm: T) =>
      set((state) => {
        return { userMiddleSchool: { ...state.userMiddleSchool, ...initialForm } };
      }),
  })),
);
