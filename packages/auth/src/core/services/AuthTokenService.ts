import { parseCookies, setCookie } from 'nookies';
import { JWTTokenClaims } from './interfaces/AuthModel';

export interface IAuthTokenService {
  getToken(ctx: any): JWTTokenClaims;
  setToken(token: JWTTokenClaims): void;
  removeToken(): void;
}

class AuthTokenService implements IAuthTokenService {
  public static accessTokenName: string = '@onr/session';

  public getToken(ctx: any = null): JWTTokenClaims {
    const cookies = parseCookies(ctx);
    const tokenString = cookies[AuthTokenService.accessTokenName] || '{}';
    const token = JSON.parse(tokenString);

    // @ts-ignore
    return token as JWTTokenClaims;
  }

  public setToken(token: JWTTokenClaims): void {
    if (!token) {
      throw new Error('Empty token');
    }

    const jsonString = JSON.stringify(token);

    setCookie(null, AuthTokenService.accessTokenName, jsonString, {
      maxAge: token.expires_in,
      path: '/',
    });
  }

  public removeToken(): void {
    localStorage.removeItem(AuthTokenService.accessTokenName);
  }
}

export const authTokenService = new AuthTokenService();
