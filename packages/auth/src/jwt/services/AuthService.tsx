import { Http } from '@onr/common';
import { AuthService as AuthCoreService } from '../../core/services';
import { SigninResponse } from '../../core/services/interfaces/AuthModel';

export const AuthService = {
  ...AuthCoreService,
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
};
