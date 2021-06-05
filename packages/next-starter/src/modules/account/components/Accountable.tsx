import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { accountActions } from '@onr/account';
import { useAuth, AuthState } from '@onr/auth';

export const Accountable: React.FC = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.authState !== AuthState.Authorized) return;
    dispatch(
      accountActions.getAccounts({
        params: {},
      }),
    );
  }, [dispatch, auth.authState]);

  return <>{children}</>;
};
