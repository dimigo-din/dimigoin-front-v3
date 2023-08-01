import { COOKIE_JAR_KEY } from '../constants/cookieJarKeys';
import { User } from '../constants/types';
import { cookieJar } from '../storage';
import { api } from './api';
import { getAccessToken } from './auth';

export const saveMyData = async (myData: User) => {
  cookieJar.set(COOKIE_JAR_KEY.MY_INFO, myData);
};

export const getMyLocalData = () =>
  cookieJar.get(COOKIE_JAR_KEY.MY_INFO) as User | undefined;

export const fetchMyData = async (token?: string) => {
  if (!token && !getAccessToken()) {
    throw new Error('No Auth Data');
  }
  const myData = await (token ? api<'getMyInfo'>('GET', '/user/me', null, {
    withoutAuth: true
  }, {
    Authorization: `Bearer ${token}`,
  }) : api<'getMyInfo'>('GET', '/user/me'));
  await saveMyData(myData.identity);
  return myData.identity;
};

export const getMyData = () => {
  const cached = getMyLocalData();
  if (cached) return Promise.resolve(cached);
  else return fetchMyData();
};

export const fetchAllStudents = () =>
  api<'getAllStudents'>('GET', '/user/student').then((d) => d.students);
export const getAllTeachers = () =>
  api<'getAllTeachers'>('GET', '/user/teacher').then((d) => d.teachers);
