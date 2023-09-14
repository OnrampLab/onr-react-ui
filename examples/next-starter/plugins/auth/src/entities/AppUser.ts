import { IAccount } from '@onr/plugin-account';
import { AccountUser } from '@onr/plugin-user/types/entities/interfaces/AccountUser';

export class AppUser implements AccountUser {
  public id: number;
  public token: string;
  public name?: string;
  public email?: string;
  public password?: string;
  public roles?: any[];
  public accounts: IAccount[];

  constructor(params: any) {
    this.id = params.id;
    this.token = params.token;
    this.name = params.name;
    this.email = params.email;
    this.password = params.password;
    this.roles = params.roles || [];
    this.accounts = params.accounts || [];
  }
}
