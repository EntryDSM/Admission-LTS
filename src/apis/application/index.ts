import { useMutation } from '@tanstack/react-query';
import { instance } from '../axios';
import { IPatchUserBlackExam, IPatchUserInfo, IPatchUserIntro, IPatchUserPlan, IPatchUserType } from './types';

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

/** 검정고시 입력 */
export const EditUserBlackExam = () => {
  const response = async (params: IPatchUserBlackExam) => {
    return instance.patch('score/qualification', params);
  };
  return useMutation(response, {
    onError: () => alert('검정고시 제출에 실패하였습니다.'),
    onSuccess: () => console.log('success!!'),
  });
};

/** 자기소개서 입력 */
export const EditUserIntro = () => {
  const response = async (params: IPatchUserIntro) => {
    return instance.patch('intro', params);
  };
  return useMutation(response, {
    onError: () => alert('자기소개서 제출에 실패하였습니다.'),
    onSuccess: () => console.log('success!!'),
  });
};

/** 학업계획서 입력 */
export const EditUserPlan = () => {
  const response = async (params: IPatchUserPlan) => {
    return instance.patch('study-plan', params);
  };
  return useMutation(response, {
    onError: () => alert('학업계획서 제출에 실패하였습니다.'),
    onSuccess: () => console.log('success!!'),
  });
};

/*
졸업 /졸업 예정자 입력
자기소개
학업 계획서
*/
