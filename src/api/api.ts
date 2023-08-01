import axios from 'axios';
import makeAlert from '../functions/makeAlert';
import { toast } from 'react-toastify';
import { getAccessToken } from './auth';
import { APIResource } from './serverResource';

if (!process.env.REACT_APP_API_URI)
  makeAlert.error('서버 정보를 불러오는 데 실패했습니다');
export const request = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
});

export const apiWithoutAuth = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
});

export const api = async <T extends keyof APIResource>(
  method: APIResource[T]['method'],
  endpoint: APIResource[T]['endpoint'] | string,
  param?: APIResource[T]['req'],
  requestOption?: {
    withoutAuth?: boolean;
    hasAlert?: boolean;
  },
  headers?: any,
): Promise<APIResource[T]['res']> => {
  const token = getAccessToken();
  try {
    const res = (
      await request(endpoint, {
        data: param,
        method,
        headers: {
          ...(!requestOption?.withoutAuth &&
            token && {
            Authorization: `Bearer ${token}`,
          }),
          ...headers,
        },
      })
    ).data as APIResource[T]['res'];
    return res
  }
  catch (error) {
    if (!requestOption?.hasAlert) throw error
    const errorMessage =
      error.response?.data?.message ||
      {
        401: '로그인 정보가 올바르지 않아요',
        404: '리소스를 찾을 수 없어요',
        500: '알 수 없는 서버 오류입니다',
        403: '접근 권한이 없어요',
        502: '서버가 작동하지 않아요',
      }[error?.response?.status as 404 | 500 | 403] ||
      '서버에 연결할 수 없어요';

    toast(errorMessage, {
      type: 'error',
    });
    throw error
  }
};
