import { Http } from '@onr/common';
import { AuthUser } from '@onr/core';
import { LoginPayload } from './interfaces';
import { SigninPayload, SigninResponse, SignoutResponse } from './interfaces/AuthModel';

export const AuthService = {
  newLogin: async (credentials: LoginPayload) => {
    return AuthService.login({
      data: credentials,
    });
  },

  login: async (payload: SigninPayload): Promise<SigninResponse> => {
    try {
      const response = await Http.post<SigninResponse>('/auth/login', {
        data: payload.data,
      });

      Http.setToken(response.data.access_token);

      return response.data;
    } catch (error) {
      throw new Error(`Login Error: ${error.message}`);
    }
  },

  loginWithJWT: async (token: string) => {
    try {
      Http.setToken(token);

      const response = await Http.post<SigninResponse, any>('/auth/refresh');

      Http.setToken(response.data.access_token);

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      await Http.post<SignoutResponse>('/auth/logout');

      return;
    } catch (error) {
      throw new Error(`Logout Error: ${error.message}`);
    }
  },

  getUser: async (token: string) => {
    Http.setToken(token);

    return AuthService.getCurrentUser();
  },

  getCurrentUser: async (): Promise<AuthUser> => {
    try {
      const response = await Http.post<AuthUser>('/auth/me');

      return response.data;
    } catch (error) {
      throw new Error(`Get current auth Error: ${error.message}`);
    }
  },
};
