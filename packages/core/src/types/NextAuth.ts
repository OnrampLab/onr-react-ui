import { JWT } from 'next-auth/jwt';
import { LaravelJWT } from './LaravelJWT';

export interface NextAuthUser {
  token: any;
}

export interface NextAuthToken extends JWT {
  accessToken: string;
  accessTokenExpires: number;
}

export interface NextAuthApi {
  login: (credentials: any) => Promise<LaravelJWT>;
  getUser: (token: string) => Promise<NextAuthUser>;
  refreshJWT: (token: string) => Promise<LaravelJWT>;
}

export interface NextAuthAPIOptions {
  apis: NextAuthApi;
}
