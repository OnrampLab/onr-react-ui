import { Http } from '@onr/common';
import { AuthUser } from '@onr/core';
import { SigninPayload, SigninResponse, SignoutResponse } from './interfaces/AuthModel';

export const AuthService = {
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
  logout: async () => {
    try {
      await Http.post<SignoutResponse>('/auth/logout');

      return;
    } catch (error) {
      throw new Error(`Logout Error: ${error.message}`);
    }
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
