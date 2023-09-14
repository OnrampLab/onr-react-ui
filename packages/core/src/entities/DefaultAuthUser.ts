import { AuthUser } from '../types';

export class DefaultAuthUser implements AuthUser {
  public id: number;
  public token: string;
  public name?: string;
  public email?: string;
  public password?: string;
  public roles?: any[];

  constructor(params: AuthUser) {
    this.id = params.id;
    this.token = params.token;
    this.name = params.name;
    this.email = params.email;
    this.password = params.password;
    this.roles = params.roles || [];
  }

  isRole(roleName: string): boolean {
    return !!this.roles?.find(role => role.name === roleName);
  }
}
