import { Http } from '@onr/common';
import { AuthService as AuthCoreService } from '@onr/auth/core';
import { AuthModel } from '@onr/auth';

export const AuthService = {
  ...AuthCoreService,
  loginWithJWT: async (token: string) => {
    try {
      Http.setToken(token);

      const response = await Http.post<AuthModel.SigninResponse, any>('/auth/refresh');

      Http.setToken(response.data.access_token);

      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
