import { useQuery } from '@tanstack/react-query';
import { instance } from '../axios';
import { isAxiosError } from 'axios';
import { Toast } from '@team-entry/design_system';

const router = 'pdf';

/** 미리보기용 원서 pdf 출력 */
export const GetPdfPreview = () => {
  const response = async () => {
    const { data } = await instance.get(`${router}/preview`, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/pdf',
      },
    });
    return data;
  };
  return useQuery(['PdfPreview'], response, {
    onError: (e) => {
      let message = 'PDF를 불러오는데 실패하였습니다.';
      if (isAxiosError(e) && e.response?.status === 400) {
        message = '성적점수를 입력하였는지 확인해주세요.';
      }
      Toast(message, { type: 'error' });
    },
  });
};
