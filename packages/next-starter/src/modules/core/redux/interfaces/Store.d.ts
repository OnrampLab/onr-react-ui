import { AuthUser } from '@core';
import { IAccount } from '@onr/account';
import { IWrapperPage } from '@onr/core';

export interface IStore {
  accountStore: {
    accounts: IAccount[];
  };
  authStore: {
    currentUser: AuthUser;
  };
  wrapper: IWrapperPage.IStateProps;
}
