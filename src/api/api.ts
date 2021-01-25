import axios, { AxiosRequestConfig } from 'axios'
import makeAlert from '../functions/makeAlert';
import { toast } from 'react-toastify'
import { getAccessToken } from './auth';
import { APIResource } from './serverResource';

if (!process.env.REACT_APP_API_URI) makeAlert.error("서버 정보를 불러오는데 실패했습니다")
export const request = axios.create({
  baseURL: process.env.REACT_APP_API_URI
});

export const apiWithoutAuth = axios.create({
  baseURL: process.env.REACT_APP_API_URI
})

request.interceptors.response.use(undefined, (error) => {
  const errorMessage = error.response?.data?.message || ({
    404: '리소스를 찾을 수 없습니다',
    500: '알 수 없는 서버 오류입니다.',
    403: '접근 권한이 없습니다',
    502: '서버가 작동하지 않습니다'
    // 401: ''
  })[error.response.status as | 404 | 500 | 403]
  toast(errorMessage, {
    type: 'error'
  })
  return Promise.reject(error);
})

export const api = async <T extends keyof APIResource>(method: AxiosRequestConfig['method'], endpoint: APIResource[T]['endpoint'] | string, param?: APIResource[T]['req'] & {
  withoutAuth?: boolean
}, headers?: any) => {
  const token = getAccessToken()
  return (await request(endpoint, {
    data: param,
    method,
    headers: {
      ...(!param?.withoutAuth && token && ({
        Authorization: `Bearer ${token}`,
      })),
      ...headers,
    }
  })).data as APIResource[T]['res']
}
