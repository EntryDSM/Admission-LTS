import { useMutation, useQuery } from '@tanstack/react-query';
import { instance } from '../axios';
import { IGetUserBlackExam, IGetUserInfo, IGetUserType } from './types';

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
    onError: () => alert('전형구분 제출에 실패하였습니다.'),
    onSuccess: () => console.log('success'),
  });
};

/** 인적사항 조회 */
export const GetUserInfo = () => {
  const response = async () => {
    const { data } = await instance.get<IGetUserInfo>(`${router}/users`);
    return data;
  };
  return useQuery(['userInfo'], response);
};

/** 인적사항 입력 */
export const EditUserInfo = () => {
  const response = async (params: IGetUserInfo) => {
    return instance.patch(`${router}/users`, params);
  };
  return useMutation(response, {
    onError: () => alert('인적사항 제출에 실패하였습니다.'),
    onSuccess: () => console.log('success!'),
  });
};

/** 검정고시 조회 */
export const GetUserBlackExam = () => {
  const response = async () => {
    const { data } = await instance.get<IGetUserBlackExam>('score/qualification');
    return data;
  };
  return useQuery(['userBlackExam'], response);
};

/** 검정고시 입력 */
export const EditUserBlackExam = () => {
  const response = async (params: IGetUserBlackExam) => {
    return instance.patch('score/qualification', params);
  };
  return useMutation(response, {
    onError: () => alert('검정고시 제출에 실패하였습니다.'),
    onSuccess: () => console.log('success!!'),
  });
};

/*
졸업 /졸업 예정자 입력
자기소개
학업 계획서
*/
