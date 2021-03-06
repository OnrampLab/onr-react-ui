export const AuthState = {
  Prepare: 'AuthState.Prepare',
  Pending: 'AuthState.Pending',
  Authorized: 'AuthState.Authorized',
  Unauthorized: 'AuthState.Unauthorized',
} as const;
/*
  Prepare: initializing auth state (From storage/cookie)
  Pending: submitting authorization request and pending response
  Authorized: authorized
  Unauthorized: unauthorized
*/

export const AuthConsts = {
  SET_AUTH_STATE: 'AuthStore_SetAuthState',
  SET_AUTH_DATA: 'AuthStore_SetAuthData',
  SET_CURRENT_USER: 'AuthStore_SetCurrentUser',
} as const;

export const INITIAL_STATE = {
  currentUser: {},
  state: AuthState.Prepare,
  data: {},
};

export const STORE_KEY = 'authStore';
export const SESSION_KEY = '@onr/session';
