import axios from 'axios'
import makeAlert from '../functions/makeAlert';
import { toast } from 'react-toastify'
import { getToken } from './auth';
import { GetResource, PostResource } from './serverResource';

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
  // console.log(error.response)
  toast(errorMessage, {
    type: 'error'
  })
  return Promise.reject(error);
})

export const post = async <T extends keyof PostResource>(endpoint: PostResource[T]['endpoint'], param?: PostResource[T]['req']) => {
  return (await request(endpoint, {
    data: param,
    method: 'POST',
    headers: {
      authentication: `bearer ${getToken()}`
    }
  })).data as PostResource[T]['res']
}

export const get = async <T extends keyof GetResource>(endpoint: GetResource[T]['endpoint'], needAuth: GetResource[T]['needAuth'] =  true, param?: GetResource[T]['req']) => {
  return (await request(endpoint, {
    data: param,
    method: 'GET',
    headers: {
      authentication: `bearer ${getToken()}`
    }
  })).data as GetResource[T]['res']
}