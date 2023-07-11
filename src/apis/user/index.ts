import { instance } from '../axios';
import { IAuthorizationResponse } from './types';

export const ReissueToken = async (refresh_token: string) => {
  const response = await instance.put<IAuthorizationResponse>('user/auth', null, {
    headers: {
      'X-Refresh-Token': `${refresh_token}`,
    },
  });

  return response.data;
};
