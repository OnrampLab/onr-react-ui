import { IAccount } from '@onr/plugin-account';
import { IUser } from './IUser';

export interface AccountUser extends IUser {
  accounts: IAccount[];
}
