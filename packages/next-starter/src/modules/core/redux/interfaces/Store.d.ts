import { AuthUser } from '@core';
import { IStateProps } from '@onr/core';

export interface IStore {
  authStore: {
    currentUser: AuthUser;
  };
  coreStore: IStateProps;
}
