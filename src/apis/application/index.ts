import { useMutation } from '@tanstack/react-query';
import { instance } from '../axios';
import { IPatchUserInfo, IPatchUserIntroduce, IPatchUserPlan, IPatchUserType } from './types';
import { IPatchUserMiddleSchool } from '../../interface/type';

const router = 'application';

/** 전형 구분 선택 */
export const EditUserType = () => {
  const response = async (param: IPatchUserType) => {
    return instance.patch(`${router}/users/type`, param);
  };
  return useMutation(response, {
    onError: () => alert('전형구분 제출에 실패하였습니다.'),
    onSuccess: () => console.log('success'),
  });
};

/** 인적사항 입력 */
export const EditUserInfo = () => {
  const response = async (params: IPatchUserInfo) => {
    return instance.patch(`${router}/users`, params);
  };
  return useMutation(response, {
    onError: () => alert('인적사항 제출에 실패하였습니다.'),
    onSuccess: () => console.log('success!'),
  });
};

/** 자기소개서 입력 */
export const EditUserIntroduce = () => {
  const response = async (params: IPatchUserIntroduce) => {
    return instance.patch(`${router}/intro`, params);
  };
  return useMutation(response, {
    onError: () => alert('자기소개서 제출에 실패하였습니다.'),
    onSuccess: () => console.log('success!!'),
  });
};

/** 학업계획서 입력 */
export const EditUserPlan = () => {
  const response = async (params: IPatchUserPlan) => {
    return instance.patch(`${router}/study-plan`, params);
  };
  return useMutation(response, {
    onError: () => alert('학업계획서 제출에 실패하였습니다.'),
    onSuccess: () => console.log('success!!'),
  });
};

/** 졸업/졸업예정 추가정보 입력 */
export const EditAdditionalInfo = () => {
  const response = async (params: IPatchUserMiddleSchool) => {
    return instance.patch(`${router}/users/graduation`, params);
  };
  return useMutation(response, {
    onSuccess: () => console.log('success'),
    onError: () => alert('에러'),
  });
};

/*
졸업 /졸업 예정자 입력
자기소개
학업 계획서
*/
