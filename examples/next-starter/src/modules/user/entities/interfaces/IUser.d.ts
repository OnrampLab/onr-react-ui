import { AuthUser } from '@onr/core';
import { IAccount } from '@onr/plugin-account';

export enum UserRoleName {
  SystemAdmin = 'system-admin',
  AccountAdmin = 'account-admin',
  AccountAnalyst = 'account-analyst',
}

export interface UserRole {
  created_at?: string; // eslint-disable-line
  id?: number;
  name: string;
  updated_at?: string; // eslint-disable-line
}

/**
 *
 * @export
 * @interface IUser
 */
export interface IUser extends AuthUser {
  /**
   *
   * @type {string[]}
   * @memberof IUser
   */
  roles?: UserRole[];

  /**
   *
   * @type {IAccount[]}
   * @memberof IUser
   */
  accounts?: IAccount[];
}
