import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { IUserMiddleSchool, IUserMiddleSchoolName, InputType } from '../interface/type';

export const useUserMiddleSchool = create<IUserMiddleSchool>()(
  devtools((set) => ({
    userMiddleSchool: {
      student_number: '',
      school_code: '',
      school_tel: '',
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

export const useUserMiddleSchoolName = create<IUserMiddleSchoolName>()(
  persist(
    devtools((set) => ({
      schoolName: '',
      setSchoolName: (schoolName: string) =>
        set(() => {
          return { schoolName };
        }),
    })),
    {
      name: 'school_name',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
