import { message } from 'antd';
import { Dispatch } from 'redux';
import { AuthService, AuthState } from '..';
import { resolveAuthFromStorage, setAuthData, setAuthState } from '../../core/redux/actions';

export const resolveJWTAuthState = () => async (dispatch: Dispatch) => {
  const session = resolveAuthFromStorage();

  if (session.access_token) {
    // @ts-ignore
    dispatch(refreshToken(session.access_token, session.email));
  } else {
    dispatch(setAuthState(AuthState.Unauthorized));
  }
};

export const refreshToken = (access_token: string, email: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(setAuthState(AuthState.Pending));
    const newSession = await AuthService.loginWithJWT(access_token);
    const sessionData = {
      ...newSession,
      email,
    };

    dispatch(setAuthData(sessionData));
    dispatch(setAuthState(AuthState.Authorized));
  } catch (error) {
    console.error(error);
    message.info('Token expired.');
    dispatch(setAuthState(AuthState.Unauthorized));
  }
};
