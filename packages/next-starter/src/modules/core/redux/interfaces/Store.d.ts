import { AuthUser } from '@core';
import { IStateProps } from '@onr/core';

export interface CoreStore {
  authStore: {
    currentUser: AuthUser;
  };
  coreStore: IStateProps;
}
