import { useMutation, useQuery } from '@tanstack/react-query';
import { instance } from '../axios';
import { IGetUserType } from './types';

const router = 'application';

/** 전형 구분 조회 */
export const GetUserType = () => {
  const response = async () => {
    const { data } = await instance.get<IGetUserType>(`${router}/users/type`);
    return data;
  };
  return useQuery(['userType'], response);
};

/** 전형 구분 선택 */
export const EditUserType = () => {
  const response = async (param: IGetUserType) => {
    return instance.patch(`${router}/users/type`, param);
  };
  return useMutation(response, {
    onError: () => alert('제출에 실패하였습니다.'),
    onSuccess: () => console.log('success'),
  });
};
