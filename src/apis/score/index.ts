import { useMutation } from '@tanstack/react-query';
import { instance } from '../axios';
import { IPatchUserBlackExam } from './type';

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
