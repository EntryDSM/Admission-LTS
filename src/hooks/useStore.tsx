import { create } from 'zustand';
import {
  IGradeElement,
  IModalState,
  IUserInfo,
  IUserMiddleSchool,
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
      is_daejeon: undefined,
      educational_status: '',
      graduated_at: '202001',
      application_remark: null,
      is_out_of_headcount: false,
    },
    graduatedAtArray: ['2020', '01'],
    setUserType: (e: InputType) =>
      set((state) => {
        const { name, value } = e.currentTarget;
        if (name === 'is_daejeon') {
          return { userType: { ...state.userType, is_daejeon: value === 'true' ? !!value : !value } };
        } else if (name === 'application_type' && state.userType.application_type === 'SOCIAL') {
          return { userType: { ...state.userType, [name]: value, application_remark: null } };
        }
        return { userType: { ...state.userType, [name]: value } };
      }),
    setAllValues: <T,>(initialForm: T) =>
      set((state) => {
        return { userType: { ...state.userType, ...initialForm } };
      }),
    setDropdown: (index: number, value: string, type: string) =>
      set((state) => {
        state.graduatedAtArray[index] = value;
        return { userType: { ...state.userType, [type]: state.graduatedAtArray.join('') } };
      }),
  })),
);

export const useUserPhoto = create<IUserPhoto>()(
  devtools((set) => ({
    photo: '',
    setUserPhoto: (photo) => set(() => ({ photo })),
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
    yearArray: ['', '', ''],
    setUserInfo: (e: InputType) =>
      set((state) => {
        const { name, value } = e.currentTarget;
        return { userInfo: { ...state.userInfo, [name]: value } };
      }),
    setAllValues: <T,>(initialForm: T) =>
      set((state) => {
        return { userInfo: { ...state.userInfo, ...initialForm } };
      }),
    setDropdown: (index: number, value: string, type: string) =>
      set((state) => {
        state.yearArray[index] = value;
        return { userInfo: { ...state.userInfo, [type]: state.yearArray.join('') } };
      }),
  })),
);

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
    setAllValues: <T,>(initialForm: T) =>
      set((state) => {
        return { userMiddleSchool: { ...state.userMiddleSchool, ...initialForm } };
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
