import { AuthState as CoreAuthState } from '../../core/redux/consts';

export const AuthState = {
  ...CoreAuthState,
  NeedRefresh: 'AuthState.NeedRefresh',
} as const;
/*
  NeedRefresh: the token has been expired, and has to re-authorize
*/
