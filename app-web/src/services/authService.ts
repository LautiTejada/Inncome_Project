import { setAuthTokens } from '../storage/tokenStorage';
import {
  ILoginCredentials,
  IAuthToken,
  IRegisterRequest,
  IRegisterResponse
} from '../types/auth';
import apiService from './api';

export const login = async (credentials: ILoginCredentials): Promise<IAuthToken> => {
  try {
    const response = await apiService.post<IAuthToken>('/auth/login', credentials);
    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;
    console.log('Tokens recibidos:', { accessToken, refreshToken });
    console.log('Respuesta completa:', response);
    setAuthTokens(accessToken, refreshToken);
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

export const register = async (data: IRegisterRequest): Promise<IRegisterResponse> => {
  try {
    const response = await apiService.post<IRegisterResponse>('/auth/register', data);
    return response.data;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
};

export const logout = () => {
  setAuthTokens(null, null);
};
