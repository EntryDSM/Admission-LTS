import { create } from 'zustand';
import { IGradeElement, IUserInfo, IUserType, IUserWrite } from '../interface/type';
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
    ㅁㄴㅇㄹ: () => set((state) => ({ userType: { ...state.userType } })),
    setUserType: (name: string, value: string) => set((state) => ({ userType: { ...state.userType, [name]: value } })),
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
    setUserInfo: (name: string, value: string) => set((state) => ({ userInfo: { ...state.userInfo, [name]: value } })),
  })),
);

export const useUserWrite = create<IUserWrite>()(
  devtools((set) => ({
    userWrite: {
      intro: '',
      study_plan: '',
    },
    setUserWrite: (name: string, value: string) =>
      set((state) => ({ userWrite: { ...state.userWrite, [name]: value } })),
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
