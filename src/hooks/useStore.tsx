import { create } from 'zustand';
import {
  IGradeElement,
  IModalState,
  IUserInfo,
  IUserMiddle,
  IUserPhoto,
  IUserType,
  IUserWrite,
  InputType,
} from '../interface/type';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

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
      name: '',
      sex: '',
      birthday: '',
      blackExam: '',
      parent_name: '',
      parent_tel: '',
      telephone_number: '',
      home_tel: '',
      address: '',
      detail_address: '',
      post_code: '',
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

export const useUserPhoto = create<IUserPhoto>()(
  devtools((set) => ({
    photo: '',
    setUserPhoto: (photo) => set(() => ({ photo })),
  })),
);

export const useUserMiddle = create<IUserMiddle>()(
  devtools((set) => ({
    userMiddle: {
      name: '',
      studentId: 0,
      telephoneNumber: 0,
    },
    setUserMiddle: (e: InputType) =>
      set((state) => {
        const { name, value } = e.currentTarget;
        return { userMiddle: { ...state.userMiddle, [name]: value } };
      }),
    setAllValues: <T,>(initialForm: T) =>
      set((state) => {
        return { userMiddle: { ...state.userMiddle, ...initialForm } };
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
  persist(
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
      setWriteValue: (e: InputType, current: number, index: number) =>
        set((state) => {
          const copiedItems = [...state.gradeElement];
          const { value } = e.currentTarget;
          copiedItems[current][index] = value;
          return { gradeElement: [...copiedItems] };
        }),
    })),
    {
      name: 'user_grade',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useModalStateStore = create<IModalState>()(
  devtools((set) => ({
    modalState: '',
    setModalState: (modalState) => set(() => ({ modalState })),
  })),
);
