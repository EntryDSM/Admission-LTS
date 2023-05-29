import { create } from 'zustand';
import { GradeElement, UserInfo, UserType, userWrite } from '../interface/type';
import { devtools } from 'zustand/middleware';

export const useUserType = create<UserType>()(
  devtools((set) => ({
    userType: {
      application_type: '',
      is_daejeon: '',
      educational_status: '',
      graduated_at: '',
      application_remark: '',
    },
    setUserType: (name: string, value: string) => set((state) => ({ userType: { ...state.userType, [name]: value } })),
  })),
);

export const useUserInfo = create<UserInfo>()(
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

export const useUserWrite = create<userWrite>()(
  devtools((set) => ({
    userWrite: {
      intro: '',
      study_plan: '',
    },
    setUserWrite: (name: string, value: string) =>
      set((state) => ({ userWrite: { ...state.userWrite, [name]: value } })),
  })),
);

export const useGradeElement = create<GradeElement>()(
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
