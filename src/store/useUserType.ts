import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IUserType, InputType } from '../interface/type';
import { applicationTypeSelector } from '../constant/translate';

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
    dropboxTmp: applicationTypeSelector['기초생활수급자'],
    setUserType: (e: InputType) =>
      set((state) => {
        const { name, value } = e.currentTarget;
        if (name === 'is_daejeon') {
          return { userType: { ...state.userType, is_daejeon: value === 'true' } };
        } else if (name === 'application_type' && state.userType.application_type === 'SOCIAL') {
          return { userType: { ...state.userType, [name]: value, application_remark: null } };
        }
        return { userType: { ...state.userType, [name]: value } };
      }),
    setAllValues: <T>(initialForm: T, tmp?: string) =>
      set((state) => {
        return { userType: { ...state.userType, ...initialForm }, dropboxTmp: tmp || state.dropboxTmp };
      }),
    setDropdown: (index: number, value: string, type: string) =>
      set((state) => {
        state.graduatedAtArray[index] = value;
        return { userType: { ...state.userType, [type]: state.graduatedAtArray.join('') } };
      }),
  })),
);
