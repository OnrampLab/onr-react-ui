import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resolveAuthState } from '../redux/actions';
import { AuthState } from '../redux/consts';
import { selectAuthData, selectAuthState } from '../redux/selectors';
import { authTokenService } from '../services/AuthTokenService';

export const useAuth = () => {
  const state = useSelector(selectAuthState);
  const data = useSelector(selectAuthData);

  return {
    state,
    data,
    isResolved: state !== AuthState.Prepare,
    isAuthroized: state === AuthState.Authorized,
    isPending: state === AuthState.Pending,
    // be care that !isAuthroized !== Unauthorized
    isUnAuthroized: state === AuthState.Unauthorized,
  };
};

export const useAuthEffect = () => {
  const { data, isResolved, isAuthroized } = useAuth();

  usePersistAuthEffect(data);
  useRedirectAuthEffect(isResolved, isAuthroized);
};

//@toRedirect: other condition to decide if i want redirect or not, default to be always redirect if resolved.
export const useRedirectAuthEffect = (
  isResolved: boolean,
  isAuthroized: boolean,
  toRedirect: boolean = true,
) => {
  const router = useRouter();
  const isAuthPage = router.pathname.includes('/auth/');

  useEffect(() => {
    if (isResolved && toRedirect) {
      //redirect to Home if authed & visiting auth page
      if (isAuthroized && isAuthPage) router.push('/');

      //redirect to Login if unauth & not visiting auth page
      if (!isAuthroized && !isAuthPage) router.push('/auth/signin');
    }
  }, [router, isResolved, toRedirect, isAuthroized, isAuthPage]);
};

export const usePersistAuthEffect = (data: any) => {
  useResolveAuthEffect();
  useAuthStorageEffect(data);
};

export const useAuthStorageEffect = (data: any) => {
  useEffect(() => {
    authTokenService.setToken(data);
  }, [data]);
};

export const useResolveAuthEffect = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //resolve token
    dispatch(resolveAuthState());
  }, [dispatch]);
};
