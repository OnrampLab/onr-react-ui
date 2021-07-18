import { message } from 'antd';
import { Dispatch } from 'redux';
import { AuthState } from '../../jwt/redux/consts';
import { AuthService } from '../services/AuthService';
import { authTokenService } from '../services/AuthTokenService';
import { JWTTokenClaims, SigninPayload, SigninResponse } from '../services/interfaces/AuthModel';
import { AuthConsts } from './consts';

export const setCurrentUser = (currentUser: any) => ({
  type: AuthConsts.SET_CURRENT_USER,
  payload: {
    currentUser,
  },
});

export const getCurrentUser = () => async (dispatch: Dispatch) => {
  try {
    const currentUser = await AuthService.getCurrentUser();

    dispatch(setCurrentUser(currentUser));
  } catch (error) {
    console.error(error);
    message.error('Unkown Error', error);
  }
};

export const setAuthState = (state: any) => ({
  type: AuthConsts.SET_AUTH_STATE,
  payload: {
    state,
  },
});

export const setAuthData = (data: any) => ({
  type: AuthConsts.SET_AUTH_DATA,
  payload: {
    data,
  },
});

export const resolveAuthFromStorage = (): JWTTokenClaims | undefined => {
  try {
    const sessionObj: JWTTokenClaims = authTokenService.getToken();

    return sessionObj;
  } catch (error) {
    console.error(error);

    return;
  }
};

export const resolveAuthState = () => async (dispatch: Dispatch) => {
  const session = resolveAuthFromStorage();

  if (session?.access_token) {
    dispatch(setAuthData(session));
    dispatch(setAuthState(AuthState.Authorized));
  } else {
    dispatch(setAuthState(AuthState.Unauthorized));
  }
};

export const login = (form: SigninPayload) => async (dispatch: Dispatch) => {
  dispatch(setAuthState(AuthState.Pending));

  try {
    const loginData: SigninResponse = await AuthService.login(form);

    const sessionData = {
      ...loginData,
      email: form.data.email,
    };

    dispatch(setAuthData(sessionData));
    dispatch(setAuthState(AuthState.Authorized));
  } catch (error) {
    console.error(error);
    dispatch(setAuthState(AuthState.Unauthorized));
    throw error;
  }
};

export const logout = () => async (dispatch: Dispatch) => {
  dispatch(setAuthState(AuthState.Pending));

  try {
    await AuthService.logout();

    return true;
  } catch (error) {
    throw error;
  } finally {
    dispatch(setAuthData({}));
    dispatch(setAuthState(AuthState.Unauthorized));
  }
};
