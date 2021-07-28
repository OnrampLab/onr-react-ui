import { Modal } from 'antd';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { JWTTokenClaims } from '../../core';
import { useAuth, useAuthStorageEffect, useRedirectAuthEffect } from '../../core/hooks/useAuth';
import { setAuthState } from '../../core/redux/actions';
import { refreshToken, resolveJWTAuthState } from '../redux/actions';
import { AuthState } from '../redux/consts';

export const useJWTAuth = () => {
  const { state, data, isResolved, isAuthroized, isPending, isUnAuthroized } = useAuth();

  return {
    data,
    isResolved,
    isAuthroized,
    isPending,
    isUnAuthroized,
    isNeedRefresh: state === AuthState.NeedRefresh,
  };
};

export const useJWTAuthEffect = () => {
  const { data, isResolved, isPending, isAuthroized, isUnAuthroized, isNeedRefresh } = useJWTAuth();

  usePersistJWTAuthEffect(data);
  useRedirectAuthEffect(isResolved, isAuthroized, !isNeedRefresh && !isPending);
  useExpireEffect(data, isAuthroized, isUnAuthroized, isNeedRefresh);
};

const usePersistJWTAuthEffect = (data: any) => {
  useResolveJWTAuthEffect();
  useAuthStorageEffect(data);
};

export const useResolveJWTAuthEffect = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resolveJWTAuthState());
  }, [dispatch]);
};

const useExpireEffect = (
  data: JWTTokenClaims,
  isAuthroized: boolean,
  isUnAuthroized: boolean,
  isNeedRefresh: boolean,
) => {
  const dispatch = useDispatch();
  const timerID = useRef(-1);

  useEffect(() => {
    //handle timerID
    if (isAuthroized && data.access_token && timerID.current === -1) {
      timerID.current = setTimeout(() => {
        timerID.current = -1;
        dispatch(setAuthState(AuthState.NeedRefresh));
      }, data.expires_in);
    }
    if (isUnAuthroized && timerID.current !== -1) {
      //clear timeout if logout

      clearTimeout(timerID.current);
      timerID.current = -1;
    }
  }, [dispatch, isAuthroized, isUnAuthroized, data]);

  useEffect(() => {
    //clean up timeout on unmount
    return () => {
      clearTimeout(timerID.current);
    };
  }, []);

  useEffect(() => {
    //handle refresh popup
    if (isNeedRefresh && timerID.current === -1) {
      Modal.warning({
        title: 'This page has expired due to inactivity. Please refresh and try again.',
        onOk: () => {
          const { access_token, email } = data;

          // @ts-ignore
          dispatch(refreshToken(access_token, email));
        },
      });
    }
  }, [dispatch, isNeedRefresh, data]);
};
