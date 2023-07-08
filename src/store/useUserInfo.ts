import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IUserInfo, InputType } from '../interface/type';

export const useUserInfo = create<IUserInfo>()(
  devtools((set) => ({
    userInfo: {
      sex: '',
      birthday: '2000-01-01',
      parent_name: '',
      parent_tel: '',
      address: '',
      detail_address: '',
      post_code: '',
    },
    yearArray: ['2000', '01', '01'],
    setUserInfo: (e: InputType) =>
      set((state) => {
        const { name, value } = e.currentTarget;
        return { userInfo: { ...state.userInfo, [name]: value } };
      }),
    setTelephone: (e: InputType) => {
      set((state) => {
        const { name, value } = e.currentTarget;
        const text = value.split('-').join('');
        return { userInfo: { ...state.userInfo, [name]: text } };
      });
    },
    setAllValues: <T>(initialForm: T) =>
      set((state) => {
        return { userInfo: { ...state.userInfo, ...initialForm } };
      }),
    setDropdown: (index: number, value: string, type: string) =>
      set((state) => {
        state.yearArray[index] = value;
        return { userInfo: { ...state.userInfo, [type]: state.yearArray.join('-') } };
      }),
  })),
);
