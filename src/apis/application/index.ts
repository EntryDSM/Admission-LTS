import { useMutation, useQuery } from '@tanstack/react-query';
import { instance } from '../axios';
import {
  IGetUSerType,
  IPatchUserInfo,
  IPatchUserIntroduce,
  IPatchUserPhoto,
  IPatchUserPlan,
  IPatchUserType,
  IUserMiddleSchool,
} from './types';
import { IPatchUserMiddleSchool } from '../../interface/type';
import { useModal } from '../../hooks/useModal';
import { Toast } from '@team-entry/design_system';
import { isAxiosError } from 'axios';

const router = 'application';

/** 전형 구분 선택 */
export const EditUserType = () => {
  const response = async (param: IPatchUserType) => {
    return instance.patch(`${router}/users/type`, param);
  };
  return useMutation(response, {
    onError: () => Toast('전형구분 제출에 실패하였습니다.', { type: 'error' }),
  });
};

/** 전형 구분 조회 */
export const GetUserType = () => {
  const response = async () => {
    const { data } = await instance.get<IGetUSerType>(`${router}/users/type`);
    return data;
  };
  return useQuery(['userType'], response);
};

/** 인적사항 입력 */
export const EditUserInfo = () => {
  const response = async (params: IPatchUserInfo) => {
    return instance.patch(`${router}/users`, params);
  };
  return useMutation(response, {
    onError: (e) => {
      let message = '인적사항 제출에 실패하였습니다.';
      if (isAxiosError(e)) {
        switch (e.response?.data?.message) {
          case 'Education Status is unmatched':
            message = '자신의 전형상태가 검정고시가 아닌지 확인해보세요.';
            break;
          case 'File Extension is invalid':
            message = '파일은 jpg, jpeg, png만 허용됩니다.';
            break;
          case 'Request fail to tmap server.':
            message = '주소가 잘못되었습니다.';
            break;
          default:
            break;
        }
      }
      Toast(message, { type: 'error' });
    },
  });
};

/** 인적사항 조회 */
export const GetUserInfo = () => {
  const response = async () => {
    const { data } = await instance.get<IPatchUserInfo>(`${router}/users`);
    return data;
  };
  return useQuery(['userInfos'], response);
};

/** 증명사진 입력 */
export const EditUserPhto = () => {
  const response = async (params: IPatchUserPhoto) => {
    const form = new FormData();
    form.append('photo', params.photo);
    console.log(params.photo);
    return instance.post(`${router}/users/photo `, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
  return useMutation(response, {
    onError: (e) => {
      let message = '증명사진 업로드에 실패하였습니다.';
      if (isAxiosError(e) && e.response?.status === 404) {
        message = '증명사진을 입력해주세요.';
      }
      Toast(message, { type: 'error' });
    },
  });
};

/** 유저 이름, 전화번호 조회 */
export const GetUserProfile = () => {
  const response = async () => {
    const { data } = await instance.get<{ name: string; telephone_number: string; is_student: boolean }>(
      `${router}/users/info`,
    );
    return data;
  };
  return useQuery(['userProfile'], response);
};

/** 졸업/졸업예정 추가정보 입력 */
export const EditAdditionalInfo = () => {
  const response = async (params: IPatchUserMiddleSchool) => {
    return instance.patch(`${router}/users/graduation`, params);
  };
  return useMutation(response, {
    onError: () => Toast('중학교 정보 제출에 실패하였습니다.', { type: 'error' }),
  });
};

/** 졸업/졸업예정 추가정보 조회 */
export const GetAdditionalInfo = () => {
  const response = async () => {
    const { data } = await instance.get<IUserMiddleSchool>(`${router}/users/graduation`);
    return data;
  };
  return useQuery(['userMiddleSchool'], response);
};

/** 자기소개서 조회 */
export const GetUserIntroduce = () => {
  const response = async () => {
    const { data } = await instance.get<IPatchUserIntroduce>(`${router}/intro`);
    return data;
  };
  return useQuery(['userIntroduce'], response);
};

/** 자기소개서 입력 */
export const EditUserIntroduce = () => {
  const response = async (params: IPatchUserIntroduce) => {
    return instance.patch(`${router}/intro`, params);
  };
  return useMutation(response, {
    onError: () => Toast('자기소개서 제출에 실패하였습니다.', { type: 'error' }),
  });
};

/** 자기소개서 조회 */
export const GetUserStudyPlan = () => {
  const response = async () => {
    const { data } = await instance.get<IPatchUserPlan>(`${router}/study-plan`);
    return data;
  };
  return useQuery(['userStudyPlan'], response);
};

/** 학업계획서 입력 */
export const EditUserPlan = () => {
  const response = async (params: IPatchUserPlan) => {
    return instance.patch(`${router}/study-plan`, params);
  };
  return useMutation(response, {
    onError: () => Toast('학업계획서 제출에 실패하였습니다.', { type: 'error' }),
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
