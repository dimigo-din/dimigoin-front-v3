import axios from 'axios'
import makeAlert from '../functions/makeAlert';
import { toast } from 'react-toastify'
import { getToken } from './auth';
import { PostResource } from './serverResource';

if (!process.env.REACT_APP_API_URI) makeAlert.error("서버 정보를 불러오는데 실패했습니다")
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
  headers: {
    authentication: `bearer ${getToken()}`
  }
});

export const apiWithoutAuth = axios.create({
  baseURL: process.env.REACT_APP_API_URI
})

api.interceptors.response.use(undefined, (error) => {
  const errorMessage = error.response?.body?.message || ({
    404: '리소스를 찾을 수 없습니다',
    500: '알 수 없는 서버 오류입니다.'
  })[error.response.status as | 404 | 500]
  toast(errorMessage, {
    type: 'error'
  })
  return Promise.reject(error);
})

export const post = async <T extends keyof PostResource>(endpoint: PostResource[T]['endpoint'], param?: PostResource[T]['req']) => {
  return (await api(endpoint, {
    data: param
  })).data as PostResource[T]['res']
}

export default api