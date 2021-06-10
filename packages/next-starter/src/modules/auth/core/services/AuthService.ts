import { Http } from '@onr/common';
import { AuthModel } from '@onr/auth';
import { IUser } from '@onr/user';

export const AuthService = {
  login: async (payload: AuthModel.SigninPayload): Promise<AuthModel.SigninResponse> => {
    try {
      const response = await Http.post<AuthModel.SigninResponse>('/auth/login', {
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
      await Http.post<AuthModel.SignoutResponse>('/auth/logout');

      return;
    } catch (error) {
      throw new Error(`Logout Error: ${error.message}`);
    }
  },
  getCurrentUser: async (): Promise<IUser> => {
    try {
      const response = await Http.post<IUser>('/auth/me');

      return response.data;
    } catch (error) {
      throw new Error(`Get current auth Error: ${error.response.data.message}`);
    }
  },
};
