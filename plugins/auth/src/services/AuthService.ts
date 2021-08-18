import { AuthUser } from '@onr/core';
import { BasicClient } from '@onr/ts-rest-client';
import { LoginPayload, LoginResponse } from './interfaces';

export class AuthService extends BasicClient {
  async login(credentials: LoginPayload): Promise<LoginResponse> {
    try {
      const response = await this.post<LoginResponse>('/auth/login', {
        ...credentials,
      });

      this.setToken(response.data.access_token);

      return response.data;
    } catch (error) {
      throw new Error(`Login Error: ${(error as Error).message}`);
    }
  }

  async refreshJWT(token: string) {
    try {
      this.setToken(token);

      const response = await this.post<LoginResponse>('/auth/refresh');

      this.setToken(response.data.access_token);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await this.post('/auth/logout');

      return;
    } catch (error) {
      throw new Error(`Logout Error: ${(error as Error).message}`);
    }
  }

  async getCurrentUser(token: string): Promise<AuthUser> {
    try {
      this.setToken(token);

      const response = await this.post<AuthUser>('/auth/me');

      return response.data;
    } catch (error) {
      throw new Error(`Get current auth Error: ${(error as Error).message}`);
    }
  }
}
