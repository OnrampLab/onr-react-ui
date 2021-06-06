import { AuthUser } from '@core';
import { IAccount } from '@onr/account';
import { IStateProps } from '@onr/core';

export interface IStore {
  accountStore: {
    accounts: IAccount[];
  };
  authStore: {
    currentUser: AuthUser;
  };
  wrapper: IStateProps;
}
