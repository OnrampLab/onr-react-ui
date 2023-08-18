import { CoreStore } from '@onr/core';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreProps, accountActions } from '../redux';

interface Parameters {}

type Store = CoreStore & StoreProps;

export const useAccounts = (params?: Parameters) => {
  const dispatch = useDispatch();
  const accounts = useSelector((store: Store) => store.accountStore?.accounts ?? []);

  const fetch = useCallback(() => {
    dispatch(
      accountActions.getAccounts({
        params,
      }),
    );
  }, [dispatch, params]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    accounts,
    fetch,
  };
};
