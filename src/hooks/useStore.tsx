import { create } from 'zustand';
import { IGradeElement, IUserInfo, IUserType, IUserWrite, InputType } from '../interface/type';
import { devtools } from 'zustand/middleware';

export const useUserType = create<IUserType>()(
  devtools((set) => ({
    userType: {
      application_type: '',
      is_daejeon: '',
      educational_status: '',
      graduated_at: '',
      application_remark: '',
    },
    setUserType: (e: InputType) =>
      set((state) => {
        const { name, value } = e.currentTarget;
        return { userType: { ...state.userType, [name]: value } };
      }),
    setAllValues: <T,>(initialForm: T) =>
      set((state) => {
        return { userType: { ...state.userType, ...initialForm } };
      }),
  })),
);

export const useUserInfo = create<IUserInfo>()(
  devtools((set) => ({
    userInfo: {
      img: '',
      name: '',
      sex: '',
      birthday: '',
      blackExam: '',
      parent_name: '',
      parent_tel: '',
      telephone_number: '',
    },
    setUserInfo: (e: InputType) =>
      set((state) => {
        const { name, value } = e.currentTarget;
        return { userInfo: { ...state.userInfo, [name]: value } };
      }),
    setAllValues: <T,>(initialForm: T) =>
      set((state) => {
        return { userInfo: { ...state.userInfo, ...initialForm } };
      }),
  })),
);

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
    setAllValues: <T,>(initialForm: T) =>
      set((state) => {
        return { userWrite: { ...state.userWrite, ...initialForm } };
      }),
  })),
);

export const useGradeElement = create<IGradeElement>()(
  devtools((set) => ({
    gradeElement: [
      ['A', 'A', 'A', 'A', 'A', 'A', 'A'],
      ['A', 'A', 'A', 'A', 'A', 'A', 'A'],
      ['A', 'A', 'A', 'A', 'A', 'A', 'A'],
      ['', '', '', '', ''],
      ['', '', ''],
    ],
    setElementValue: (current: number, index: number, value: string) =>
      set((state) => {
        const copiedItems = [...state.gradeElement];
        copiedItems[current][index] = value;
        return { gradeElement: copiedItems };
      }),
    setAllGrade: (current: number, grade: string) =>
      set((state) => {
        const copiedItems = [...state.gradeElement];
        copiedItems[current] = copiedItems[current].map(() => {
          return grade;
        });
        return { gradeElement: [...copiedItems] };
      }),
  })),
);
