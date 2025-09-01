import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const setAuthTokens = (accessToken: string | null, refreshToken: string | null) => {
  if (accessToken) {
    cookies.set(ACCESS_TOKEN_KEY, accessToken, { path: '/' });
  } else {
    cookies.remove(ACCESS_TOKEN_KEY, { path: '/' });
  }

  if (refreshToken) {
    cookies.set(REFRESH_TOKEN_KEY, refreshToken, { path: '/' });
  } else {
    cookies.remove(REFRESH_TOKEN_KEY, { path: '/' });
  }
};

export const getAccessToken = (): string | null => {
  return cookies.get(ACCESS_TOKEN_KEY) || null;
};

export const getRefreshToken = (): string | null => {
  return cookies.get(REFRESH_TOKEN_KEY) || null;
};

export const clearAuthTokens = () => {
  cookies.remove(ACCESS_TOKEN_KEY, { path: '/' });
  cookies.remove(REFRESH_TOKEN_KEY, { path: '/' });
};
