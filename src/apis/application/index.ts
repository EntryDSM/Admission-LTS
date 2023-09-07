import { useMutation, useQuery } from '@tanstack/react-query';
import { instance } from '../axios';
import { IPatchUserInfo, IPatchUserIntroduce, IPatchUserPhoto, IPatchUserPlan, IPatchUserType } from './types';
import { IPatchUserMiddleSchool } from '../../interface/type';
import { useModal } from '../../hooks/useModal';
import { isAxiosError } from 'axios';
import { Toast } from '@team-entry/design_system';

const router = 'application';

/** 전형 구분 선택 */
export const EditUserType = () => {
  const response = async (param: IPatchUserType) => {
    return instance.patch(`${router}/users/type`, param);
  };
  return useMutation(response, {
    onSuccess: () => console.log('success'),
    onError: () => alert('전형구분 제출에 실패하였습니다.'),
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

/** 증명사진 입력 */
export const EditUserPhto = () => {
  const response = async (params: IPatchUserPhoto) => {
    const form = new FormData();
    form.append('photo', params.photo);
    return instance.post(`${router}/users/photo `, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
  return useMutation(response, {
    onError: () => alert('증명사진 제출에 실패하였습니다.'),
    onSuccess: () => console.log('success!'),
  });
};

/** 유저 이름, 전화번호 조회 */
export const GetUserInfos = () => {
  const response = async () => {
    const { data } = await instance.get<{ name: string; telephone_number: string; is_student: boolean }>(
      `${router}/users/info`,
    );
    return data;
  };
  return useQuery(['userInfos'], response);
};

/** 자기소개서 입력 */
export const EditUserIntroduce = () => {
  const response = async (params: IPatchUserIntroduce) => {
    return instance.patch(`${router}/intro`, params);
  };
  return useMutation(response, {
    onError: () => alert('자기소개서 제출에 실패하였습니다.'),
    onSuccess: () => console.log('success!!!'),
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

/** 최종제출 */
export const SubmitPdf = () => {
  const { setModalState } = useModal();
  const response = async () => {
    return instance.post(`${router}`);
  };
  return useMutation(response, {
    onSuccess: () => setModalState('SUCCESS'),
    onError: (e) => {
      let message = '';
      if (isAxiosError(e)) {
        switch (e.response?.data.message) {
          case 'Application process is not completed':
            message = '완료되지 않은 부분이 존재합니다.';
            break;
          case 'Already submit application.':
            message = '이미 제출된 원서입니다.';
            break;
        }
      }
      Toast(message, { type: 'error' });
    },
  });
};
