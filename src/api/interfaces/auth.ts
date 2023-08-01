import { AuthTokens } from '../../constants/types';

export interface LoginWithInfo {
  method: 'POST';
  endpoint: '/auth';
  req: {
    username: string;
    password: string;
  };
  res: AuthTokens;
}

export interface LoginWithRefreshToken {
  method: 'POST';
  endpoint: '/auth/refresh';
  req: undefined | null;
  res: AuthTokens;
}
