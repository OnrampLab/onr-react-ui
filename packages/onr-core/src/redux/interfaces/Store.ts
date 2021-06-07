import { AuthUser } from '../../types';
import { IStateProps } from './types';

export interface CoreStore {
  authStore: {
    currentUser: AuthUser;
  };
  coreStore: IStateProps;
}
