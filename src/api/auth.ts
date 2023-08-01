import { toast } from 'react-toastify';
import { COOKIE_JAR_KEY } from '../constants/cookieJarKeys';
import { AuthTokens } from '../constants/types';
import { cookieJar } from '../storage';
import { api } from './api';
import { APIResource } from './serverResource';
import { fetchMyData } from './user';

export const getAccessToken = (): string | undefined => {
  return cookieJar.get(COOKIE_JAR_KEY.ACCESS_TOKEN);
};

export const getRefreshToken = (): string | undefined => {
  return cookieJar.get(COOKIE_JAR_KEY.REFRESH_TOKEN);
};

export const setTokens = (tokens: AuthTokens) => {
  cookieJar.set(COOKIE_JAR_KEY.ACCESS_TOKEN, tokens.accessToken);
  cookieJar.set(COOKIE_JAR_KEY.REFRESH_TOKEN, tokens.refreshToken);
};

export const clearTokens = () => {
  cookieJar.remove(COOKIE_JAR_KEY.ACCESS_TOKEN);
  cookieJar.remove(COOKIE_JAR_KEY.REFRESH_TOKEN);
  cookieJar.remove(COOKIE_JAR_KEY.MY_INFO);
};

export const clearUserInfo = () => {
  cookieJar.remove(COOKIE_JAR_KEY.MY_INFO);
}

export const loginWithInfo = async ({
  username,
  password,
}: APIResource['loginWithInfo']['req']) => {
  try {
    const res = await api<'loginWithInfo'>('POST', '/auth', {
      password,
      username,
    });
    setTokens(res);
    await fetchMyData();
    return true;
  } catch (e) {
    return false;
  }
};

export const loginWithRefreshToken = async (refreshToken: string) => {
  try {
    const res = await api<'loginWithRefreshToken'>(
      'POST',
      '/auth/refresh', null,
      {
        withoutAuth: true,
      },
      {
        Authorization: `Bearer ${refreshToken}`,
      },
    );
    return res;
  } catch (e) {
    return false;
  }
};

export const refetchToken = async () => {
  const refreshToken = getRefreshToken()
  if (!refreshToken) {
    toast.error("계정 상태가 올바르지 않아요")
    return
  }
  const tokens = await loginWithRefreshToken(refreshToken)
  if (!tokens) {
    toast.error("계정 정보를 불러올 수 없어요")
    return;
  }
  setTokens(tokens)
  // clearUserInfo()

  return await fetchMyData(tokens.accessToken)
}
