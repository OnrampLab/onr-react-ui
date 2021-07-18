import { LoginPayload, LoginResponse } from '.';

export interface SigninPayload {
  data: LoginPayload;
}

export interface SigninResponse extends LoginResponse {}

export interface SignoutResponse {
  message: string;
}

export interface SessionData extends LoginResponse {
  email: string;
}

export interface IAuthContext {
  login: Function;
  logout: Function;
  data?: SigninResponse;
}

export type JWTToken = string;

export interface JWTTokenClaims {
  access_token: JWTToken;
  expires_in: number;
  token_type: 'bearer';
  email?: string;
}
