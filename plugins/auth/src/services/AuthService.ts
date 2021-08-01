import { Http } from '@onr/common';
import { AuthUser } from '@onr/core';
import { LoginPayload } from './interfaces';
import { SigninResponse, SignoutResponse } from './interfaces/AuthModel';

export const AuthService = {
  login: async (credentials: LoginPayload): Promise<SigninResponse> => {
    try {
      const response = await Http.post<SigninResponse>('/auth/login', {
        data: credentials,
      });

      Http.setToken(response.data.access_token);

      return response.data;
    } catch (error) {
      throw new Error(`Login Error: ${error.message}`);
    }
  },

  refreshJWT: async (token: string) => {
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

  getCurrentUser: async (token: string): Promise<AuthUser> => {
    try {
      Http.setToken(token);

      const response = await Http.post<AuthUser>('/auth/me');

      return response.data;
    } catch (error) {
      throw new Error(`Get current auth Error: ${error.message}`);
    }
  },
};
