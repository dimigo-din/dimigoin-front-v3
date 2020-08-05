import Cookies from 'universal-cookie';

const { stringify } = JSON;

const cookies = new Cookies();

export interface IUser {
  photo: Array<string>;
  _id: string;
  idx: number;
  username: string;
  name: string;
  userType: string;
  gender: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  class: number;
  grade: number;
  number: number;
  serial: number;
}

interface IAuth {
  clear(key: string): void;
  clearAppStorage(): void;
  setToken(token: string): void;
  setUserInfo(userInfo: JSON): void;
  getToken(): string | null;
  getUserInfo(): IUser;
}

const auth: IAuth = {
  clear(key) {
    if (localStorage && localStorage.getItem(key)) {
      return localStorage.removeItem(key);
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return sessionStorage.removeItem(key);
    }
    return null;
  },

  async clearAppStorage() {
    await cookies.remove('accessToken');
    return cookies.remove('userInfo');
  },

  setToken(token) {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    return cookies.set('accessToken', token, {
      path: '/',
      expires,
    });
  },

  setUserInfo(userInfo) {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    return cookies.set('userInfo', stringify(userInfo), {
      path: '/',
      expires,
    });
  },

  getToken() {
    return cookies.get('accessToken');
  },

  getUserInfo() {
    return cookies.get('userInfo');
  },
};

export default auth;
