import { useMutation } from '@tanstack/react-query';
import { instance } from '../axios';
import { IPatchGraduation, IPatchUserBlackExam } from './type';

const router = 'score';

/** 검정고시 입력 */
export const EditUserBlackExam = () => {
  const response = async (params: IPatchUserBlackExam) => {
    return instance.patch(`${router}/qualification`, params);
  };
  return useMutation(response, {
    onError: () => alert('검정고시 제출에 실패하였습니다.'),
    onSuccess: () => console.log('success!!'),
  });
};

/** 미졸업자/졸업자 정보입력 */
export const EditUserGraduation = () => {
  const response = async (params: IPatchGraduation) => {
    return instance.patch(`${router}/graduation`, params);
  };
  return useMutation(response, {
    onError: () => alert('성적산출에 실패하였습니다.'),
    onSuccess: () => console.log('success!!!'),
  });
};
